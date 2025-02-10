import type { Schema, Attribute } from '@strapi/strapi';

export interface CatalogoCatalogocard extends Schema.Component {
  collectionName: 'components_catalogo_catalogocards';
  info: {
    displayName: 'catalogocard';
    description: '';
  };
  attributes: {
    titulo: Attribute.String & Attribute.Required;
    imagen: Attribute.Media<'images'>;
    tituloboton: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'VER CAT\u00C1LOGO'>;
    linkboton: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'catalogo.catalogocard': CatalogoCatalogocard;
    }
  }
}
