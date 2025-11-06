import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Email configuration
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// SMS configuration - only initialize if credentials are provided
let twilioClient: any = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC') &&
    process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(contactData: ContactData): Promise<boolean> {
  try {
    const { name, email, phone, subject, message } = contactData;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@strmix.com',
      to: process.env.EMAIL_TO || 'contact@strmix.com',
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
    };

    await emailTransporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send contact email:', error);
    return false;
  }
}

export async function sendContactSMS(contactData: ContactData): Promise<boolean> {
  try {
    const { name, phone, subject } = contactData;

    if (!phone) {
      console.log('ℹ️ No phone number provided, skipping SMS');
      return true; // Not an error, just no phone provided
    }

    if (!twilioClient) {
      console.log('ℹ️ Twilio not configured, skipping SMS');
      return true; // Not an error, just not configured
    }

    const message = `STR MIX: New inquiry from ${name} about "${subject}". Please check your email for details.`;

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.ADMIN_PHONE_NUMBER || phone, // Send to admin or customer
    });

    console.log('✅ Contact SMS sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send contact SMS:', error);
    return false;
  }
}

export async function sendContactNotification(contactData: ContactData): Promise<{emailSent: boolean, smsSent: boolean}> {
  const [emailSent, smsSent] = await Promise.all([
    sendContactEmail(contactData),
    sendContactSMS(contactData)
  ]);

  return { emailSent, smsSent };
}
