import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  FileSpreadsheet,
  Package,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon, // Renamed to avoid conflict with potential Settings component
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType; // Accepts Lucide icons
  href: string;
  isActive?: boolean;
}

// Data defined directly in component as per requirements
const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '/leads' },
  { id: 'customers', label: 'Customers', icon: UserCog, href: '/customers' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '/proposals' },
  { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet, href: '/invoices' },
  { id: 'items', label: 'Items', icon: Package, href: '/items' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '/mail' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '/shoebox' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '/calendar' },
];

const footerNavItems: NavItem[] = [
  { id: 'help', label: 'Help', icon: HelpCircle, href: '/help' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '/settings' },
];

interface SidebarProps {
  className?: string;
  // In a real app, activePath would be passed or determined via context/hook
  // For this exercise, 'Dashboard' is hardcoded as active.
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        // Hidden on small screens, flex column on medium and up
        'fixed top-0 left-0 z-20 hidden h-screen w-60 flex-col bg-sidebar text-sidebar-foreground md:flex',
        className
      )}
    >
      <div className="flex h-[70px] items-center justify-center border-b border-sidebar-border px-6">
        {/* Logo - using text as per image. In a real app, this might be an SVG or Image component. */}
        <span className="text-3xl font-bold text-foreground">bo</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {mainNavItems.map((item) => (
          <a
            key={item.id}
            href={item.href} // In a real app, use Link from react-router-dom or Next.js
            className={cn(
              'flex items-center space-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
              item.isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
            )}
            aria-current={item.isActive ? 'page' : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="space-y-1">
          {footerNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                // Footer items usually don't have an 'active' state like main nav
                'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
