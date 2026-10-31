import nodemailer from 'nodemailer';
import { enquiryEmail } from '@/lib/enquiry-email';

export const runtime = 'nodejs';

// Website enquiry form -> email to the admin inbox via Gmail SMTP.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD (a Google app password); ENQUIRY_TO defaults to GMAIL_USER.

const clean = (v, max) => String(v ?? '').trim().slice(0, max);
const fail = (status, error) => Response.json({ ok: false, error }, { status });

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return fail(400, 'Invalid request');
  }
  // Bots fill the hidden "website" field; pretend success and send nothing.
  if (clean(data.website, 200)) return Response.json({ ok: true });

  const name = clean(data.name, 120).replace(/[\r\n]+/g, ' ');
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 30);
  const organisation = clean(data.organisation, 200);
  const country = clean(data.country, 80);
  const region = clean(data.region, 80);
  const location = clean(data.location, 120);
  const enquiryType = clean(data.enquiryType, 60);
  const sectors = (Array.isArray(data.sectors) ? data.sectors : []).map((s) => clean(s, 40)).filter(Boolean).slice(0, 10).join(', ');
  const message = clean(data.message, 5000);
  const page = clean(data.page, 200).replace(/[^\w\-/]/g, '');
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+?[\d\s()+-]{6,30}$/.test(phone) || !message || data.consent !== true)
    return fail(400, 'Missing or invalid fields');

  const { GMAIL_USER, GMAIL_APP_PASSWORD, ENQUIRY_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Enquiry form: GMAIL_USER / GMAIL_APP_PASSWORD are not set');
    return fail(500, 'Email is not configured');
  }

  // Logo and links need a public URL; local testing falls back to the live site.
  const origin = new URL(req.url).origin;
  const siteUrl = /localhost|127\.0\.0\.1/.test(origin) ? 'https://geoporte-sample4-3.vercel.app' : origin;
  const { subject, html, text } = enquiryEmail({ name, email, phone, organisation, country, region, location, enquiryType, sectors, message, page, siteUrl });

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } });
    await transporter.sendMail({
      from: { name: 'Geoporte website', address: GMAIL_USER },
      to: ENQUIRY_TO || GMAIL_USER,
      replyTo: { name, address: email },
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('Enquiry form: sending failed', err);
    return fail(502, 'Could not send');
  }
  return Response.json({ ok: true });
}
