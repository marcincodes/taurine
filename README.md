# Taurine - Tauri + Node.js stater - Electron alternative

[Tauri](https://tauri.app/) is a framework for building tiny, blazing fast binaries for all major desktop platforms. With Node.js which you are familiar it's great alternative for [Electron](https://www.electronjs.org/).

Node.js is packed with your server code to single binary using [pkg](https://github.com/vercel/pkg) and then run using Tauri sidecar feature.

> NOTE ⚠️
> This starter **isn't** production ready and probably won't work on every platform. Also Tauri is **not recommending** using localhost protocol that is used here. For security reasons use tauri custom protocol.


![Taurine demo](https://marcin.page/images/taurine-demo.gif)

## Features

- ⚛️ React
- ⚡️ Vite
- 🔒 Typescript
- 🚀 Fastify
- 📦 tRPC

## Running

Clone the project

```bash
  git clone https://link-to-project my-project-name
```

Go to the project directory

```bash
  cd my-project-name
```

Install dependencies

```bash
  pnpm install
```

Start the server for development

```bash
  pnpm tauri dev
```

Building application

```bash
  pnpm tauri build
```

## Comparison with [Electron](https://www.electronjs.org/)

| Bundle       | Taurine  | Electron (electron-quick-start[1]) |
| :----------- | :------- | :--------------------------------- |
| `dmg` (size) | `21.6mb` | --                                 |
| `app` (size) | `63mb`   | `205mb`                            |

[1] Barebone Electron application from [electron-quick-start](https://github.com/electron/electron-quick-start) repo

## Known Issues

- [ ] After change on server window needs to close and re-open again
- [ ] Building supports only platform that is running on
