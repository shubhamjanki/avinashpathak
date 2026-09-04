# Avinash Pathak — Legal Chambers Website

Official website for Advocate Avinash Pathak — counsel before the Supreme Court of India and Allahabad High Court, based in Jhansi, Bundelkhand.

## Tech Stack

- **Framework**: TanStack Start (React + SSR)
- **Styling**: Tailwind CSS v4
- **Email**: Resend
- **Build**: Vite

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

## Environment Variables

Create a `.env` file in the root:

```
RESEND_API_KEY=your_resend_api_key
RESEND_VERIFIED_DOMAIN=yourdomain.com   # optional, falls back to onboarding@resend.dev
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
