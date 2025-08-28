"use server";

import { allocateTask, AllocateTaskInput, AllocateTaskOutput } from "@/ai/flows/ai-task-allocation";
import { z } from "zod";

const schema = z.object({
    taskDescription: z.string().min(1, "Task description is required."),
    taskPriority: z.enum(['High', 'Medium', 'Low']),
    employeeSkills: z.string().min(1, "Required skills are required."),
    taskDeadline: z.string().min(1, "Deadline is required."),
});

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: AllocateTaskOutput;
}

export async function handleTaskAllocation(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        const {formErrors} = validatedFields.error;
        return {
            message: "Error: Invalid form data.",
            fields: formErrors.fieldErrors,
        }
    }

    const availableEmployees = [
        { employeeId: 'E001', name: 'Alice', skills: ['JavaScript', 'React', 'Node.js'], currentTasks: 2 },
        { employeeId: 'E002', name: 'Bob', skills: ['Python', 'Data Analysis', 'Machine Learning'], currentTasks: 1 },
        { employeeId: 'E003', name: 'Charlie', skills: ['Java', 'Spring', 'SQL'], currentTasks: 3 },
        { employeeId: 'E004', name: 'Diana', skills: ['Project Management', 'Agile', 'Communication'], currentTasks: 1 },
        { employeeId: 'E005', name: 'Ethan', skills: ['JavaScript', 'Vue', 'Firebase'], currentTasks: 4 },
    ];

    const input: AllocateTaskInput = {
        ...validatedFields.data,
        employeeSkills: validatedFields.data.employeeSkills.split(',').map(s => s.trim()),
        availableEmployees,
    }

    try {
        const result = await allocateTask(input);
        return { message: "Task allocated successfully.", data: result };
    } catch (e) {
        return { message: "An unexpected error occurred." };
    }
}
