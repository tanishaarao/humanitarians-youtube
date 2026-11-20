# What I Learned About Midjourney Prompts — Tanishaa

_This week's Lyrical Literacy progress update (week of 2026-11-20)._

## This week's contribution
- **Question:** how do you write a Midjourney prompt that gives the picture you mean, for the team's song-to-image workflow?
- **Prediction:** the more information you give Midjourney, the better the picture, and prompts work best when they're based on a script.
- **What I built:** a 2¼-minute progress update. It quotes Midjourney's own Prompt Basics guide and the handbook (§6.4), then turns a real scene from my GPS video script into a prompt, one of the seven questions at a time.
- **Observed result:** "more information" was half right. Midjourney says short, clear prompts usually work best and long instructions can confuse it, but fewer details mean less control. What matters is the right details, and a script tells you which ones.
- **Next experiment:** run the one-word prompt ("satellites") and the full prompt with the same seed, so the only difference is the words, and compare the images.

## Human and AI work
- **My decisions, implementation and verification:** the topic (learning prompts; leaving the Suno song out), the "base it on a script" idea, no images this week, script approval. _[Tanishaa: add what you reviewed or changed.]_
- **AI tools/voices used and what they generated:** Claude (Claude Code) read and quoted Midjourney's guide, drafted the script, wrote the beat sheets and PrmScenes.tsx, and ran the build. Kokoro `af_bella` (a local AI voice) speaks all narration, which is disclosed in the opening.
- **What I rejected or corrected:** _[Tanishaa: add anything you changed.]_ The fact-check refined my starting idea ("more information") to "the right details, not more words".
- **What remains unverified or failed:** the prompt built in the video hasn't been run yet (labelled on screen); that's next week's test.

## Reproduce
- Brutalist commit `a99b5323fe346786c3e5991b09a5cc784a6b0da2` (2026-10-23), checked 2026-11-20.
- Steps: `python3 build_sheet.py` → `generate_audio_kokoro.py . --speed 0.95` → `python word_times.py` → `python3 build_sheet.py` → `remotion_scenes.py` → `python add_bug.py B00` → `./art final`; vertical: `./art vertical`, set B09 → LbTakeaway916 and the B11 title to "Prompts", render, `add_bug.py --dir vertical B00`, `./art final vertical --height 3840`.
- Media (MP4/MP3) is on Drive, not GitHub: [week folder 20-11-2026](https://drive.google.com/drive/folders/1IaBKQwT6dgURJ5Cy3gWZWQw6IkkKx7l6).

## Watch and review
| Version | Drive link | Resolution | Duration | SHA-256 |
|---|---|---|---|---|
| Landscape `MidjourneyPrompts_TanishaaR.mp4` | [Drive week folder](https://drive.google.com/drive/folders/1IaBKQwT6dgURJ5Cy3gWZWQw6IkkKx7l6) (`horizontal/`) | 3840×2160 | 2:14.0 | `1e7e1b0ffa123aa20e0c2258df2c8bff6ec9a38a7b0c87e09b8a389cf2bb939c` |
| Vertical `MidjourneyPrompts_TanishaaR.mp4` | [Drive week folder](https://drive.google.com/drive/folders/1IaBKQwT6dgURJ5Cy3gWZWQw6IkkKx7l6) (`vertical/`) | 2160×3840 | 2:14.0 | `f8a1b7cea7be7ad74758979b6fa68d61bf2f9283db949b15a99b6864584f1f36` |

- Review status: pending
- YouTube 4K check: pending
- Publication decision: pending
