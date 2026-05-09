// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi } /*: { strapi: Core.Strapi } */) {
    const publicRoles = await strapi.entityService.findMany(
      'plugin::users-permissions.role',
      {
        filters: { type: 'public' },
        limit: 1,
      }
    );

    if (!publicRoles || publicRoles.length === 0) {
      return;
    }

    const publicRole = publicRoles[0];
    const contentTypes = [
      'api::categoria.categoria',
      'api::autor.autor',
      'api::articulo.articulo',
      'api::evento.evento',
      'api::documento.documento',
    ];
    const actions = ['find', 'findOne'];

    const actionNames = contentTypes.flatMap((contentType) =>
      actions.map((action) => `${contentType}.${action}`)
    );

    const existingPermissions = await strapi.entityService.findMany(
      'plugin::users-permissions.permission',
      {
        filters: {
          role: publicRole.id,
          action: { $in: actionNames },
        },
        limit: 100,
      }
    );

    const existingActions = new Set(
      existingPermissions.map((permission: any) => permission.action)
    );

    for (const actionName of actionNames) {
      if (!existingActions.has(actionName)) {
        await strapi.entityService.create('plugin::users-permissions.permission', {
          data: {
            action: actionName,
            role: publicRole.id,
          },
        });
      }
    }
  },
};
