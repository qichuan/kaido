# KaiDo

A Microsoft To Do App for your KaiOS device.

## CLI Commands

- `npm install`: Installs dependencies

- `npm run start`: Runs `serve` or `dev`, depending on `NODE_ENV` value. Defaults to `dev server`

- `npm run dev`: Run a development, HMR server

- `npm run serve`: Run a production-like server

- `npm run build`: Production-ready build

- `npm run lint`: Pass TypeScript files using TSLint

- `npm run test`: Run Jest and [`preact-render-spy`](https://github.com/mzgoddard/preact-render-spy) for your tests

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## Patch to Preact 10.0.0

The problem was when using `ThemeProvider` from `theme-ui`, it gives `ref` error exactly described in [preact/PR#2099](https://github.com/preactjs/preact/pull/2099). But it has not yet been merged to master by today (1/30), so a [temporary solution](https://github.com/preactjs/preact/pull/2099#issuecomment-557778963) is to use [patch-package](https://github.com/ds300/patch-package):

[preact+10.2.1.patch](/kaido-app/patches/preact+10.2.1.patch)
