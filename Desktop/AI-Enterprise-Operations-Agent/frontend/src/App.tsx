import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './pages/Dashboard';
import AgentConsole from './pages/AgentConsole';
import KnowledgeBase from './pages/KnowledgeBase';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00ff87' },
    secondary: { main: '#60efff' },
    background: { default: '#0a0a0a', paper: '#1a1a1a' }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<AgentConsole />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;