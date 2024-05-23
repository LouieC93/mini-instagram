module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts/me",
      handler: "post.me",
    },
    {
      method: "PUT",
      path: "/posts/:id/like",
      handler: "post.like",
    },
    {
      method: "PUT",
      path: "/posts/:id/save",
      handler: "post.save",
    },
  ],
};
