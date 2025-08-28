// Sales Prediction flow
'use server';
/**
 * @fileOverview Generates sales forecasts using machine learning to anticipate market trends and optimize sales strategies.
 *
 * - salesPrediction - A function that handles the sales prediction process.
 * - SalesPredictionInput - The input type for the salesPrediction function.
 * - SalesPredictionOutput - The return type for the salesPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalesPredictionInputSchema = z.object({
  historicalSalesData: z
    .string()
    .describe(
      'Historical sales data in a format that can be interpreted, such as CSV or JSON.'
    ),
  marketTrends: z
    .string()
    .describe(
      'Description of current market trends and conditions relevant to sales.'
    ),
  salesStrategy: z
    .string()
    .describe('Details of the current sales strategy being employed.'),
  forecastHorizon: z
    .string()
    .describe(
      'The time period for which the sales forecast is required (e.g., next quarter, next year).' // Clarified description
    ),
});
export type SalesPredictionInput = z.infer<typeof SalesPredictionInputSchema>;

const SalesPredictionOutputSchema = z.object({
  salesForecast: z
    .string()
    .describe(
      'A detailed sales forecast including expected sales figures, key influencing factors, and confidence intervals.'
    ),
  marketAnalysis: z
    .string()
    .describe(
      'An analysis of the market trends and conditions that are expected to impact sales.'
    ),
  strategyRecommendations: z
    .string()
    .describe(
      'Recommendations for optimizing the sales strategy based on the forecast and market analysis.'
    ),
});
export type SalesPredictionOutput = z.infer<typeof SalesPredictionOutputSchema>;

export async function salesPrediction(input: SalesPredictionInput): Promise<SalesPredictionOutput> {
  return salesPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salesPredictionPrompt',
  input: {schema: SalesPredictionInputSchema},
  output: {schema: SalesPredictionOutputSchema},
  prompt: `You are an AI sales forecasting expert. Analyze the provided data and generate a sales forecast.

Historical Sales Data: {{{historicalSalesData}}}
Market Trends: {{{marketTrends}}}
Sales Strategy: {{{salesStrategy}}}
Forecast Horizon: {{{forecastHorizon}}}

Based on this information, provide a sales forecast, market analysis, and strategy recommendations.

Ensure that the salesForecast includes expected sales figures and confidence intervals.
The marketAnalysis should highlight the key market trends and conditions.
The strategyRecommendations should offer actionable steps to optimize the sales strategy.
`,
});

const salesPredictionFlow = ai.defineFlow(
  {
    name: 'salesPredictionFlow',
    inputSchema: SalesPredictionInputSchema,
    outputSchema: SalesPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
