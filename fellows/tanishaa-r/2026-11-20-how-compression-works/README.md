# How Compression Shrinks a File — Tanishaa

## This week's contribution
- **Question:** how does a ZIP file get smaller and still give back every letter, and how does a JPEG get even smaller?
- **Prediction:** everything should shrink at least a little, and a photo should shrink the most as a JPEG.
- **What I built:** a 2½-minute explainer. The worked examples (`demo/compress_demo.py`) compress real data with Python's zlib (the DEFLATE method inside ZIP and PNG) and save one test picture as PNG and JPEG.
- **Observed result:** the rhyme went from 424 to 87 bytes and came back identical; 424 random bytes grew to 435, so not everything shrinks. The test picture went from 786 KB raw to 518 KB as PNG and 12 KB as JPEG quality 50 (looks the same); quality 10 was 6 KB with visible blocks. On a flat-colour picture PNG beat JPEG, so the test uses a photo-like picture with added grain, labelled as made for the demo.
- **Next experiment:** compress real song lyrics from the Lyrical Literacy project and see how much repetition (choruses) helps.

## Human and AI work
- **My decisions, implementation and verification:** topic choice (compression, from four options), script approval. _[Tanishaa: add what you reviewed or changed.]_
- **AI tools/voices used and what they generated:** Claude (Claude Code) ran the demo, drafted and fact-checked the script, wrote the beat sheets and CmpScenes.tsx, and ran the build. Kokoro `af_bella` (a local AI voice) speaks all narration, which is disclosed in the opening.
- **What I rejected or corrected:** _[Tanishaa: add anything you changed.]_
- **What remains unverified or failed:** the "go back 9, copy 25" note comes from a small LZ77 written for display; zlib's own internal choices may differ. The test picture is synthetic.

## Reproduce
- Brutalist commit `a99b5323fe346786c3e5991b09a5cc784a6b0da2` (2026-10-23), checked 2026-11-20.
- Steps: `python demo/compress_demo.py` (copy original/jpeg_q50/jpeg_q10 PNGs to `runtime/remotion/public/compression/`) → `python3 build_sheet.py` → `generate_audio_kokoro.py . --speed 0.95` → `python word_times.py` → `python3 build_sheet.py` → `remotion_scenes.py` → `python add_bug.py B00` → `./art final`; vertical: `./art vertical`, set B10 → LbTakeaway916 and the B12 title to "How Files Shrink", render, `add_bug.py --dir vertical B00`, `./art final vertical --height 3840`.
- Media (MP4/MP3) is on Drive, not GitHub: [week folder 20-11-2026](https://drive.google.com/drive/folders/1IaBKQwT6dgURJ5Cy3gWZWQw6IkkKx7l6).

## Watch and review
| Version | Drive link | Resolution | Duration | SHA-256 |
|---|---|---|---|---|
| Landscape `HowCompressionWorks_TanishaaR.mp4` | [Drive week folder](https://drive.google.com/drive/folders/1IaBKQwT6dgURJ5Cy3gWZWQw6IkkKx7l6) (`horizontal/`) | 3840×2160 | 2:36.4 | `7b1ac0d29fee234904db51eb947f2967e76da2c710f2f51a31852a8dd9bb3f6b` |
| Vertical `HowCompressionWorks_TanishaaR.mp4` | [Drive week folder](https://drive.google.com/drive/folders/1IaBKQwT6dgURJ5Cy3gWZWQw6IkkKx7l6) (`vertical/`) | 2160×3840 | 2:36.4 | `4d1466fc4943a2a0ac96bc6a18cf806f61d2e7162f9edee6d771cb540904b4a5` |

- Review status: pending
- YouTube 4K check: pending
- Publication decision: pending
