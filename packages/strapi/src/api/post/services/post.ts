/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', {
    async likeOrFavor(ctx, type) {
      const { id } = ctx.params;
      const { user } = ctx.state;
      const { id: userId } = user;
  
      const relation = type === "like" ? "liked_by" : "favored_by";
  
      const post = await strapi.entityService.findOne("api::post.post", id, {
        populate: [relation],
      });
  
      const relations = post[relation];
  
      const index = relations.findIndex((r) => r.id === userId);
      let already = false;
      if (index !== -1) {
        relations.splice(index, 1);
      } else {
        already = true;
        relations.push(userId);
      }
  
      await strapi.entityService.update("api::post.post", id, {
        data: { [relation]: relations },
      });
      ctx.body = {
        data: already,
      };
    },
  });
