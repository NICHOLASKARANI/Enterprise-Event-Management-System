import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  check(): string {
    return 'API is running!';
  }

  async getSystemStatus() {
    try {
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      const dbStatus = 'connected';
    } catch (error) {
      const dbStatus = 'disconnected';
    }

    return {
      status: 'operational',
      timestamp: new Date().toISOString(),
      services: {
        api: 'running',
        database: 'connected',
        graphql: 'available',
      },
      version: '1.0.0',
    };
  }
}