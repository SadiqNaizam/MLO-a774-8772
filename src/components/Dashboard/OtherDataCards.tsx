import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OtherStat {
  id: string;
  value: string;
  label: string;
  hasIcon?: boolean;
  iconTooltip?: string;
}

const otherStatsData: OtherStat[] = [
  { id: 'totalLeads', value: '900', label: 'total leads count' },
  { id: 'avgConversion', value: '12', label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: '30', label: 'inactive leads', hasIcon: true, iconTooltip: 'Number of leads with no activity for a defined period.' },
];

interface OtherDataCardsProps {
  className?: string;
}

const OtherDataCards: React.FC<OtherDataCardsProps> = ({ className }) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-0">
          {otherStatsData.map((stat) => (
            <div key={stat.id}>
              <p className="text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.hasIcon && (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      {stat.iconTooltip && 
                        <TooltipContent>
                          <p>{stat.iconTooltip}</p>
                        </TooltipContent>
                      }
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherDataCards;
