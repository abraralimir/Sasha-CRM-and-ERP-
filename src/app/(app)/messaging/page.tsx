'use client';

import { useFormStatus } from 'react-dom';
import { handleGenerateReply, FormState } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useEffect, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BotMessageSquare, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : 'Generate Reply'}
    </Button>
  );
}

export default function MessagingPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(handleGenerateReply, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message.startsWith('Error:')) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    if(state.message && state.message.startsWith('Reply generated')) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold font-headline">AI Messaging Assistant</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Customer Inquiry</CardTitle>
            <CardDescription>
              Enter the customer's message and let the AI draft a response.
            </CardDescription>
          </CardHeader>
          <form action={formAction} ref={formRef}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerInquiry">Inquiry</Label>
                <Textarea
                  id="customerInquiry"
                  name="customerInquiry"
                  placeholder="Paste customer's email or chat message here..."
                  rows={8}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Response Tone</Label>
                <Select name="tone" defaultValue="professional">
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="empathetic">Empathetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalContext">Additional Context</Label>
                <Textarea
                  id="additionalContext"
                  name="additionalContext"
                  placeholder="e.g., 'Customer has been a premium member for 3 years.'"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline">Suggested Reply</CardTitle>
              <CardDescription>
                AI-generated response. Review and edit before sending.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.data ? (
                <div className="p-4 bg-secondary/50 rounded-md border text-sm text-foreground whitespace-pre-wrap">
                  {state.data.suggestedReply}
                </div>
              ) : (
                <Alert>
                  <BotMessageSquare className="h-4 w-4" />
                  <AlertTitle>Awaiting Inquiry</AlertTitle>
                  <AlertDescription>
                    The AI-generated reply will appear here.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
