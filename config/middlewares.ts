export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'connect-src': [
            "'self'",
            'https:'
          ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://res.cloudinary.com',
            'https://*.cloudinary.com',
            `https://${process.env.CLOUDINARY_CLOUD_NAME}.cloudinary.com`
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://res.cloudinary.com',
            'https://*.cloudinary.com',
            `https://${process.env.CLOUDINARY_CLOUD_NAME}.cloudinary.com`
          ],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'"
          ],
          upgradeInsecureRequests: null,
        },
      },
      xssFilter: true,
      frameguard: {
        action: 'deny'
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true
      }
    }
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
] as const;