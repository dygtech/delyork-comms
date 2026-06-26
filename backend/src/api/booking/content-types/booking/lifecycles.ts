/**
 * Booking lifecycle hooks
 *
 * Fires emails after a new booking is successfully created:
 *  - A confirmation email to the client
 *  - An internal notification email to the team
 */

export default {
  async afterCreate(event: { result: any }) {
    const { result } = event;

    const emailService = strapi.plugin('email').service('email');

    const serviceLabels: Record<string, string> = {
      web_development: 'Web Development',
      branding: 'Branding',
      marketing: 'Marketing',
      consulting: 'Consulting',
      other: 'Other',
    };

    const serviceLabel = serviceLabels[result.service_type] ?? result.service_type;

    const scheduledDate = result.scheduled_at
      ? new Date(result.scheduled_at).toLocaleString('en-GB', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: result.timezone || 'UTC',
        })
      : 'TBD';

    // ── 1. Confirmation to client ────────────────────────────────────────────
    await emailService.send({
      to: result.email,
      subject: `Your intro call is booked — ${scheduledDate}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">Hi ${result.name},</h2>
          <p>Thanks for reaching out! We've received your booking and will confirm shortly.</p>

          <table style="width:100%; border-collapse:collapse; margin: 24px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #eee; font-weight: bold; width: 35%;">Service</td>
              <td style="padding: 8px; border: 1px solid #eee;">${serviceLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Scheduled</td>
              <td style="padding: 8px; border: 1px solid #eee;">${scheduledDate}</td>
            </tr>
            ${result.budget ? `<tr>
              <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Budget</td>
              <td style="padding: 8px; border: 1px solid #eee;">${result.budget}</td>
            </tr>` : ''}
            ${result.timeline ? `<tr>
              <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Timeline</td>
              <td style="padding: 8px; border: 1px solid #eee;">${result.timeline}</td>
            </tr>` : ''}
          </table>

          <p>We'll be in touch soon to confirm the details.</p>
          <p style="color: #666; font-size: 13px;">— The Team</p>
        </div>
      `,
    });

    // ── 2. Internal notification to team ────────────────────────────────────
    const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;
    if (internalEmail) {
      await emailService.send({
        to: internalEmail,
        subject: `New intro call booking from ${result.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Booking Received</h2>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold; width: 35%;">Name</td>
                <td style="padding: 8px; border: 1px solid #eee;">${result.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Email</td>
                <td style="padding: 8px; border: 1px solid #eee;">${result.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Phone</td>
                <td style="padding: 8px; border: 1px solid #eee;">${result.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Service</td>
                <td style="padding: 8px; border: 1px solid #eee;">${serviceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Scheduled</td>
                <td style="padding: 8px; border: 1px solid #eee;">${scheduledDate}</td>
              </tr>
              ${result.goals ? `<tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Goals</td>
                <td style="padding: 8px; border: 1px solid #eee;">${result.goals}</td>
              </tr>` : ''}
              ${result.budget ? `<tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Budget</td>
                <td style="padding: 8px; border: 1px solid #eee;">${result.budget}</td>
              </tr>` : ''}
              ${result.timeline ? `<tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Timeline</td>
                <td style="padding: 8px; border: 1px solid #eee;">${result.timeline}</td>
              </tr>` : ''}
            </table>
          </div>
        `,
      });
    }
  },
};
