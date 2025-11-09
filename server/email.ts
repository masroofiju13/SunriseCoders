import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email};
}

async function getUncachableResendClient() {
  const credentials = await getCredentials();
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export async function sendBookingConfirmationEmail(bookingData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  helpDescription: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    const escapedName = escapeHtml(bookingData.name);
    const escapedDate = escapeHtml(bookingData.date);
    const escapedTime = escapeHtml(bookingData.time);
    const escapedPhone = escapeHtml(bookingData.phone);
    const escapedHelpDescription = escapeHtml(bookingData.helpDescription);
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: #fbbf24; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .booking-details { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation - SunriseAI</h1>
            </div>
            <div class="content">
              <h2>Hello ${escapedName},</h2>
              <p>Thank you for scheduling a consultation with SunriseAI! We're excited to connect with you.</p>
              
              <div class="booking-details">
                <h3>Your Consultation Details</h3>
                <div class="detail-row">
                  <span class="label">Date:</span> <span class="value">${escapedDate}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Time:</span> <span class="value">${escapedTime}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Duration:</span> <span class="value">30 minutes</span>
                </div>
                <div class="detail-row">
                  <span class="label">Meeting Platform:</span> <span class="value">Google Meet</span>
                </div>
                <div class="detail-row">
                  <span class="label">Your Phone:</span> <span class="value">${escapedPhone}</span>
                </div>
              </div>

              <div class="booking-details">
                <h3>What You Need Help With</h3>
                <p>${escapedHelpDescription}</p>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>You will receive a Google Meet link before your scheduled consultation</li>
                <li>Please be ready 5 minutes before the scheduled time</li>
                <li>If you need to reschedule, please contact us at team@sunrisecoders.com</li>
              </ul>

              <p>We look forward to speaking with you!</p>
              <p>Best regards,<br>The SunriseAI Team</p>
            </div>
            <div class="footer">
              <p>SunriseAI - Transform your ideas into reality</p>
              <p>Questions? Contact us at team@sunrisecoders.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await client.emails.send({
      from: fromEmail,
      to: [bookingData.email],
      subject: `Consultation Confirmed - ${bookingData.date} at ${bookingData.time}`,
      html: emailHtml,
    });

    console.log('Booking confirmation email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
}
