// apps/frontend/src/app/(dashboard)/analytics/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TradingViewChart } from '@intelliwave/charts/TradingViewChart';
import { EquityCurve } from '@intelliwave/charts/EquityCurve';
import { PnLCalendar } from '@intelliwave/charts/PnLCalendar';
import { analyticsApi } from '@/lib/api';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  Target,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  Zap,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const [metrics, equity, dailyPnL, distribution, bots] = await Promise.all([
        analyticsApi.getPerformanceMetrics(),
        analyticsApi.getEquityCurve(period === '30d' ? 30 : period === '7d' ? 7 : 90),
        analyticsApi.getDailyPnL(period === '30d' ? 30 : period === '7d' ? 7 : 90),
        analyticsApi.getTradeDistribution(),
        analyticsApi.getBotAnalytics(),
      ]);

      setAnalytics({
        metrics,
        equity,
        dailyPnL,
        distribution,
        bots,
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className={cn('p-2 rounded-lg', `bg-${color}-500/10`)}>
            <Icon className={cn('w-6 h-6', `text-${color}-400`)} />
          </div>
          {change && (
            <span className={cn(
              'text-sm font-medium',
              change > 0 ? 'text-green-400' : 'text-red-400'
            )}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
        <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Performance metrics and trading insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPeriod('7d')}
            className={cn(period === '7d' ? 'bg-blue-600 text-white' : '')}
          >
            7D
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPeriod('30d')}
            className={cn(period === '30d' ? 'bg-blue-600 text-white' : '')}
          >
            30D
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPeriod('90d')}
            className={cn(period === '90d' ? 'bg-blue-600 text-white' : '')}
          >
            90D
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={fetchAnalytics}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Return"
          value={analytics?.metrics?.totalReturn ? `${analytics.metrics.totalReturn}%` : '$0'}
          change={analytics?.metrics?.totalReturn}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Win Rate"
          value={`${analytics?.metrics?.winRate || 0}%`}
          change={5.2}
          icon={Target}
          color="blue"
        />
        <StatCard
          title="Sharpe Ratio"
          value={analytics?.metrics?.sharpeRatio || '0'}
          icon={Activity}
          color="purple"
        />
        <StatCard
          title="Profit Factor"
          value={analytics?.metrics?.profitFactor || '0'}
          change={-2.1}
          icon={Zap}
          color="orange"
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="equity" className="space-y-6">
        <TabsList className="bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="equity">Equity Curve</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="bots">Bot Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="equity">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EquityCurve
                data={analytics?.equity || []}
                height={400}
              />
            </div>
            <div className="space-y-6">
              <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Trade Statistics</h3>
                <div className="space-y-3">
                  <StatRow label="Total Trades" value={analytics?.metrics?.totalTrades || 0} />
                  <StatRow label="Winning Trades" value={analytics?.metrics?.winningTrades || 0} color="text-green-400" />
                  <StatRow label="Losing Trades" value={analytics?.metrics?.losingTrades || 0} color="text-red-400" />
                  <StatRow label="Average Win" value={`$${analytics?.metrics?.averageWin || 0}`} color="text-green-400" />
                  <StatRow label="Average Loss" value={`$${analytics?.metrics?.averageLoss || 0}`} color="text-red-400" />
                  <StatRow label="Max Drawdown" value={`${analytics?.metrics?.maxDrawdown || 0}%`} />
                  <StatRow label="Expectancy" value={`$${analytics?.metrics?.expectancy || 0}`} />
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <PnLCalendar data={analytics?.dailyPnL || []} />
        </TabsContent>

        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Trade Distribution by Symbol</h3>
              {analytics?.distribution?.map((item: any) => (
                <div key={item.symbol} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.symbol}</span>
                    <span className={cn(
                      'font-medium',
                      item.pnl > 0 ? 'text-green-400' : 'text-red-400'
                    )}>
                      {item.pnl > 0 ? '+' : ''}{item.pnl}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={cn(
                        'h-2 rounded-full',
                        item.pnl > 0 ? 'bg-green-500' : 'bg-red-500'
                      )}
                      style={{ width: `${Math.min(Math.abs(item.pnl) / 1000 * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </Card>
            <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Win/Loss Ratio</h3>
              {/* Pie chart component */}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bots">
          <div className="space-y-6">
            {analytics?.bots?.map((bot: any) => (
              <Card key={bot.id} className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
                    <span className={cn(
                      'inline-block px-2 py-1 rounded-full text-xs font-medium mt-1',
                      bot.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                    )}>
                      {bot.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total P&L</p>
                    <p className={cn(
                      'text-xl font-bold',
                      bot.totalPnL > 0 ? 'text-green-400' : 'text-red-400'
                    )}>
                      {bot.totalPnL > 0 ? '+' : ''}{bot.totalPnL}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <MiniStat label="Trades" value={bot.totalTrades} />
                  <MiniStat label="Win Rate" value={`${bot.winRate}%`} />
                  <MiniStat label="Capital" value={`$${bot.capital}`} />
                  <MiniStat label="Avg Duration" value={bot.avgTradeDuration || '-'} />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const StatRow = ({ label, value, color = 'text-white' }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-400">{label}</span>
    <span className={cn('text-sm font-medium', color)}>{value}</span>
  </div>
);

const MiniStat = ({ label, value }: any) => (
  <div className="text-center">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-white mt-1">{value}</p>
  </div>
);