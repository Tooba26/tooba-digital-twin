# Tooba Mehboob — digital twin portfolio

Visitors interview an AI version of you. They ask questions and get short first-person answers with rich cards for projects, research, skills, experience and contact info.

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Vercel

Push this folder to GitHub, then on vercel.com choose **Add New → Project**, import the repo and press **Deploy**.

## The AI is optional

- **Without a key**, the twin answers from built-in replies in `lib/profile.ts`, matching keywords in the question (up to two topics per question). This costs nothing and never runs out of quota.
- **With a key**, typed questions go to Google Gemini, which writes a reply from your profile data and picks which cards to show. Get a free key at https://aistudio.google.com/app/apikey and add it in Vercel → Project → Settings → Environment Variables as `GEMINI_API_KEY`, then redeploy. If Gemini fails or the quota runs out, it falls back to the built-in replies automatically.
- The suggested questions and quick-topic chips always use the built-in replies, so they're instant and free.

## Make it yours

Everything lives in **`lib/profile.ts`**:

- `profile.avatar`: put a square photo at `public/avatar.jpg` and set it to `"/avatar.jpg"`. Your initials show until you do.
- `profile.links`: add your LinkedIn, GitHub, Google Scholar and CV. Empty links stay hidden.
- `profile.availability`: what you're looking for. Set `open: false` to hide the "open to roles" badge.
- `projects`, `publications` (move `stage` along as papers progress), `experience`, `skills`, `builtInReplies`.

Deep links work: `/?q=What+are+you+researching` opens the site and asks that question.

## Design notes

Built with the UI UX Pro Max design guidance ("AI-native UI": minimal chrome, streaming text, typing indicator, context cards), with a custom identity:

- Porcelain/ink interface with full dark mode. Colour is used in one place: the aurora orb.
- One hue per research area (rose = EdTech, saffron = vision, jade = language, indigo = product).
- Instrument Serif for the twin's voice, Instrument Sans for the interface.
- Checklist: keyboard accessible with visible focus, 44px touch targets, reduced-motion respected, no horizontal scroll from 375px up, screen readers get full replies immediately.

## Credits

The "chat with my portfolio" concept comes from [anujjainbatu/portfolio](https://github.com/anujjainbatu/portfolio) by Anuj Jain (MIT License). This is a from-scratch rebuild with new code, design and content. See `LICENSE`.
