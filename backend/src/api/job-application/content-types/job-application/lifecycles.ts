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
  async afterCreate(event: any) {
    strapi.log.info('[job-application] afterCreate lifecycle triggered');

    try {
      // In Strapi 5 the document service passes data via event.params.data,
      // while event.result might not be populated in all versions.
      const data = event?.params?.data || event?.result;

      if (!data) {
        strapi.log.warn('[job-application] afterCreate: No data available in lifecycle event.');
        return;
      }

      strapi.log.info(`[job-application] afterCreate data keys: ${Object.keys(data).join(', ')}`);

      const emailService = strapi.plugin('email').service('email');

      if (!emailService || typeof emailService.send !== 'function') {
        strapi.log.error('[job-application] Email service not available or missing send() method.');
        return;
      }

      // Fetch the related job listing title if available
      let jobTitle = 'a position at our company';
      if (data.job_listing) {
        try {
          const listingId = typeof data.job_listing === 'object' ? data.job_listing.id || data.job_listing.documentId : data.job_listing;
          const listing = await strapi.documents('api::job-listing.job-listing').findOne({
            documentId: listingId,
            fields: ['title'],
          });
          if (listing?.title) {
            jobTitle = listing.title;
          }
        } catch {
          // silently fall back to the generic text
        }
      }

      // ── 1. Acknowledgement to applicant ───────────────────────────────────────
      if (data.email) {
        try {
          await emailService.send({
            to: data.email,
            subject: `We received your application — ${jobTitle}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1a1a2e;">Hi ${data.full_name || data.name || 'there'},</h2>
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
          strapi.log.info(`[job-application] Acknowledgement email sent to ${data.email}`);
        } catch (emailErr) {
          strapi.log.warn(`[job-application] Failed to send acknowledgement email to ${data.email}:`, emailErr);
        }
      } else {
        strapi.log.warn('[job-application] No applicant email address available to send acknowledgement.');
      }

      // ── 2. Internal notification to hiring team ──────────────────────────────────
      const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;
      if (internalEmail) {
        try {
          await emailService.send({
            to: internalEmail,
            subject: `New job application from ${data.full_name || data.name || data.email || 'Unknown'} — ${jobTitle}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>New Job Application</h2>
                <table style="width:100%; border-collapse:collapse;">
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold; width: 35%;">Name</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.full_name || data.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Email</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.email || 'N/A'}</td>
                  </tr>
                  ${data.phone ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Phone</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.phone}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Position</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${jobTitle}</td>
                  </tr>
                  ${data.portfolio_url ? `<tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Portfolio</td>
                    <td style="padding: 8px; border: 1px solid #eee;"><a href="${data.portfolio_url}">${data.portfolio_url}</a></td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Cover Letter</td>
                    <td style="padding: 8px; border: 1px solid #eee;">${data.cover_letter || 'N/A'}</td>
                  </tr>
                </table>
              </div>
            `,
          });
          strapi.log.info(`[job-application] Internal notification sent to ${internalEmail}`);
        } catch (emailErr) {
          strapi.log.warn('[job-application] Failed to send internal notification email:', emailErr);
        }
      } else {
        strapi.log.warn('[job-application] INTERNAL_NOTIFICATION_EMAIL not configured; skipping internal notification.');
      }

      strapi.log.info('[job-application] afterCreate lifecycle completed');
    } catch (error) {
      strapi.log.error('[job-application] afterCreate lifecycle top-level error:', error);
    }
  },
};
