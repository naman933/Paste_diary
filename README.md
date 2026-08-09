# The Book of Yash

An interactive birthday-gift web app: a top-down desk scene with a leather-bound diary that opens into a 3-page book — Childhood Memories, The Roast Page, and Messages (coming soon) — plus a few clickable desk easter eggs.

## Stack

- React + TypeScript + Vite
- `@react-three/fiber` / `three` for the desk's dust-mote particle layer
- Framer Motion for modals
- CSS 3D transforms for the cover flip and page-turn animation

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/` — deployable as-is to Vercel, Netlify, or any static host.

## Controls

- **Space** or click the diary — open it
- **←/→** or the on-screen arrows — turn pages
- **Esc** — close a modal, or close the diary
