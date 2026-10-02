import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  // ── DigitalOcean Spaces upload (S3-compatible) ──
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: `https://${env('DO_SPACE_BUCKET')}.${env('DO_SPACE_REGION')}.digitaloceanspaces.com`,
        s3Options: {
          credentials: {
            accessKeyId: env('DO_SPACE_ACCESS_KEY'),
            secretAccessKey: env('DO_SPACE_SECRET_KEY'),
          },
          endpoint: `https://${env('DO_SPACE_REGION')}.digitaloceanspaces.com`,
          region: env('DO_SPACE_REGION'),
          params: {
            Bucket: env('DO_SPACE_BUCKET'),
          },
          forcePathStyle: false,
        },
      },
      actionOptions: {
        upload: { ACL: null },
        uploadStream: { ACL: null },
        delete: {},
      },
    },
  },

  // ── Email (Brevo / Nodemailer) ──
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp-relay.brevo.com'),
        port: env.int('SMTP_PORT', 587),
        secure: false,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_FROM_EMAIL', 'hello@yourdomain.com'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'hello@yourdomain.com'),
      },
    },
  },
});

export default config;

