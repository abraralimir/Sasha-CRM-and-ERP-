'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI task allocation.
 *
 * - allocateTask - A function that allocates tasks based on priority, skillset, and deadlines.
 * - AllocateTaskInput - The input type for the allocateTask function.
 * - AllocateTaskOutput - The return type for the allocateTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AllocateTaskInputSchema = z.object({
  taskDescription: z.string().describe('Description of the task to be allocated.'),
  taskPriority: z.enum(['High', 'Medium', 'Low']).describe('Priority of the task.'),
  employeeSkills: z.array(z.string()).describe('List of skills required for the task.'),
  taskDeadline: z.string().describe('Deadline for the task completion (YYYY-MM-DD).'),
  availableEmployees: z.array(
    z.object({
      employeeId: z.string().describe('Unique identifier for the employee.'),
      name: z.string().describe('Name of the employee.'),
      skills: z.array(z.string()).describe('List of skills possessed by the employee.'),
      currentTasks: z.number().describe('Number of tasks the employee is currently working on.'),
    })
  ).describe('List of available employees and their skills.'),
});
export type AllocateTaskInput = z.infer<typeof AllocateTaskInputSchema>;

const AllocateTaskOutputSchema = z.object({
  assignedEmployeeId: z.string().describe('The ID of the employee to whom the task is assigned.'),
  reasoning: z.string().describe('Explanation for why the employee was chosen for the task.'),
});
export type AllocateTaskOutput = z.infer<typeof AllocateTaskOutputSchema>;

export async function allocateTask(input: AllocateTaskInput): Promise<AllocateTaskOutput> {
  return allocateTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'allocateTaskPrompt',
  input: {schema: AllocateTaskInputSchema},
  output: {schema: AllocateTaskOutputSchema},
  prompt: `You are an AI task allocation expert. Given a task description, priority, required skills, deadline, and a list of available employees with their skills and current task loads, determine the best employee to assign the task to.

Task Description: {{{taskDescription}}}
Task Priority: {{{taskPriority}}}
Required Skills: {{#each employeeSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Task Deadline: {{{taskDeadline}}}

Available Employees:
{{#each availableEmployees}}
  Employee ID: {{{employeeId}}}, Name: {{{name}}}, Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}, Current Tasks: {{{currentTasks}}}
{{/each}}

Consider the priority of the task, the skills required, the employee's skillset, and their current workload. Assign the task to the employee who is best suited to complete it efficiently and effectively. Explain your reasoning for choosing the selected employee.

Output the employee's ID in the assignedEmployeeId field and your reasoning in the reasoning field.
`, 
});

const allocateTaskFlow = ai.defineFlow(
  {
    name: 'allocateTaskFlow',
    inputSchema: AllocateTaskInputSchema,
    outputSchema: AllocateTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
