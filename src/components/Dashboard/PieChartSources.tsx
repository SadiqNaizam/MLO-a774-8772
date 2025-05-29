import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface SourceData {
  name: string;
  percentage: number; // Used for pie chart value and display
  amount: number; // Dollar amount
  color: string; // Hex color for recharts and legend dot
}

const COLORS: string[] = ['#F06548', '#FFD700', '#0AB39C', '#34C38F']; // Destructive, App Yellow, Accent Green, Light Green

const pieChartDataSource: SourceData[] = [
  { name: 'Clutch', percentage: 50, amount: 3000, color: COLORS[0] },
  { name: 'Behance', percentage: 40, amount: 1000, color: COLORS[1] },
  { name: 'Instagram', percentage: 10, amount: 1000, color: COLORS[2] },
  { name: 'Dribbble', percentage: 10, amount: 1000, color: COLORS[3] },
];

interface PieChartSourcesProps {
  className?: string;
}

const PieChartSources: React.FC<PieChartSourcesProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
        <Button variant="outline" size="sm" className="ml-auto text-xs">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leadsConverted" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="leadsCame" className="text-xs">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDeals" className="text-xs">Total deals size</TabsTrigger>
          </TabsList>
          <TabsContent value="leadsConverted">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 h-52 md:h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartDataSource}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="percentage"
                      labelLine={false}
                    >
                      {pieChartDataSource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                {pieChartDataSource.map((source) => (
                  <div key={source.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: source.color }} />
                      <span className="text-foreground">{source.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-muted-foreground">${source.amount.toLocaleString()}</span>
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                               <span className="text-muted-foreground cursor-default w-10 text-right">{source.percentage}%</span>
                            </TooltipTrigger>
                            { source.name === 'Dribbble' && (
                                <TooltipContent side="top" align="end">
                                    <p className="text-xs">from leads total</p>
                                </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
           <TabsContent value="leadsCame">
            <p className="text-center text-muted-foreground py-8">Leads Came data not available.</p>
          </TabsContent>
          <TabsContent value="totalDeals">
             <p className="text-center text-muted-foreground py-8">Total Deals Size data not available.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PieChartSources;
