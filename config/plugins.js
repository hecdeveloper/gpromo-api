module.exports = ({ env }) => {
  // Validate Cloudinary credentials
  const cloudName = env('CLOUDINARY_CLOUD_NAME');
  const apiKey = env('CLOUDINARY_API_KEY');
  const apiSecret = env('CLOUDINARY_API_SECRET');

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary configuration:', {
      cloudName: !!cloudName,
      apiKey: !!apiKey,
      apiSecret: !!apiSecret
    });
  }

  return {
    'transformer': {
      enabled: true,
      config: {
        prefix: '/api/',
        responseTransforms: {
          removeAttributesKey: true,
          removeDataKey: true,
        }
      }
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        },
        actionOptions: {
          upload: {
            folder: 'giopromo',
            resource_type: 'auto',
          },
          delete: {},
        },
        debug: true, // Enable debug mode
      },
    },
  };
};
