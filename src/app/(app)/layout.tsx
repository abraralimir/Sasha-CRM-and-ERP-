
'use client';

import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner size="large" />
        </div>
    )
  }

  if (!user) {
      return null;
  }

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


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AuthProvider>
  );
}
