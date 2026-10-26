# Birthday website

Next.js + Tailwind + Framer Motion. No backend, database, or analytics.

## How the lock works
Before the birthday, visitors only see the countdown. The server checks the date on every request (`app/page.tsx`), so changing a device clock does not unlock it, and the letters, photos and messages are not sent to the browser until the date. At midnight Asia/Kolkata the page refreshes itself into the full site.
Note: files in `public/` (photos, music) can be opened by anyone who guesses the exact file address, even before the date.

## Run locally
`npm install && npm run dev`

## Deploy to Vercel
Unzip, open a terminal in the folder, then run `npx vercel --prod`. Or push to GitHub and import the repo in Vercel.
Afterwards, in Vercel: Project, Settings, Deployment Protection, set Vercel Authentication to Disabled so no login is needed.

## Customize (all in `data/content.ts`)
- Date/timezone: `config.birthdayISO`
- Photos: files are in `public/photos/`. Edit the `photos` array (caption, date, location). To add more, drop a JPG in the folder and add an entry.
- Letters: `letters` (use `|` between paragraphs). Reasons: add strings to `reasons`. Surprises and final letter: `surprises`.
- Music: put your song at `public/music/song.mp3` (use a song you have permission to use). Update `config.music.title`. Without the file, the player shows a friendly note.
- Preview the unlocked site early: temporarily set `birthdayISO` to a past date.
