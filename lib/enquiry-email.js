// Branded HTML + plain-text email for website enquiries. Table layout and inline styles so it renders in
// Gmail, Outlook and phone mail apps.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const BLUE = '#2f86d6';
const INK = '#1d2230';
const MUTED = '#6b7280';
const LINE = '#e5e7eb';
const FONT = "'Segoe UI',Helvetica,Arial,sans-serif";

export function enquiryEmail({ name, email, phone, organisation, country, region, location, enquiryType, sectors, message, page, siteUrl }) {
  const received = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', dateStyle: 'full', timeStyle: 'short' }).format(new Date());
  const firstName = name.split(' ')[0];
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: Your enquiry to Geoporte')}`;
  const source = page ? siteUrl.replace(/\/$/, '') + page : siteUrl;

  const subject = `New website enquiry from ${name}${enquiryType ? ` · ${enquiryType}` : ''}`;
  const where = [location, region, country].filter(Boolean).join(', ');
  const none = `<span style="color:${MUTED}">Not provided</span>`;
  const opt = (v) => (v ? esc(v) : none);

  const rows = [
    ['Name', esc(name)],
    ['Email', `<a href="mailto:${esc(email)}" style="color:${BLUE};text-decoration:none">${esc(email)}</a>`],
    ['Phone', `<a href="tel:${esc(phone.replace(/[^\d+]/g, ''))}" style="color:${BLUE};text-decoration:none">${esc(phone)}</a>`],
    ['Organisation', opt(organisation)],
    ['Project location', opt(where)],
    ['Enquiry type', opt(enquiryType)],
    ['Sectors', opt(sectors)],
  ]
    .map(
      ([k, v], i) => `
              <tr>
                <td width="140" style="padding:12px 0;${i ? `border-top:1px solid ${LINE};` : ''}font:600 12px/1.4 ${FONT};letter-spacing:.06em;text-transform:uppercase;color:${MUTED};vertical-align:top">${k}</td>
                <td style="padding:12px 0;${i ? `border-top:1px solid ${LINE};` : ''}font:400 15px/1.5 ${FONT};color:${INK}">${v}</td>
              </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(name)}${organisation ? ` (${esc(organisation)})` : ''} sent an enquiry through the website.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6">
    <tr><td align="center" style="padding:32px 16px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid ${LINE}">
        <tr><td style="background:#0a0a0c;padding:26px 32px">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle"><img src="${siteUrl}/images/geoporte-logo.png" width="40" height="40" alt="Geoporte" style="display:block;border-radius:50%;background:#ffffff"></td>
            <td style="vertical-align:middle;padding-left:12px;font:600 20px/1 ${FONT};letter-spacing:.08em;color:#ffffff">GE<span style="color:#5aa3e8">O</span>PORTE</td>
          </tr></table>
        </td></tr>
        <tr><td style="height:3px;background:${BLUE};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td style="padding:32px 32px 8px">
          <div style="font:600 12px/1 ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${BLUE}">New website enquiry</div>
          <h1 style="margin:12px 0 6px;font:600 24px/1.3 ${FONT};color:${INK}">${esc(name)} would like to talk to you</h1>
          <p style="margin:0;font:400 13px/1.5 ${FONT};color:${MUTED}">Received ${esc(received)} (Melbourne time)</p>
        </td></tr>
        <tr><td style="padding:16px 32px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 0">
          <div style="font:600 12px/1.4 ${FONT};letter-spacing:.06em;text-transform:uppercase;color:${MUTED};margin-bottom:10px">Project details</div>
          <div style="background:#f8fafc;border:1px solid ${LINE};border-left:3px solid ${BLUE};border-radius:6px;padding:16px 18px;font:400 15px/1.6 ${FONT};color:${INK}">${esc(message).replace(/\n/g, '<br>')}</div>
        </td></tr>
        <tr><td style="padding:28px 32px 32px">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background:${BLUE};border-radius:6px"><a href="${replyHref}" style="display:inline-block;padding:13px 26px;font:600 14px/1 ${FONT};color:#ffffff;text-decoration:none">Reply to ${esc(firstName)}</a></td>
          </tr></table>
          <p style="margin:14px 0 0;font:400 13px/1.5 ${FONT};color:${MUTED}">Or simply press Reply in your mail app &mdash; it goes straight to ${esc(email)}.</p>
        </td></tr>
        <tr><td style="background:#f8fafc;border-top:1px solid ${LINE};padding:18px 32px;font:400 12px/1.6 ${FONT};color:${MUTED}">
          Sent from the contact form on <a href="${esc(source)}" style="color:${MUTED}">${esc(source.replace(/^https?:\/\//, ''))}</a>.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    'NEW WEBSITE ENQUIRY',
    `Received ${received} (Melbourne time)`,
    '',
    `Name:          ${name}`,
    `Email:         ${email}`,
    `Phone:         ${phone}`,
    `Organisation:  ${organisation || 'Not provided'}`,
    `Location:      ${where || 'Not provided'}`,
    `Enquiry type:  ${enquiryType || 'Not provided'}`,
    `Sectors:       ${sectors || 'Not provided'}`,
    '',
    'Project details:',
    message,
    '',
    `Reply to this email to answer ${firstName} directly.`,
    `Sent from the contact form on ${source}`,
  ].join('\n');

  return { subject, html, text };
}
