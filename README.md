# Make me drink

Front-end for online drinking game made with Gatsby, and web sockets.

[Play here](https://makemedrink.netlify.app/)

[Back-end](https://github.com/jportella93/make-me-drink-server)


## Installation
This repo is **client-side Gatsby** and is suitable for **Cloudflare Pages** deployment.

### Multiplayer (with backend)
First checkout the [Back-end](https://github.com/jportella93/make-me-drink-server) locally, install node modules and run `npm run start`.

Back in this project, copy the `.env.example` to a `.env` file, and replace the variable `GATSBY_API_URL` by the URL where the backend is running in your machine.

Then install node modules and run `yarn dev`.

### Demo mode (no backend)
If `GATSBY_API_URL` is not set, the app falls back to a **mocked demo mode** so the UI can be shown without any server.

## Deploy (Cloudflare Pages)
- **Build command**: `yarn build`
- **Build output directory**: `public`
- **Environment**:
  - Set `NODE_VERSION` to `20` (recommended)
  - Optional: set `GATSBY_API_URL` to enable multiplayer
