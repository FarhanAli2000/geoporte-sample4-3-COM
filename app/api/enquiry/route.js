import { enquiryEmail } from '@/lib/enquiry-email';

export const runtime = 'nodejs';

// Website enquiry form -> email to the admin inbox via Microsoft Graph (Microsoft 365 mailbox).
// Needs the Entra app registration "Geoporte Contact Form" (application permission Mail.Send, admin-consented):
// MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, plus MAIL_FROM (the mailbox that sends). ENQUIRY_TO defaults to MAIL_FROM.

// App-only access token for Graph (client credentials flow).
async function graphToken({ MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET }) {
  const res = await fetch(`https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: MS_CLIENT_ID,
      client_secret: MS_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) throw new Error(`token request failed: ${data.error || res.status} ${data.error_description || ''}`);
  return data.access_token;
}

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

  const env = process.env;
  if (!env.MS_TENANT_ID || !env.MS_CLIENT_ID || !env.MS_CLIENT_SECRET || !env.MAIL_FROM) {
    console.error('Enquiry form: MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET / MAIL_FROM are not set');
    return fail(500, 'Email is not configured');
  }
  const to = (env.ENQUIRY_TO || env.MAIL_FROM).split(',').map((a) => a.trim()).filter(Boolean);

  // Logo and links need a public URL; local testing falls back to the live site.
  const origin = new URL(req.url).origin;
  const siteUrl = /localhost|127\.0\.0\.1/.test(origin) ? 'https://geoporte-sample4-3.vercel.app' : origin;
  const { subject, html } = enquiryEmail({ name, email, phone, organisation, country, region, location, enquiryType, sectors, message, page, siteUrl });

  try {
    const token = await graphToken(env);
    const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.MAIL_FROM)}/sendMail`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: 'HTML', content: html },
          toRecipients: to.map((address) => ({ emailAddress: { address } })),
          replyTo: [{ emailAddress: { name, address: email } }],
        },
        saveToSentItems: false,
      }),
    });
    if (!res.ok) throw new Error(`sendMail ${res.status}: ${(await res.text()).slice(0, 500)}`);
  } catch (err) {
    console.error('Enquiry form: sending failed', err);
    return fail(502, 'Could not send');
  }
  return Response.json({ ok: true });
}
