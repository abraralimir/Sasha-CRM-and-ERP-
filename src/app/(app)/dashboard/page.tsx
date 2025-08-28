import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Lightbulb, TrendingUp, BotMessageSquare, FileText, ArrowRight, Users, Briefcase, Target, LifeBuoy, BarChart2, Settings, Contact } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Contacts",
    description: "Manage your customers, leads, and vendors in one place.",
    href: "/contacts",
    icon: <Contact className="w-8 h-8 text-primary" />,
  },
   {
    title: "Leads",
    description: "Capture, track, and prioritize potential new customers.",
    href: "/leads",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Opportunities",
    description: "Track sales deals and manage your pipeline from prospect to close.",
    href: "/opportunities",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
  },
  {
    title: "Accounts",
    description: "Manage the companies and organizations you do business with.",
    href: "/accounts",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Marketing Campaigns",
    description: "Plan, execute, and track your marketing efforts.",
    href: "/campaigns",
    icon: <Target className="w-8 h-8 text-primary" />,
  },
  {
    title: "Support Tickets",
    description: "Provide excellent customer service by managing support requests.",
    href: "/support",
    icon: <LifeBuoy className="w-8 h-8 text-primary" />,
  },
  {
    title: "Reports & Analytics",
    description: "Gain insights into your business with customizable reports.",
    href: "/reports",
    icon: <BarChart2 className="w-8 h-8 text-primary" />,
  },
   {
    title: "AI Task Allocation",
    description: "Automatically assign tasks based on priority, skills, and deadlines.",
    href: "/tasks",
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
  },
  {
    title: "Sales Prediction",
    description: "Forecast sales trends and optimize your strategy with ML-powered insights.",
    href: "/sales",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
  },
  {
    title: "AI Messaging",
    description: "Generate intelligent, context-aware replies to customer inquiries.",
    href: "/messaging",
    icon: <BotMessageSquare className="w-8 h-8 text-primary" />,
  },
  {
    title: "Document Analysis",
    description: "Extract key information and insights from your business documents.",
    href: "/documents",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
   {
    title: "Settings",
    description: "Customize your CRM, manage users, and configure integrations.",
    href: "/settings",
    icon: <Settings className="w-8 h-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold font-headline">Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <div className="mb-8">
            <h2 className="text-2xl font-bold font-headline mb-2">Welcome to Sasha AI CRM</h2>
            <p className="text-muted-foreground">Here's a quick overview of your business. Dive into a feature to get started.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.href} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link href={feature.href}>
                    View Feature <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
