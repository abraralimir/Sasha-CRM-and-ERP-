
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart2, Bot, Briefcase, Contact, FileText, LifeBuoy, Lightbulb, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const crmFeatures = [
    {
      title: "Contact Management",
      description: "Centralized storage of customer, lead, and vendor information.",
      icon: <Contact className="w-8 h-8 text-primary" />,
    },
    {
      title: "Lead & Opportunity Management",
      description: "Capture, track, and prioritize leads and manage sales pipelines.",
      icon: <Users className="w-8 h-8 text-primary" />,
    },
    {
      title: "Sales Automation",
      description: "Automate follow-ups, reminders, and track deal stages.",
      icon: <Briefcase className="w-8 h-8 text-primary" />,
    },
    {
      title: "Marketing Automation",
      description: "Manage campaigns, email marketing, and social media engagement.",
      icon: <Target className="w-8 h-8 text-primary" />,
    },
    {
      title: "Customer Support",
      description: "Ticketing system to track customer inquiries and issues.",
      icon: <LifeBuoy className="w-8 h-8 text-primary" />,
    },
    {
      title: "Analytics & Reporting",
      description: "Dashboards for real-time insights into sales, marketing, and service.",
      icon: <BarChart2 className="w-8 h-8 text-primary" />,
    },
];

const aiFeatures = [
    {
        title: "AI Task Allocation",
        description: "Automatically assign tasks based on priority, skills, and deadlines.",
        icon: <Lightbulb className="w-8 h-8 text-primary" />,
      },
      {
        title: "Sales Prediction",
        description: "Forecast sales trends and optimize your strategy with ML-powered insights.",
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
      },
      {
        title: "AI Messaging",
        description: "Generate intelligent, context-aware replies to customer inquiries.",
        icon: <Bot className="w-8 h-8 text-primary" />,
      },
      {
        title: "Document Analysis",
        description: "Extract key information and insights from your business documents.",
        icon: <FileText className="w-8 h-8 text-primary" />,
      },
];


export default function HomePage() {
  return (
    <>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-secondary">
            <div className="container text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">The Future of Customer Relationships is Intelligent</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                    Sasha AI CRM combines a full-featured CRM with powerful AI assistants to help you close more deals, delight your customers, and grow your business faster.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/dashboard">
                            Live Demo <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/login">
                           Sign Up
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Image Showcase */}
        <section className="py-16">
            <div className="container">
                <div className="relative aspect-[16/9] w-full rounded-2xl shadow-2xl overflow-hidden border">
                     <Image 
                        src="https://picsum.photos/1280/720" 
                        alt="Sasha AI CRM Dashboard"
                        fill
                        className="object-cover"
                        data-ai-hint="abstract technology"
                        />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">All-in-One CRM Platform</h2>
                    <p className="text-lg text-muted-foreground mt-2">Everything you need to manage your business relationships.</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {crmFeatures.map((feature) => (
                        <Card key={feature.title} className="text-center flex flex-col">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="font-headline">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        {/* AI Features Section */}
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Powered by Artificial Intelligence</h2>
                    <p className="text-lg text-muted-foreground mt-2">Work smarter, not harder, with our suite of AI-powered tools.</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                     {aiFeatures.map((feature) => (
                        <Card key={feature.title} className="text-center flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                                {feature.icon}
                            </div>
                            <CardTitle className="font-headline">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    </>
  );
}
