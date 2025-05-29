import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  onMenuButtonClick?: () => void; // For sidebar toggle on mobile
  // Page title could be a prop or come from a route management system
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onMenuButtonClick }) => {
  const pageTitle = 'Dashboard'; // Based on project requirements

  const handleCreateClick = React.useCallback(() => {
    // Placeholder for 'Create' button functionality (e.g., open dropdown menu)
    // In a real app, this would likely trigger a Shadcn DropdownMenu component.
    console.log('Create button clicked - Dropdown would open here.');
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-10 flex h-[70px] items-center justify-between border-b',
        'border-border bg-card px-4 shadow-sm md:left-60 md:px-6',
        className
      )}
    >
      {/* Left Section: Mobile Menu Toggle & Page Title */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* SidebarToggle: Displayed on mobile to toggle sidebar visibility */}
        {/* The 'onMenuButtonClick' prop would be connected to layout state to control sidebar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuButtonClick}
          className="text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* DashboardHeading: Page Title */}
        <h1 className="text-lg font-semibold text-foreground md:text-xl">
          {pageTitle}
        </h1>
      </div>

      {/* Right Section: Actions (e.g., Create Button) */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* CreateButton: Placeholder for a button that likely triggers a dropdown */}
        <Button
          variant="default" // This uses primary color scheme by default from Shadcn UI theme
          onClick={handleCreateClick}
        >
          Create
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        {/* Other elements like notifications or user profile could be added here */}
      </div>
    </header>
  );
};

export default TopHeader;
