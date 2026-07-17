// apps/frontend/src/app/(dashboard)/trading/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TradingViewChart } from '@intelliwave/charts/TradingViewChart';
import { MarketWatch } from '@/components/dashboard/RealTimeWidgets';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  Shield,
  BarChart3,
} from 'lucide-react';

export default function TradingPage() {
  const [activeSymbol, setActiveSymbol] = useState('R_100');
  const [orderType, setOrderType] = useState('MARKET');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('1');
  const [durationUnit, setDurationUnit] = useState('t');

  const symbols = [
    { id: 'R_100', name: 'Volatility 100', price: 5678.90, change: 1.25 },
    { id: 'R_75', name: 'Volatility 75', price: 3456.78, change: -0.45 },
    { id: 'BOOM300', name: 'Boom 300', price: 2345.67, change: 2.10 },
    { id: 'CRASH300', name: 'Crash 300', price: 1234.56, change: -1.30 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trading Terminal</h1>
          <p className="text-gray-400 mt-1">Execute trades with professional tools</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Advanced Chart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Symbol List */}
        <div className="space-y-2">
          {symbols.map((symbol) => (
            <motion.div
              key={symbol.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  'p-4 cursor-pointer transition-all duration-200',
                  activeSymbol === symbol.id
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                )}
                onClick={() => setActiveSymbol(symbol.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">{symbol.name}</h3>
                    <p className="text-lg font-bold text-white mt-1">${symbol.price}</p>
                  </div>
                  <span className={cn(
                    'text-sm font-medium',
                    symbol.change > 0 ? 'text-green-400' : 'text-red-400'
                  )}>
                    {symbol.change > 0 ? '+' : ''}{symbol.change}%
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <TradingViewChart
            symbol={activeSymbol}
            data={[]}
            height={500}
          />
        </div>

        {/* Trading Panel */}
        <div className="space-y-4">
          {/* Order Type */}
          <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="w-full bg-gray-800">
                <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
                <TabsTrigger value="limit" className="flex-1">Limit</TabsTrigger>
                <TabsTrigger value="stop" className="flex-1">Stop</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4 space-y-4">
              {/* Amount */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Amount ($)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="bg-white/5 border-gray-800 text-white"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Duration</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-white/5 border-gray-800 text-white flex-1"
                  />
                  <select
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value)}
                    className="bg-white/5 border border-gray-800 rounded-lg text-white px-3"
                  >
                    <option value="t">Ticks</option>
                    <option value="s">Seconds</option>
                    <option value="m">Minutes</option>
                  </select>
                </div>
              </div>

              {/* Payout */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Potential Payout</span>
                  <span className="text-green-400">+$195.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Risk</span>
                  <span className="text-red-400">-$100.00</span>
                </div>
              </div>

              {/* Trade Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-6">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  BUY
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-6">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  SELL
                </Button>
              </div>
            </div>
          </Card>

          {/* Market Info */}
          <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <h3 className="text-sm font-semibold text-white mb-3">Market Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Spread</span>
                <span className="text-white">1.2 pips</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pip Size</span>
                <span className="text-white">0.01</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Min Stake</span>
                <span className="text-white">$1.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Max Payout</span>
                <span className="text-white">$50,000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}