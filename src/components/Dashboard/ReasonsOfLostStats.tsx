import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonStat {
  id: string;
  percentage: string;
  reason: string;
}

const reasonsData: ReasonStat[] = [
  { id: 'unclearProposalMain', percentage: '40%', reason: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: '20%', reason: 'However venture pursuit' },
  { id: 'other', percentage: '10%', reason: 'Other' },
  { id: 'unclearProposalSecondary', percentage: '30%', reason: 'The proposal is unclear' }, 
];

interface ReasonsOfLostStatsProps {
  className?: string;
}

const ReasonsOfLostStats: React.FC<ReasonsOfLostStatsProps> = ({ className }) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          {reasonsData.map((stat) => (
            <div key={stat.id}>
              <p className="text-4xl font-bold text-foreground mb-1">{stat.percentage}</p>
              <p className="text-sm text-muted-foreground">{stat.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsOfLostStats;
