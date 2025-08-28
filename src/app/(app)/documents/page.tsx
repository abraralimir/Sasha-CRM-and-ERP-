'use client';

import { useFormStatus } from 'react-dom';
import { handleDocumentAnalysis, FormState } from './actions';
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
import { useEffect, useState, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, Sparkles, Upload } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Analyzing...' : 'Analyze Document'}
    </Button>
  );
}

export default function DocumentsPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(handleDocumentAnalysis, initialState);
  const { toast } = useToast();
  const [dataUri, setDataUri] = useState('');
  const [fileName, setFileName] = useState('');
  const formRef = useRef<HTMLFormElement>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (state.message) {
      if (state.message.startsWith('Error:')) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: state.message,
        });
      } else if(state.data) {
        toast({
            title: 'Success',
            description: 'Document analysis complete.',
        });
        formRef.current?.reset();
        setFileName('');
        setDataUri('');
      }
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold font-headline">AI Document Analysis</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Upload Document</CardTitle>
            <CardDescription>
              Upload a document and provide instructions for the AI to analyze it.
            </CardDescription>
          </CardHeader>
          <form action={formAction} ref={formRef}>
            <input type="hidden" name="documentDataUri" value={dataUri} />
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documentFile">Document</Label>
                <div className="flex items-center gap-2">
                  <Input id="documentFile" type="file" onChange={handleFileChange} className="hidden" accept=".doc,.docx,.xls,.xlsx,.csv,.pdf,.txt" />
                  <Button asChild variant="outline">
                    <Label htmlFor="documentFile" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                    </Label>
                  </Button>
                  {fileName && <span className="text-sm text-muted-foreground truncate">{fileName}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="analysisInstructions">Analysis Instructions</Label>
                <Textarea
                  id="analysisInstructions"
                  name="analysisInstructions"
                  placeholder="e.g., 'Summarize the key findings and action items from this report.'"
                  rows={5}
                  required
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
              <CardTitle className="font-headline">Analysis Summary</CardTitle>
              <CardDescription>
                Key information and insights extracted from the document.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.data ? (
                <div className="p-4 bg-secondary/50 rounded-md border text-sm text-foreground whitespace-pre-wrap">
                  {state.data.summary}
                </div>
              ) : (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Awaiting Document</AlertTitle>
                  <AlertDescription>
                    The analysis summary will appear here once you submit a document.
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
