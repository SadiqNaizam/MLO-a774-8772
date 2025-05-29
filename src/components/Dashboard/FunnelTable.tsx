import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  avgTime: string;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
  isSpecial?: boolean; // For 'In conversation' to display text instead of time
  hasTooltip?: boolean; // For 'Qualified' to show tooltip
}

const funnelStagesData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, avgTime: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, avgTime: '2 days', color: 'bg-yellow-400', hasTooltip: true },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, avgTime: 'average time on this stage', color: 'bg-indigo-800', isSpecial: true },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, avgTime: '8 days', color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, avgTime: '10 days', color: 'bg-purple-600' },
];

const totalLeadsInFunnel = funnelStagesData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelTableProps {
  className?: string;
}

const FunnelTable: React.FC<FunnelTableProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-foreground">600</p>
            <p className="text-xs text-muted-foreground">active leads</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex w-full h-2 rounded-full overflow-hidden">
            {funnelStagesData.map((stage) => (
              <div
                key={stage.id}
                className={cn(stage.color)}
                style={{ width: `${(stage.count / totalLeadsInFunnel) * 100}%` }}
                title={`${stage.name}: ${stage.count}`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {funnelStagesData.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)} />
              <div className="text-foreground font-medium truncate" title={stage.name}>{stage.name}</div>
              <div className="text-muted-foreground text-right">{stage.count}</div>
              <div className="text-muted-foreground text-right">$ {stage.value}</div>
              {stage.isSpecial ? (
                <div className="text-muted-foreground text-right text-xs italic truncate" title={stage.avgTime}>{stage.avgTime}</div>
              ) : stage.hasTooltip ? (
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <div className="text-muted-foreground text-right cursor-default truncate" title={stage.avgTime}>{stage.avgTime}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="text-muted-foreground text-right truncate" title={stage.avgTime}>{stage.avgTime}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelTable;
