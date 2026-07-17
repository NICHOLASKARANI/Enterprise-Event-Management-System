// apps/frontend/src/app/(dashboard)/bots/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Bot,
  Play,
  Pause,
  StopCircle,
  Settings,
  BarChart3,
  Plus,
  Copy,
  Trash2,
  TrendingUp,
  TrendingDown,
  Zap,
} from 'lucide-react';

interface Bot {
  id: string;
  name: string;
  strategy: string;
  symbol: string;
  status: 'ACTIVE' | 'PAUSED' | 'STOPPED' | 'ERROR';
  profit: number;
  trades: number;
  winRate: number;
  capital: number;
  lastRun: string;
}

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>([
    {
      id: '1',
      name: 'MA Crossover V1',
      strategy: 'Moving Average Crossover',
      symbol: 'Volatility 75',
      status: 'ACTIVE',
      profit: 234.50,
      trades: 156,
      winRate: 68,
      capital: 5000,
      lastRun: '2 min ago',
    },
    {
      id: '2',
      name: 'RSI Scalper',
      strategy: 'RSI Mean Reversion',
      symbol: 'Volatility 100',
      status: 'ACTIVE',
      profit: -45.20,
      trades: 89,
      winRate: 52,
      capital: 3000,
      lastRun: '30 sec ago',
    },
    {
      id: '3',
      name: 'Grid Master',
      strategy: 'Grid Trading',
      symbol: 'Boom 300',
      status: 'PAUSED',
      profit: 567.80,
      trades: 234,
      winRate: 72,
      capital: 10000,
      lastRun: '1 hour ago',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'PAUSED': return 'bg-yellow-500';
      case 'STOPPED': return 'bg-gray-500';
      case 'ERROR': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trading Bots</h1>
          <p className="text-gray-400 mt-1">Manage your automated trading bots</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Bot
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Bots</p>
              <p className="text-2xl font-bold text-white mt-1">
                {bots.filter(b => b.status === 'ACTIVE').length}
              </p>
            </div>
            <Bot className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
        </Card>
        <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Profit</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                +${bots.reduce((sum, b) => sum + b.profit, 0).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
          </div>
        </Card>
        <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-white mt-1">
                {bots.reduce((sum, b) => sum + b.trades, 0)}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-400 opacity-50" />
          </div>
        </Card>
        <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Win Rate</p>
              <p className="text-2xl font-bold text-white mt-1">
                {Math.round(bots.reduce((sum, b) => sum + b.winRate, 0) / bots.length)}%
              </p>
            </div>
            <Zap className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Bots List */}
      <div className="space-y-4">
        <AnimatePresence>
          {bots.map((bot) => (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={cn(
                        'w-3 h-3 rounded-full absolute -top-1 -right-1',
                        getStatusColor(bot.status),
                        bot.status === 'ACTIVE' && 'animate-pulse'
                      )} />
                      <Bot className="w-10 h-10 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
                      <p className="text-sm text-gray-400">{bot.strategy} • {bot.symbol}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-gray-400">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-400">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Profit/Loss</p>
                    <p className={cn(
                      'text-lg font-bold',
                      bot.profit > 0 ? 'text-green-400' : 'text-red-400'
                    )}>
                      {bot.profit > 0 ? '+' : ''}${bot.profit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Win Rate</p>
                    <p className="text-lg font-bold text-white">{bot.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Trades</p>
                    <p className="text-lg font-bold text-white">{bot.trades}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Capital</p>
                    <p className="text-lg font-bold text-white">${bot.capital}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Last run: {bot.lastRun}</p>
                  <div className="flex items-center space-x-2">
                    {bot.status === 'ACTIVE' ? (
                      <Button variant="outline" size="sm" className="text-yellow-400">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    ) : bot.status === 'PAUSED' ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-red-400">
                      <StopCircle className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}