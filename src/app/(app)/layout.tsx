'use client';

import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
          <div className="flex flex-col h-full">
          <SidebarHeader>
              <Logo />
          </SidebarHeader>
          <SidebarContent>
              <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="flex items-center justify-between p-2">
              <UserNav />
              <ThemeToggle />
          </SidebarFooter>
          </div>
      </Sidebar>
      <SidebarInset>
            {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
