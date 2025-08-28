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
} from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isActive = (path: string) => pathname === path;

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

      <SidebarGroup>
        <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
        <SidebarMenuItem>
            <Link href="/tasks" passHref>
                <SidebarMenuButton isActive={isActive('/tasks')} tooltip={{children: "Task Allocation"}}>
                    <Lightbulb/>
                    <span>Task Allocation</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/sales" passHref>
                <SidebarMenuButton isActive={isActive('/sales')} tooltip={{children: "Sales Prediction"}}>
                    <TrendingUp/>
                    <span>Sales Prediction</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/messaging" passHref>
                <SidebarMenuButton isActive={isActive('/messaging')} tooltip={{children: "AI Messaging"}}>
                    <BotMessageSquare/>
                    <span>AI Messaging</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/documents" passHref>
                <SidebarMenuButton isActive={isActive('/documents')} tooltip={{children: "Document Analysis"}}>
                    <FileText/>
                    <span>Document Analysis</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      </SidebarGroup>

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
