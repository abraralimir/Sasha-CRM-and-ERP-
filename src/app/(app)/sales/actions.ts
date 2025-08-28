"use server";

import { salesPrediction, SalesPredictionInput, SalesPredictionOutput } from "@/ai/flows/sales-prediction";
import { z } from "zod";

const schema = z.object({
  historicalSalesData: z.string().min(1, "Historical sales data is required."),
  marketTrends: z.string().min(1, "Market trends are required."),
  salesStrategy: z.string().min(1, "Sales strategy is required."),
  forecastHorizon: z.string().min(1, "Forecast horizon is required."),
});

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: SalesPredictionOutput;
}

export async function handleSalesPrediction(
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
        const result = await salesPrediction(validatedFields.data);
        return { message: "Sales prediction generated successfully.", data: result };
    } catch (e) {
        return { message: "An unexpected error occurred while generating the prediction." };
    }
}
