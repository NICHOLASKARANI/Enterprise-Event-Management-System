import React, { useState, useRef, useEffect } from 'react';
import {
  Box, TextField, IconButton, Paper, Typography,
  CircularProgress, Avatar, Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  agent?: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents = [
    { id: 'auto', name: 'Auto-Router', icon: '🤖' },
    { id: 'sales', name: 'Sales Agent', icon: '💰' },
    { id: 'support', name: 'Support Agent', icon: '🎧' },
    { id: 'finance', name: 'Finance Agent', icon: '💹' },
    { id: 'hr', name: 'HR Agent', icon: '👥' },
    { id: 'meeting', name: 'Meeting Assistant', icon: '📅' }
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/agents/chat', {
        message: input,
        agent_type: selectedAgent,
        context: { user_id: 'current_user' }
      });

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'agent',
        agent: response.data.agent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">AI Enterprise Assistant</Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          {agents.map(agent => (
            <Chip
              key={agent.id}
              label={`${agent.icon} ${agent.name}`}
              onClick={() => setSelectedAgent(agent.id)}
              color={selectedAgent === agent.id ? 'primary' : 'default'}
              variant={selectedAgent === agent.id ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map(message => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
                color: message.sender === 'user' ? 'white' : 'text.primary'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {message.sender === 'agent' ? (
                  <SmartToyIcon fontSize="small" />
                ) : (
                  <PersonIcon fontSize="small" />
                )}
                <Typography variant="caption">
                  {message.sender === 'agent' ? message.agent || 'AI Agent' : 'You'}
                </Typography>
              </Box>
              <Typography variant="body1">{message.text}</Typography>
              <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.7 }}>
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Paper sx={{ p: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="caption" sx={{ ml: 1 }}>AI is thinking...</Typography>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask me anything about your business operations..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <IconButton onClick={sendMessage} disabled={loading}>
                <SendIcon />
              </IconButton>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatInterface;