module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.url.startsWith('/api/upload')) {
      console.log('🚀 Upload request details:', {
        method: ctx.request.method,
        url: ctx.request.url,
        headers: {
          'content-type': ctx.request.headers['content-type'],
          'content-length': ctx.request.headers['content-length'],
        }
      });

      try {
        // Log Cloudinary config
        const uploadConfig = strapi.config.get('plugin.upload');
        console.log('📝 Cloudinary Configuration:', {
          provider: uploadConfig.config.provider,
          cloudName: uploadConfig.config.providerOptions.cloud_name,
          hasApiKey: !!uploadConfig.config.providerOptions.api_key,
          hasApiSecret: !!uploadConfig.config.providerOptions.api_secret,
        });

        await next();

        console.log('✅ Upload response:', {
          status: ctx.response.status,
          body: ctx.response.body,
        });
      } catch (error) {
        console.error('❌ Upload error:', {
          name: error.name,
          message: error.message,
          details: error.details,
          stack: error.stack,
        });
        throw error;
      }
    } else {
      await next();
    }
  };
};
