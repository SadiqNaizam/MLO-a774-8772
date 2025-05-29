import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface MonthlyLeadData {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingGraphData: MonthlyLeadData[] = [
  { month: 'March', closedWon: 68, closedLost: 52 },
  { month: 'April', closedWon: 45, closedLost: 38 },
  { month: 'May', closedWon: 92, closedLost: 60 },
  { month: 'June', closedWon: 20, closedLost: 75 },
  { month: 'July', closedWon: 48, closedLost: 35 },
  { month: 'August', closedWon: 70, closedLost: 95 },
];

const totalClosed = 680;
const totalLost = 70;

interface LeadsTrackingGraphProps {
  className?: string;
}

const LeadsTrackingGraph: React.FC<LeadsTrackingGraphProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
        <Button variant="outline" size="sm" className="ml-auto text-xs">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-8 mb-6">
          <div>
            <span className="text-3xl font-bold text-foreground">{totalClosed}</span>
            <span className="ml-2 text-sm text-muted-foreground">total closed</span>
          </div>
          <div>
            <span className="text-3xl font-bold text-foreground">{totalLost}</span>
            <span className="ml-2 text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingGraphData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false}/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)'}}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold'}}
              />
              <Area type="monotone" dataKey="closedWon" stroke="#0AB39C" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} name="Closed Won" dot={{ r: 4, fill: '#0AB39C', strokeWidth:0 }} activeDot={{ r: 6, fill: '#0AB39C', stroke: 'hsl(var(--card))', strokeWidth: 2 }}/>
              <Area type="monotone" dataKey="closedLost" stroke="#F06548" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} name="Closed Lost" dot={{ r: 4, fill: '#F06548', strokeWidth:0 }} activeDot={{ r: 6, fill: '#F06548', stroke: 'hsl(var(--card))', strokeWidth: 2 }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2 bg-accent" />
                <span className="text-muted-foreground">Closed won</span>
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2 bg-destructive" />
                <span className="text-muted-foreground">Closed lost</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;
