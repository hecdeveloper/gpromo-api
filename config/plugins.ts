export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_CLOUD_NAME'),
        api_key: env('CLOUDINARY_API_KEY'),
        api_secret: env('CLOUDINARY_API_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      hooks: {
        postResponseTransform: (ctx) => {
          const removeTimestamps = (data) => {
            if (Array.isArray(data)) {
              data.forEach((item) => removeTimestamps(item));
            } else if (typeof data === "object" && data !== null) {
              // Elimina campos de timestamps
              delete data.createdAt;
              delete data.updatedAt;
              delete data.publishedAt;

              // Procesa campos específicos
              if (data.padre_imagens && Array.isArray(data.padre_imagens)) {
                data.padre_imagens = data.padre_imagens.map((imagen) => imagen.urlImagen);
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
