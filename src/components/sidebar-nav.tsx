'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart2,
  BotMessageSquare,
  Briefcase,
  Contact,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Settings,
  Target,
  TrendingUp,
  Users,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';


export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/dashboard" passHref>
          <SidebarMenuButton
            isActive={isActive('/dashboard')}
            tooltip={{ children: 'Dashboard' }}
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>

      <SidebarGroup>
        <SidebarGroupLabel>CRM</SidebarGroupLabel>
        <SidebarMenuItem>
            <Link href="/contacts" passHref>
                <SidebarMenuButton isActive={isActive('/contacts')} tooltip={{children: "Contacts"}}>
                    <Contact/>
                    <span>Contacts</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/leads" passHref>
                <SidebarMenuButton isActive={isActive('/leads')} tooltip={{children: "Leads"}}>
                    <Users/>
                    <span>Leads</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/opportunities" passHref>
                <SidebarMenuButton isActive={isActive('/opportunities')} tooltip={{children: "Opportunities"}}>
                    <Briefcase/>
                    <span>Opportunities</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/accounts" passHref>
                <SidebarMenuButton isActive={isActive('/accounts')} tooltip={{children: "Accounts"}}>
                    <Users/>
                    <span>Accounts</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Marketing</SidebarGroupLabel>
        <SidebarMenuItem>
            <Link href="/campaigns" passHref>
                <SidebarMenuButton isActive={isActive('/campaigns')} tooltip={{children: "Campaigns"}}>
                    <Target/>
                    <span>Campaigns</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      </SidebarGroup>

       <SidebarGroup>
        <SidebarGroupLabel>Service</SidebarGroupLabel>
        <SidebarMenuItem>
            <Link href="/support" passHref>
                <SidebarMenuButton isActive={isActive('/support')} tooltip={{children: "Support Tickets"}}>
                    <LifeBuoy/>
                    <span>Support Tickets</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      </SidebarGroup>

      <SidebarMenuItem>
        <Collapsible>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton
                className="w-full justify-between"
                variant="ghost"
                >
                <div className="flex items-center gap-2">
                    <BotMessageSquare />
                    <span>AI Tools</span>
                </div>
                <ChevronDown className={cn("h-4 w-4", state === 'collapsed' && 'hidden')} />
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
                 <div className={cn("grid gap-1 px-2 py-1", state === 'collapsed' && 'hidden')}>
                    <Link href="/tasks" passHref>
                        <Button variant={isActive('/tasks') ? 'secondary' : 'ghost'} size="sm" className="w-full justify-start gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Task Allocation
                        </Button>
                    </Link>
                     <Link href="/sales" passHref>
                        <Button variant={isActive('/sales') ? 'secondary' : 'ghost'} size="sm" className="w-full justify-start gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Sales Prediction
                        </Button>
                    </Link>
                    <Link href="/messaging" passHref>
                        <Button variant={isActive('/messaging') ? 'secondary' : 'ghost'} size="sm" className="w-full justify-start gap-2">
                            <BotMessageSquare className="h-4 w-4" />
                            AI Messaging
                        </Button>
                    </Link>
                    <Link href="/documents" passHref>
                        <Button variant={isActive('/documents') ? 'secondary' : 'ghost'} size="sm" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" />
                           Document Analysis
                        </Button>
                    </Link>
                </div>
            </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>

      <SidebarMenuItem className="mt-auto">
        <Link href="/settings" passHref>
          <SidebarMenuButton isActive={isActive('/settings')} tooltip={{ children: 'Settings' }}>
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
