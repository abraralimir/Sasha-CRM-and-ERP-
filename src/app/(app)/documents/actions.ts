"use server";

import { analyzeDocument, AnalyzeDocumentInput, AnalyzeDocumentOutput } from "@/ai/flows/ai-document-analysis";
import { z } from "zod";

const schema = z.object({
  documentDataUri: z.string().min(1, "File is required."),
  analysisInstructions: z.string().min(1, "Analysis instructions are required."),
});

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: AnalyzeDocumentOutput;
}

export async function handleDocumentAnalysis(
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
        const result = await analyzeDocument(validatedFields.data);
        return { message: "Document analyzed successfully.", data: result };
    } catch (e: any) {
        return { message: `An unexpected error occurred: ${e.message || e.toString()}` };
    }
}
