from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import logging
from prometheus_fastapi_instrumentator import Instrumentator

from app.api.routes import agents, auth, knowledge
from app.core.config import settings
from app.core.database import init_db
from app.services.monitoring import setup_monitoring

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Autonomous AI Enterprise Platform...")
    await init_db()
    setup_monitoring()
    yield
    # Shutdown
    logger.info("Shutting down...")

app = FastAPI(
    title="AI Enterprise Operations Platform",
    description="Autonomous Multi-Agent System for Business Operations",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
instrumentator = Instrumentator().instrument(app).expose(app)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(knowledge.router, prefix="/api/knowledge", tags=["knowledge"])

@app.get("/")
async def root():
    return {
        "message": "AI Enterprise Operations Platform",
        "version": "1.0.0",
        "agents": ["sales", "support", "finance", "hr", "meeting"]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "agents_ready": True}