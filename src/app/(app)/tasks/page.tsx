'use client';

import { useFormStatus } from 'react-dom';
import { handleTaskAllocation, FormState } from './actions';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useEffect, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, UserCheck } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Allocating...' : 'Allocate Task'}
    </Button>
  );
}

export default function TasksPage() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(handleTaskAllocation, initialState);
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
          <h1 className="text-xl font-semibold font-headline">AI Task Allocation</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">New Task Details</CardTitle>
            <CardDescription>
              Fill in the details below and our AI will assign the task to the best-suited employee.
            </CardDescription>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskDescription">Task Description</Label>
                <Textarea
                  id="taskDescription"
                  name="taskDescription"
                  placeholder="e.g., Develop a new feature for the user dashboard."
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taskPriority">Priority</Label>
                  <Select name="taskPriority" defaultValue="Medium">
                    <SelectTrigger id="taskPriority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskDeadline">Deadline</Label>
                  <Input id="taskDeadline" name="taskDeadline" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeSkills">Required Skills</Label>
                <Input
                  id="employeeSkills"
                  name="employeeSkills"
                  placeholder="e.g., JavaScript, React, Node.js"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Enter skills separated by commas.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-8">
            {state.data ? (
                 <Card className='bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <UserCheck className="w-8 h-8 text-green-600" />
                            <div>
                                <CardTitle className="font-headline text-green-900 dark:text-green-100">Task Assigned</CardTitle>
                                <CardDescription className="text-green-700 dark:text-green-300">
                                Employee ID: {state.data.assignedEmployeeId}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Reasoning:</p>
                        <p className="text-muted-foreground">{state.data.reasoning}</p>
                    </CardContent>
                </Card>
            ) : (
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Waiting for Task</AlertTitle>
                    <AlertDescription>
                        The AI assignment will appear here once you submit a task.
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </main>
    </div>
  );
}
