# Frictional log: What I Learned About Midjourney Prompts

_Drafted by Claude on 2026-11-20 from this week's chat. Tanishaa: read it and correct anything that is not what happened._

## 2026-11-20 — Progress update: learning how Midjourney prompts work
- **Working on:** the Midjourney part of the team's workflow: how to write prompts that give the picture you mean.
- **Tried:** I started from the idea that the more information you give Midjourney, the better the picture, and that prompts should be based on a script.
- **Resisted:** Midjourney's own Prompt Basics page says short, clear prompts usually work best and that long lists and instructions can confuse it, while fewer details mean more variety but less control. So "more information" was only half right; what matters is the right details. I also first thought of making the video about a Suno song broken into scenes, then decided the song wasn't the point and kept the video on prompts. I chose not to show Midjourney images yet, so the prompt built in the video is labelled as not run.
- **Contributions:** Claude found and quoted Midjourney's guide, drafted the script, wrote the scenes (`scenes/PrmScenes.tsx`) and ran the build. I chose the topic, the "base it on a script" idea, and approved the script.
- **Understand now:** a script answers most of Midjourney's seven questions (subject, medium, environment, lighting, colour, mood, composition) before you write the prompt. **Still unsure:** _[Tanishaa: what is still unclear to you?]_ **Next:** run the one-word and full prompts with the same seed and compare.
