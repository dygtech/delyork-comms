/**
 * Booking lifecycle hooks
 *
 * Fires emails after a new booking is successfully created:
 *  - A confirmation email to the client
 *  - An internal notification email to the team
 *
 * NOTE: The entire body is wrapped in try/catch so that email failures
 * NEVER prevent the booking from being saved to the database.
 */

export default {
  async afterCreate(event: any) {
    strapi.log.info('[booking] afterCreate lifecycle triggered');

    try {
      // In Strapi 5 the document service passes data via event.params.data,
      // while event.result might not be populated in all versions.
      // We try both sources for robustness.
      const data = event?.params?.data || event?.result;

      if (!data) {
        strapi.log.warn('[booking] afterCreate: No data available in lifecycle event.');
        return;
      }

      strapi.log.info(`[booking] afterCreate data keys: ${Object.keys(data).join(', ')}`);

      const emailService = strapi.plugin('email').service('email');

      if (!emailService || typeof emailService.send !== 'function') {
        strapi.log.error('[booking] Email service not available or missing send() method.');
        return;
      }

      const serviceLabels: Record<string, string> = {
        web_development: 'Web Development',
        branding: 'Branding',
        marketing: 'Marketing',
        consulting: 'Consulting',
        other: 'Other',
      };

      const serviceLabel = serviceLabels[data.service_type] ?? data.service_type;

      const scheduledDate = data.scheduled_at
        ? new Date(data.scheduled_at).toLocaleString('en-GB', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: data.timezone || 'UTC',
        })
        : 'TBD';

      // ── 1. Confirmation to client ────────────────────────────────────────────
      if (data.email) {
        try {
          await emailService.send({
            to: data.email,
            subject: `Your intro call is booked — ${scheduledDate}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1a1a2e;">Hi ${data.name || 'there'},</h2>
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
                  ${data.budget ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Budget</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.budget}</td>
                  </tr>` : ''}
                  ${data.timeline ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Timeline</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.timeline}</td>
                  </tr>` : ''}
                </table>

                <p>We'll be in touch soon to confirm the details.</p>
                <p style="color: #666; font-size: 13px;">— The Team</p>
              </div>
            `,
          });
          strapi.log.info(`[booking] Confirmation email sent to ${data.email}`);
        } catch (emailErr) {
          strapi.log.warn(`[booking] Failed to send confirmation email to ${data.email}:`, emailErr);
        }
      } else {
        strapi.log.warn('[booking] No client email address available to send confirmation.');
      }

      // ── 2. Internal notification to team ────────────────────────────────────
      const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;
      if (internalEmail) {
        try {
          await emailService.send({
            to: internalEmail,
            subject: `New intro call booking from ${data.name || data.email || 'Unknown'}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>New Booking Received</h2>
                <table style="width:100%; border-collapse:collapse;">
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold; width: 35%;">Name</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Email</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Phone</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Service</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${serviceLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Scheduled</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${scheduledDate}</td>
                  </tr>
                  ${data.goals ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Goals</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.goals}</td>
                  </tr>` : ''}
                  ${data.budget ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Budget</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.budget}</td>
                  </tr>` : ''}
                  ${data.timeline ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Timeline</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.timeline}</td>
                  </tr>` : ''}
                </table>
              </div>
            `,
          });
          strapi.log.info(`[booking] Internal notification sent to ${internalEmail}`);
        } catch (emailErr) {
          strapi.log.warn('[booking] Failed to send internal notification email:', emailErr);
        }
      } else {
        strapi.log.warn('[booking] INTERNAL_NOTIFICATION_EMAIL not configured; skipping internal notification.');
      }

      strapi.log.info('[booking] afterCreate lifecycle completed');
    } catch (error) {
      // Top-level catch: ensure a lifecycle error never prevents the booking from being saved.
      strapi.log.error('[booking] afterCreate lifecycle top-level error:', error);
    }
  },
};
