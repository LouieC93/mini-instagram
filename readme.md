This monorepo project is managed by `pnpm`, so you must install `pnpm` first.

### Start Locally
- In the root folder, run `pnpm i`.
- Then run `pnpm dev` and the backend app Strapi will run at `1337` port, frontend app Vue will run at `5173` port.
- The Strapi admin account and password are abc@abc.com | 1234Qwer.


### More about pnpm
- If you want to add some packages at certain sub-package like vue-app, use `--filter` command, e.g. `pnpm add -F xxx`.