// apps/frontend/src/app/(dashboard)/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TradingViewChart } from '@intelliwave/charts/TradingViewChart';
import { EquityCurve } from '@intelliwave/charts/EquityCurve';
import {
  RealTimeTradeFeed,
  MarketWatch,
  ActiveBotsWidget,
  RiskAlertsWidget,
} from '@/components/dashboard/RealTimeWidgets';
import { useAuth } from '@/lib/auth-context';
import { dashboardApi } from '@/lib/api';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Bot,
  Bell,
  Settings,
  Command,
  Plus,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Top Bar */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.firstName || 'Trader'}
            </h1>
            <p className="text-gray-400 mt-1">Here's your trading overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="text-gray-400">
              <Command className="w-4 h-4 mr-2" />
              Quick Actions
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Trade
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <QuickStatCard
            title="Portfolio Value"
            value="$12,450.00"
            change="+15.2%"
            icon={Wallet}
            positive
          />
          <QuickStatCard
            title="Today's P&L"
            value="$234.50"
            change="+2.1%"
            icon={TrendingUp}
            positive
          />
          <QuickStatCard
            title="Active Bots"
            value="3/5"
            change="Running"
            icon={Bot}
          />
          <QuickStatCard
            title="Win Rate"
            value="68%"
            change="+5%"
            icon={BarChart3}
            positive
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            <TradingViewChart
              data={[]} // Will be populated with real data
              symbol="Volatility 75 Index"
              height={500}
            />
            
            <EquityCurve
              data={[]} // Will be populated with real data
              height={300}
            />
          </div>

          {/* Widgets Section */}
          <div className="space-y-6">
            <RealTimeTradeFeed />
            <MarketWatch />
            <ActiveBotsWidget />
            <RiskAlertsWidget />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Trade executed: Volatility 75</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                  <span className="text-sm text-green-400">+$23.50</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-400 font-medium">Market Analysis</p>
                <p className="text-sm text-gray-300 mt-1">
                  Volatility 75 showing strong bullish momentum. Consider long positions with tight stops.
                </p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400 font-medium">Opportunity</p>
                <p className="text-sm text-gray-300 mt-1">
                  RSI indicates oversold conditions on Crash 300. Potential bounce opportunity.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-400 font-medium">Risk Alert</p>
                <p className="text-sm text-gray-300 mt-1">
                  Increased volatility expected. Reduce position sizes by 25%.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const QuickStatCard = ({ title, value, change, icon: Icon, positive }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <span className={cn(
          'text-sm font-medium',
          positive ? 'text-green-400' : 'text-gray-400'
        )}>
          {change}
        </span>
      </div>
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </Card>
  </motion.div>
);