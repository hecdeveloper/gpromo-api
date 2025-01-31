import type { Strapi } from '@strapi/strapi';

export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_CLOUD_NAME'),
        api_key: env('CLOUDINARY_API_KEY'),
        api_secret: env('CLOUDINARY_API_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: 'gpromo-uploads',
          transformation: [
            { width: 245, height: 245, crop: 'fill', gravity: 'auto' }, // Miniatura
            { width: 500, height: 500, crop: 'fill', gravity: 'auto' }, // Pequeño
            { width: 750, height: 750, crop: 'fill', gravity: 'auto' }, // Mediano
            { width: 1000, height: 1000, crop: 'fill', gravity: 'auto' }, // Grande
          ],
          resource_type: 'auto',
        },
        delete: {},
      },
    },
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
              // Elimina campos de timestamps
              delete data.createdAt;
              delete data.updatedAt;
              delete data.publishedAt;

              // Procesa campos específicos
              if (data.padre_imagens && Array.isArray(data.padre_imagens)) {
                data.padre_imagens = data.padre_imagens.map((imagen: any) => imagen.urlImagen);
              }

              // Procesa imágenes y formatos
              if (data.formats) {
                // Asegura que los formatos de imagen estén correctos
                Object.keys(data.formats).forEach((format) => {
                  if (data.formats[format] && !data.formats[format].url) {
                    delete data.formats[format];
                  }
                });
              }

              // Recorre todas las propiedades para procesar objetos anidados
              Object.keys(data).forEach((key) => {
                if (Array.isArray(data[key])) {
                  removeTimestamps(data[key]);
                } else if (typeof data[key] === "object" && data[key] !== null) {
                  removeTimestamps(data[key]);
                }
              });
            }
          };

          // Aplica la función de transformación
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