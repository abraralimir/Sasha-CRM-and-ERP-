"use server";

import { generateReply, GenerateReplyInput, GenerateReplyOutput } from "@/ai/flows/ai-messaging";
import { z } from "zod";

const schema = z.object({
    customerInquiry: z.string().min(1, "Customer inquiry is required."),
    tone: z.string().optional(),
    additionalContext: z.string().optional(),
});

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: GenerateReplyOutput;
}

export async function handleGenerateReply(
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
    
    try {
        const result = await generateReply(validatedFields.data);
        return { message: "Reply generated successfully.", data: result };
    } catch (e) {
        return { message: "An unexpected error occurred while generating the reply." };
    }
}
