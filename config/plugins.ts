// export default () => ({});

// import { Strapi } from '@strapi/strapi';

export default () => ({
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
              // delete data.id;
              delete data.createdAt;
              delete data.updatedAt;
              delete data.publishedAt;

              if (data.padre_imagens && Array.isArray(data.padre_imagens)) {
                data.padre_imagens = data.padre_imagens.map((imagen) => imagen.urlImagen); // Sobrescribe el arreglo solo con los valores
              }

              // Recorrer todas las propiedades para encontrar objetos anidados
              Object.keys(data).forEach((key) => {
                if (Array.isArray(data[key])) {
                  removeTimestamps(data[key]); // Llamada recursiva para arreglos
                } else if (
                  typeof data[key] === "object" &&
                  data[key] !== null
                ) {
                  removeTimestamps(data[key]); // Llamada recursiva para objetos
                }
              });
            }
          };

          // Llamar a la función para eliminar los campos
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
  // ..
});
