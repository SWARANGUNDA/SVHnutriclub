/**
 * Mock Email utility to simulate sending transactional emails using Resend.
 */
export async function sendEmail({ to, subject, text, html }: { to: string, subject: string, text?: string, html?: string }) {
  console.log(`\n[EMAIL] 🚀 Sending email to ${to}`);
  console.log(`[EMAIL] Subject: ${subject}`);
  
  if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("mock")) {
    // In production, integrate Resend SDK here
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: 'onboarding@resend.dev', to, subject, html });
    console.log(`[EMAIL] Error: Real Resend integration not yet fully configured.`);
  } else {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`[EMAIL] ✅ Email simulation successful (Mock Mode)\n`);
  }
}
