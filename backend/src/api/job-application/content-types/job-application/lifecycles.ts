/**
 * Job Application lifecycle hooks
 *
 * Fires emails after a new job application is successfully created:
 *  - An acknowledgement email to the applicant
 *  - An internal notification email to the hiring team
 *
 * NOTE: The entire body is wrapped in try/catch so that email failures
 * NEVER prevent the job application from being saved to the database.
 */

export default {
  async afterCreate(event: { result: any }) {
    try {
      const { result } = event;

      const emailService = strapi.plugin('email').service('email');

      // Fetch the related job listing title if available
      let jobTitle = 'a position at our company';
      if (result.job_listing) {
        try {
          const listing = await strapi.entityService.findOne(
            'api::job-listing.job-listing',
            result.job_listing,
            { fields: ['title'] }
          );
          if (listing?.title) {
            jobTitle = listing.title;
          }
        } catch {
          // silently fall back to the generic text
        }
      }

      // ── 1. Acknowledgement to applicant ───────────────────────────────────────
      try {
        await emailService.send({
          to: result.email,
          subject: `We received your application — ${jobTitle}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a2e;">Hi ${result.full_name},</h2>
              <p>
                Thank you for applying for <strong>${jobTitle}</strong>. 
                We've received your application and our team will review it shortly.
              </p>
              <p>We'll be in touch if your profile matches what we're looking for.</p>
              <p>In the meantime, feel free to check out our latest work at our website.</p>
              <p style="color: #666; font-size: 13px;">— The Hiring Team</p>
            </div>
          `,
        });
      } catch (emailErr) {
        strapi.log.warn(`[job-application] Failed to send acknowledgement email to ${result.email}:`, emailErr);
      }

      // ── 2. Internal notification to hiring team ──────────────────────────────────
      const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;
      if (internalEmail) {
        try {
          await emailService.send({
            to: internalEmail,
            subject: `New job application from ${result.full_name} — ${jobTitle}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>New Job Application</h2>
                <table style="width:100%; border-collapse:collapse;">
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold; width: 35%;">Name</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${result.full_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Email</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${result.email}</td>
                  </tr>
                  ${result.phone ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Phone</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${result.phone}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Position</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${jobTitle}</td>
                  </tr>
                  ${result.portfolio_url ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Portfolio</td>
                    <td style="padding: 8px; border: 1px solid #eee;"><a href="${result.portfolio_url}">${result.portfolio_url}</a></td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Cover Letter</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${result.cover_letter}</td>
                  </tr>
                </table>
              </div>
            `,
          });
        } catch (emailErr) {
          strapi.log.warn('[job-application] Failed to send internal notification email:', emailErr);
        }
      }
    } catch (error) {
      // Top-level catch: ensure a lifecycle error never prevents the job application from being saved.
      // The application itself is already in the database at this point (afterCreate runs post-save),
      // but an unhandled rejection here can bubble up and cause Strapi to roll back the transaction.
      strapi.log.error('[job-application] afterCreate lifecycle error:', error);
    }
  },
};