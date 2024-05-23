/**
 * comment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
    async create(ctx) {
      const { user } = ctx.state;
      const { id } = user;
      ctx.request.body.data.user = id;
      return super.create(ctx);
    },
  }));

