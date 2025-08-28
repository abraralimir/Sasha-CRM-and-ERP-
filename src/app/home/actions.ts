
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function handleContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten();
    return {
      success: false,
      message: 'Error: Invalid form data.',
      fields: fieldErrors as Record<string, string>,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sasha AI Contact Form <onboarding@resend.dev>',
      to: ['alimirabrar@gmail.com'],
      subject: `New Inquiry from ${validatedFields.data.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Phone:</strong> ${validatedFields.data.phone || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.data.description}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.',
    };
  } catch (e: any) {
    console.error('Submission error:', e);
    return {
      success: false,
      message: `An unexpected error occurred: ${e.message || e.toString()}`,
    };
  }
}
