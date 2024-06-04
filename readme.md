# Mini Instagram

This monorepo project is managed by `pnpm`, so you must install `pnpm` first.

### Getting Started Locally

- In the root folder, run `pnpm i`.
- Then run `pnpm dev` and the backend app Strapi will run at `1337` port, frontend app Vue will run at `5173` port.
- The Strapi admin account and password are abc@abc.com | Qwer1234.

### Highlight

- **Grid Layout**: Instead of using flex layout, this project only utilizes grid layout.
- **Smooth Scrolling**: The homepage features a smooth scrolling experience with `scroll-snap`.

### Skills

- TypeScript
- Composition API
- Pinia
- Monorepo

### More about pnpm

- If you want to add some packages at certain sub-package like vue-app, use `--filter` command, e.g. `pnpm add -F xxx`.
- If you want to run the front-end app only, use `pnpm -F mini-instagram-vue dev`.
