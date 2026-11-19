// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the post on X itself: a GTA 6 meme whose picture shows the
// make.fun ghost, posted from a public account with make.fun / @makefunai
// and a play code in its text. POST.json at the repository root names that
// post's address. This program only copies POST.json to /output, where the
// gate reads it. Nothing this program writes is judged: the house reads the
// post from X and hands its first picture and text to the judge.
//
// Run it locally the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast on a malformed POST.json instead of copying a bad file: the
// gate refuses an entry whose POST.json does not read, so a broken file
// should stop the run here, loudly, rather than pass silently.
const source = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(source, 'utf8'));
if (typeof post !== 'object' || post === null || typeof post.url !== 'string') {
  throw new Error('POST.json must be a JSON object with a string "url" field');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(source, join(OUTPUT_DIR, 'POST.json'));
