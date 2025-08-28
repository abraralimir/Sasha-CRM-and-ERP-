
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
        { employeeId: 'E001', name: 'Alice', skills: ['JavaScript', 'React', 'Node.js', 'UI/UX Design'], currentTasks: 2 },
        { employeeId: 'E002', name: 'Bob', skills: ['Python', 'Data Analysis', 'Machine Learning', 'AWS'], currentTasks: 1 },
        { employeeId: 'E003', name: 'Charlie', skills: ['Java', 'Spring', 'SQL', 'Database Admin'], currentTasks: 3 },
        { employeeId: 'E004', name: 'Diana', skills: ['Project Management', 'Agile', 'Communication', 'Scrum'], currentTasks: 1 },
        { employeeId: 'E005', name: 'Ethan', skills: ['JavaScript', 'Vue', 'Firebase', 'Node.js'], currentTasks: 4 },
        { employeeId: 'E006', name: 'Fiona', skills: ['Cybersecurity', 'Network Security', 'Penetration Testing'], currentTasks: 2 },
        { employeeId: 'E007', name: 'George', skills: ['Docker', 'Kubernetes', 'CI/CD', 'DevOps'], currentTasks: 3 },
        { employeeId: 'E008', name: 'Hannah', skills: ['UI/UX Design', 'Figma', 'Adobe XD'], currentTasks: 2 },
        { employeeId: 'E009', name: 'Ian', skills: ['React', 'TypeScript', 'GraphQL'], currentTasks: 1 },
        { employeeId: 'E010', name: 'Jane', skills: ['Python', 'Django', 'PostgreSQL'], currentTasks: 3 },
        { employeeId: 'E011', name: 'Kevin', skills: ['AWS', 'Terraform', 'Ansible'], currentTasks: 2 },
        { employeeId: 'E012', name: 'Laura', skills: ['Java', 'Kotlin', 'Android'], currentTasks: 4 },
        { employeeId: 'E013', name: 'Mike', skills: ['JavaScript', 'Angular', 'TypeScript'], currentTasks: 1 },
        { employeeId: 'E014', name: 'Nora', skills: ['Project Management', 'Kanban', 'Jira'], currentTasks: 2 },
        { employeeId: 'E015', name: 'Oscar', skills: ['Database Admin', 'MongoDB', 'MySQL'], currentTasks: 3 },
        { employeeId: 'E016', name: 'Penny', skills: ['Cybersecurity', 'SIEM', 'Threat Intelligence'], currentTasks: 1 },
        { employeeId: 'E017', name: 'Quinn', skills: ['DevOps', 'Jenkins', 'Git'], currentTasks: 4 },
        { employeeId: 'E018', name: 'Rachel', skills: ['UI/UX Design', 'User Research', 'Prototyping'], currentTasks: 2 },
        { employeeId: 'E019', name: 'Steve', skills: ['React', 'Redux', 'Next.js'], currentTasks: 3 },
        { employeeId: 'E020', name: 'Tina', skills: ['Python', 'Flask', 'REST APIs'], currentTasks: 1 },
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
