import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Users } from "lucide-react";

export default function LeadsPage() {
  return (
     <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold font-headline">Leads</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
                <div className="mx-auto bg-secondary p-3 rounded-full w-fit">
                    <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="font-headline mt-4">Lead Management</CardTitle>
                <CardDescription>
                    This is where you'll capture, track, and prioritize leads.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">This feature is currently under construction.</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
