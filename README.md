# Ghost Chat Desktop

E2E encrypted messaging app using PGP over Nostr relays. Built with Tauri v2 + React + TypeScript.

## Prerequisites

- [Rust](https://rustup.rs/) (stable toolchain)
- [Tauri CLI v2](https://v2.tauri.app/start/prerequisites/)
- Node.js 18+

## Setup

```bash
# Install dependencies
npm install

# Development (Tauri + Vite HMR)
npm run tauri dev

# Build for production
npm run tauri build

# Frontend only (no Tauri)
npm run dev
npm run build
```

## Architecture

- **Frontend**: React + Tailwind CSS (same components as walls.rip Ghost Chat)
- **Backend**: Tauri v2 Rust (system tray, notifications, key storage)
- **Encryption**: OpenPGP.js (ECC Curve25519)
- **Transport**: Nostr relays (decentralized, censorship-resistant)

## Key Features

- PGP key generation and import
- End-to-end encrypted messaging
- Decentralized via Nostr relay network
- System tray with minimize-to-tray
- Native desktop notifications
- No server trust, no accounts, no logs
