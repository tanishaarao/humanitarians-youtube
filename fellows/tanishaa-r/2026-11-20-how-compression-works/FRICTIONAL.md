# Frictional log: How Compression Shrinks a File

_Drafted by Claude on 2026-11-20 from this week's chat and the build log. Tanishaa: read it and correct anything that is not what happened._

## 2026-11-20 — Building "How Compression Shrinks a File"
- **Working on:** this week's STEM explainer, on how ZIP and JPEG make files smaller.
- **Tried:** chose compression from four options. Expected a photo to shrink the most as a JPEG, and anything to shrink at least a little.
- **Resisted:** random bytes didn't shrink at all; they grew from 424 to 435 bytes, which is the point of the "no compressor can shrink every file" rule. The first picture test backfired: on a flat-colour picture, lossless PNG was smaller than every JPEG, so the test used a photo-like picture with added grain, and the screen says it was made for the demo. In the build, the "Merrily" line was too faint for the visual check, and the vertical version needed its labels and footnotes moved for a phone screen.
- **Contributions:** Claude ran the demo, drafted and fact-checked the script, wrote the scenes (`scenes/CmpScenes.tsx`) and ran the build, applying my earlier rules (on-screen words match Bella's, nothing appears before she says it). I chose the topic and approved the script. _[Tanishaa: add what you reviewed or changed after watching.]_
- **Understand now:** lossless compression only wins when there's a pattern to point back at; lossy compression wins by dropping detail the eye won't miss. **Still unsure:** _[Tanishaa: what is still unclear to you?]_
