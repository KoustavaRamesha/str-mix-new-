import { Resend } from 'resend';

// Initialize Resend API client
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(contactData: ContactData): Promise<boolean> {
  if (!resend) {
    console.error('Resend not configured');
    return false;
  }

  const { name, email, phone, subject, message } = contactData;

  try {
    console.log('Sending email via Resend API...');
    console.log('To: contactformstrmix@gmail.com');

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contactformstrmix@gmail.com',
      subject: `STR MIX Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Inquiry - STR MIX</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            This message was sent from the STR MIX website contact form.
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully via Resend API');
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}
