import type { Schema, Struct } from '@strapi/strapi';

export interface SocialSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_social_social_links';
  info: {
    description: 'Social network link for authors';
    displayName: 'Social Link';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'social.social-link': SocialSocialLink;
    }
  }
}
