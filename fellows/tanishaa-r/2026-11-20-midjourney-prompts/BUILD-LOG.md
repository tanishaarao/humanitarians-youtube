# BUILD-LOG — What I Learned About Midjourney Prompts

**2026-11-20**
- This week's Lyrical Literacy progress update. Tanishaa first described a Suno song broken into scenes and Midjourney prompts with ChatGPT, then narrowed it: "a video about learning how prompts work with Midjourney … the more information you give it and base it on a script". She chose no Midjourney images.
- Fact-check before drafting (Midjourney Prompt Basics, read in the browser): short, clear prompts usually work best; long lists and instructions can confuse it; fewer details mean more variety but less control; the seven areas; the "no cake" example and --no. The video says "the right details, not more words". Handbook §6.4 for the seven questions and "name the colours, not the feeling".
- Script v1 approved in chat ("Approved, build it"). B05 quotes the GPS script (B02); the B06 prompt is written for the video and labelled "not run yet: next week's test".
- Audio: Kokoro `af_bella`, speed 0.95, 12 beats, ~153 s, $0.00. Whisper splits "Midjourney" into "mid journey", spells "color"/"gray" and writes "30", so cues use those forms.
- New scenes `runtime/remotion/src/PrmScenes.tsx` (PrmThought, PrmExample, PrmSlider, PrmSeven, PrmScript, PrmBuild, PrmTips, PrmNext + 916s), folder "MidjourneyPrompts"; one colour per question for the chips and the prompt parts. Reused ClaudeComposerAsk, GpsTakeaway, LbTakeaway916, MjYourTurn, HaiTitleOutro ("Prompts.").
- Show-vs-say table before rendering: every item lands on or just before its spoken words; none early.
- Landscape GATE T first run: B05's quoted scene was one 17-word block (> 12) → split into its two sentences; B04's outlined chips read as overlapping labels → coloured dot + word. GATE V: the outro "Prompts." underfilled the frame → landscape "Prompt Writing."; the portrait keeps "Prompts." (it fills the narrow frame). 0/0 after.
- Vertical: B09 → LbTakeaway916. The gates passed, but the portrait sync frames showed B02's source line on top of the short prompt card and B06's "not run yet" note on the question tags (both were pinned to the bottom); the notes now follow the content, the long prompt is shortened with an ellipsis, and the layouts were tightened to stay inside the portrait safe area. 0/0 after.
- Finals: landscape and vertical GATE T PASS, GATE V 0/0, 12/12 slots, 134.0 s. Sync checks: `_qc/sync1.png`, `sync2.png`, `vertical/_qc/vsync1.png`, `vsync2.png`.
- SHA-256: landscape `1e7e1b0ffa123aa20e0c2258df2c8bff6ec9a38a7b0c87e09b8a389cf2bb939c`, vertical `f8a1b7cea7be7ad74758979b6fa68d61bf2f9283db949b15a99b6864584f1f36`.
