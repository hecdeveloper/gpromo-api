export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_CLOUD_NAME'),
        api_key: env('CLOUDINARY_API_KEY'),
        api_secret: env('CLOUDINARY_API_SECRET'),
        secure: true
      },
      actionOptions: {
        upload: {
          folder: 'gpromo-uploads',
          use_filename: true,
          unique_filename: true,
          resource_type: 'auto',
          eager: [
            {
              width: 245,
              height: 245,
              crop: 'fill',
              gravity: 'auto',
              quality: 'auto:good',
              format: 'auto',
              fetch_format: 'auto'
            },
            {
              width: 500,
              crop: 'scale',
              quality: 'auto:good',
              format: 'auto',
              fetch_format: 'auto'
            }
          ],
          eager_async: false,
          secure: true,
          type: 'upload',
          access_mode: 'public',
          overwrite: true,
          invalidate: true,
          quality_analysis: true
        },
        delete: {
          invalidate: true
        }
      }
    }
  },
  transformer: {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      hooks: {
        postResponseTransform: (ctx: any) => {
          const removeTimestamps = (data: any) => {
            if (Array.isArray(data)) {
              data.forEach((item) => removeTimestamps(item));
            } else if (typeof data === "object" && data !== null) {
              delete data.createdAt;
              delete data.updatedAt;
              delete data.publishedAt;

              if (data.padre_imagens && Array.isArray(data.padre_imagens)) {
                data.padre_imagens = data.padre_imagens.map((imagen: any) => imagen.urlImagen);
              }

              if (data.formats) {
                Object.keys(data.formats).forEach((format) => {
                  if (data.formats[format] && !data.formats[format].url) {
                    delete data.formats[format];
                  }
                });
              }

              Object.keys(data).forEach((key) => {
                if (Array.isArray(data[key])) {
                  removeTimestamps(data[key]);
                } else if (typeof data[key] === "object" && data[key] !== null) {
                  removeTimestamps(data[key]);
                }
              });
            }
          };

          if (ctx.body.data) {
            removeTimestamps(ctx.body.data);
          }
        },
      },
      plugins: {
        ids: {
          slugify: true,
        },
      },
    },
  },
});