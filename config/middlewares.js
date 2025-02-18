module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            '*.cloudinary.com',
            'res.cloudinary.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            '*.cloudinary.com',
            'res.cloudinary.com'
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['*']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // Form body size limit
      jsonLimit: '256mb', // JSON body size limit
      textLimit: '256mb', // Text body size limit
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data max size in bytes (200MB)
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
