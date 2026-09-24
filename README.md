# vikram.mouan.in

Personal site. Next.js 16 static export — plain HTML with inlined CSS, served from a CDN.

```sh
npm run dev     # local dev
npm run build   # writes static site to out/
npm start       # serve out/ locally
```

- Name, links and timezone live in `lib/content.ts`; the essay is in `app/page.tsx`.
- Wrap a phrase in `<Note term="…">…</Note>` to give it a hover card.
- Use `@/components/link` for internal links: it prefetches on hover/focus/touch so clicks are instant.
- Deploy: push to Vercel (auto-detected), or upload `out/` to Cloudflare Pages / Netlify.
