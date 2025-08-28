
'use client';

import { useFormStatus } from 'react-dom';
import { handleSalesPrediction, FormState } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useEffect, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrendingUp, FileText, Lightbulb, BarChart } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating Forecast...' : 'Generate Forecast'}
    </Button>
  );
}

const sampleHistoricalData = JSON.stringify([
    { "month": "Jan", "revenue": 150000, "deals": 30 },
    { "month": "Feb", "revenue": 165000, "deals": 35 },
    { "month": "Mar", "revenue": 180000, "deals": 40 },
    { "month": "Apr", "revenue": 175000, "deals": 38 },
    { "month": "May", "revenue": 190000, "deals": 42 },
    { "month": "Jun", "revenue": 210000, "deals": 45 }
], null, 2);

const sampleMarketTrends = "Increased demand for cloud migration services. Growing interest in AI-powered cybersecurity solutions. Shift towards remote work driving need for robust collaboration tools.";
const sampleSalesStrategy = "Aggressive outbound campaign targeting mid-size tech companies. Focus on upselling cloud services to existing client base. Offering bundled packages for cybersecurity and data analytics.";


export default function SalesPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(handleSalesPrediction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message.startsWith('Error:')) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold font-headline">Sales Prediction</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Prediction Inputs</CardTitle>
            <CardDescription>
              Provide the necessary data for the AI to generate a sales forecast.
            </CardDescription>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="historicalSalesData">Historical Sales Data</Label>
                <Textarea
                  id="historicalSalesData"
                  name="historicalSalesData"
                  placeholder="e.g., CSV or JSON data of past sales."
                  rows={8}
                  required
                  defaultValue={sampleHistoricalData}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketTrends">Market Trends</Label>
                <Textarea
                  id="marketTrends"
                  name="marketTrends"
                  placeholder="e.g., 'Growing interest in sustainable products.'"
                  rows={4}
                  required
                  defaultValue={sampleMarketTrends}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salesStrategy">Current Sales Strategy</Label>
                <Textarea
                  id="salesStrategy"
                  name="salesStrategy"
                  placeholder="e.g., 'Focus on upselling to existing customers.'"
                  rows={4}
                  required
                  defaultValue={sampleSalesStrategy}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="forecastHorizon">Forecast Horizon</Label>
                <Input
                  id="forecastHorizon"
                  name="forecastHorizon"
                  placeholder="e.g., 'Next Quarter' or 'Next 6 months'"
                  required
                  defaultValue="Next Quarter"
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        <div className="md:col-span-2 space-y-8">
          {state.data ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="font-headline">Sales Forecast</CardTitle>
                    <CardDescription>Expected sales figures, key factors, and confidence intervals.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap">{state.data.salesForecast}</CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <FileText className="w-8 h-8 text-primary" />
                   <div>
                    <CardTitle className="font-headline">Market Analysis</CardTitle>
                    <CardDescription>Analysis of market trends expected to impact sales.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap">{state.data.marketAnalysis}</CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="font-headline">Strategy Recommendations</CardTitle>
                    <CardDescription>Recommendations for optimizing your sales strategy.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap">{state.data.strategyRecommendations}</CardContent>
              </Card>
            </>
          ) : (
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Awaiting Input</AlertTitle>
              <AlertDescription>
                Your sales forecast will appear here once you provide the required data.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </div>
  );
}
