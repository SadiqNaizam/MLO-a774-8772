import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopHeader from '@/components/layout/TopHeader';
import FunnelTable from '@/components/Dashboard/FunnelTable';
import PieChartSources from '@/components/Dashboard/PieChartSources';
import LeadsTrackingGraph from '@/components/Dashboard/LeadsTrackingGraph';
import ReasonsOfLostStats from '@/components/Dashboard/ReasonsOfLostStats';
import OtherDataCards from '@/components/Dashboard/OtherDataCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const LeadsDashboardPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };
  
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Tab styling classes to match the image design
  const tabListClassName = "inline-flex items-center justify-start p-0 bg-transparent border-b border-border mb-6";
  const tabTriggerClassName = cn(
    "px-4 py-3 -mb-[1px] text-sm font-medium",
    "rounded-none border-b-2 border-transparent",
    "text-muted-foreground hover:text-primary",
    "data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:z-10",
    "transition-colors duration-150"
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar: Sidebar.tsx handles its own fixed positioning and md:flex visibility */} 
      <Sidebar />

      {/* Mobile Sidebar: Conditionally rendered with an overlay */} 
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-30" role="dialog" aria-modal="true">
          {/* Overlay */} 
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={closeMobileSidebar}
            aria-hidden="true"
          />
          {/* 
            Sidebar Content for Mobile.
            NOTE: The provided Sidebar.tsx has 'hidden md:flex', which means it's hidden by default on mobile.
            This implementation will render it, but its internal classes might still hide it.
            A more robust solution would involve modifying Sidebar.tsx to accept an isOpen prop 
            or using a component like Shadcn's Sheet/Drawer if available.
          */} 
          <div className="fixed top-0 left-0 z-40 h-screen w-60 bg-sidebar text-sidebar-foreground flex flex-col">
             <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */} 
      <div className="flex flex-1 flex-col md:pl-60"> {/* md:pl-60 accounts for desktop sidebar width */} 
        {/* TopHeader: Handles its own fixed positioning and content */} 
        <TopHeader onMenuButtonClick={toggleMobileSidebar} />
        
        <main className="flex-1 p-6 mt-[70px] overflow-y-auto"> {/* mt-[70px] accounts for fixed header height */} 
          <div className="flex flex-col gap-6">
            {/* Tabs for Sales/Leads */} 
            <div>
              <Tabs defaultValue="leads" className="w-full">
                <TabsList className={tabListClassName}>
                  <TabsTrigger value="sales" className={tabTriggerClassName}>Sales</TabsTrigger>
                  <TabsTrigger value="leads" className={tabTriggerClassName}>Leads</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sales">
                  <Card>
                    <CardContent className="flex items-center justify-center h-96 p-6">
                      <p className="text-muted-foreground text-center">Sales data and components would be displayed here. This section is a placeholder.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="leads">
                  <div className="flex flex-col gap-6">
                    {/* Row 1: FunnelTable & PieChartSources */} 
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <FunnelTable className="lg:col-span-3" />
                      <PieChartSources className="lg:col-span-2" />
                    </div>

                    {/* Row 2: LeadsTrackingGraph */} 
                    <LeadsTrackingGraph />

                    {/* Row 3: ReasonsOfLostStats & OtherDataCards */} 
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <ReasonsOfLostStats className="lg:col-span-2" />
                      <OtherDataCards className="lg:col-span-3" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeadsDashboardPage;
