"""build_sheet.py — writes beat_sheet.json for "What I Learned About Midjourney Prompts"
(progress update) from the approved SCRIPT.md v1 (approved by Tanishaa 2026-11-20).

Same method as how-gps-works: reveal times are fractions of the beat, taken from
MEASURED word starts (mp3/words.json, faster-whisper on Bella's audio) once the audio
exists; before that, from word position. Nothing on screen runs on its own clock.
No demo: quotes come from Midjourney Prompt Basics and handbook 6.4; B05 quotes the GPS script.

Run:  python3 build_sheet.py      (re-run after regenerating audio)
"""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SHEET = HERE / "beat_sheet.json"
VOICE = "af_bella"
SPEED = 0.95
HANDLE = "@HumanitariansAI"
TITLE = "What I Learned About Midjourney Prompts"
SHORT_TITLE = "Midjourney Prompts"

old = {b["beat_id"]: b for b in json.loads(SHEET.read_text())["beats"]} if SHEET.exists() else {}
timings = json.loads((HERE / "mp3/timings.json").read_text()) if (HERE / "mp3/timings.json").exists() else {}
MEASURED = json.loads((HERE / "mp3/words.json").read_text()) if (HERE / "mp3/words.json").exists() else {}
DEMO = {}
LEAD_S = 0.2


def words(s):
    return re.findall(r"[A-Za-z0-9'’-]+", s)


def norm(s):
    return re.sub(r"[^a-z0-9']", "", s.lower().replace("’", "'"))


def at(bid, cue, nudge_s=0.0):
    """Fraction of beat `bid`'s scene at which `cue` is spoken (minus LEAD_S, plus nudge)."""
    c = [norm(x) for x in words(cue)]
    if bid in MEASURED and bid in timings:
        ws = [(norm(x["w"]), x["s"]) for x in MEASURED[bid]]
        ws = [(w, s) for w, s in ws if w]
        for i in range(len(ws) - len(c) + 1):
            if [w for w, _ in ws[i:i + len(c)]] == c:
                scene = timings[bid] + 0.4
                return round(max(0.0, min(0.95, (ws[i][1] - LEAD_S + nudge_s) / scene)), 4)
        raise SystemExit(f"cue {cue!r} not found in measured words for {bid}: {[w for w, _ in ws]}")
    w = [norm(x) for x in words(N[bid])]
    for i in range(len(w) - len(c) + 1):
        if w[i:i + len(c)] == c:
            return round(max(0.0, min(0.95, i / len(w))), 3)
    raise SystemExit(f"cue {cue!r} not found in: {N[bid]}")


N = {
 "B00": "Hi, I am Tanishaa, and this video is about what I learned this week about writing Midjourney prompts. The voice you're hearing is Bella, an AI narrator reading a script Claude drafted and I approved.",
 "B01": "When I started, I thought the trick was simple: give Midjourney more information, and you get better pictures. That's half right.",
 "B02": "Midjourney's own guide says short, clear prompts usually work best. Long lists and instructions can confuse it. Its example turns a whole request into one line: colored pencil illustration of bright orange California poppies.",
 "B03": "But detail still matters. The guide puts it this way: fewer details mean more variety, but less control. So the real trick is the right details, not more words.",
 "B04": "Which details? Midjourney lists seven: subject, medium, environment, lighting, colour, mood, and composition. When a picture comes back wrong, it's usually because one of these was left for it to guess.",
 "B05": "This is where a script helps. Here's a scene from my GPS video. The script already says what's in the frame: a small phone, a dark Earth, and about thirty satellites far above.",
 "B06": "One word, satellites, leaves almost everything to guess. So I answered the questions from the script. An illustration. A small phone on a dark Earth, with about thirty satellites far above. A soft blue glow. Navy and silver. Calm. A wide shot, with the whole Earth in frame.",
 "B07": "Two more things. Name the colour, not the feeling: charcoal grey, not scary colours. And say what you want, not what you don't. If you ask for a party with no cake, you might still get a cake. Use dash dash no instead.",
 "B08": "Next week, I'll run the one-word prompt and the full prompt with the same seed, so the only difference is the words. Then I'll see how much the details really changed.",
 "B09": "Three things to keep. The right details, not more words. Seven questions, from subject to composition. And a script tells you which details matter.",
 "B10": "Your turn. Pick one scene from a story, answer the seven questions, and turn them into one short prompt.",
 "B11": "What I learned about Midjourney prompts. At Humanitarians AI.",
}

YOUR_TURN = ("Act as my tutor. Give me one scene from a short story. Help me answer Midjourney's seven questions for it, "
             "then turn my answers into one short, clear prompt.")
SEVEN = ["subject", "medium", "environment", "lighting", "colour", "mood", "composition"]


def shots():
    return {
     "B00": ("ClaudeComposerAsk", {
        "greeting": "Hi, Tanishaa", "topic": "Irreducibly Human", "segment": SHORT_TITLE,
        "command": "How do I write a good Midjourney prompt?",
        "runningText": "thinking…",
        "output": ["Describe what you want to see,", "answer the details that matter,", "and keep it short and clear."],
        "folderLabel": HANDLE, "modelLabel": "Claude", "effortLabel": "AI narration: Bella", "largeText": True}),
     "B01": ("PrmThought", {
        "points": [{"text": "give Midjourney more information", "at": at("B01", "give mid")},
                   {"text": "and you get better pictures", "at": at("B01", "and you get")},
                   {"text": "That's half right.", "at": at("B01", "half right"), "accent": True}]}),
     "B02": ("PrmExample", {
        "guideAt": at("B02", "own guide"), "shortLabel": "short, clear prompts usually work best", "shortAt": at("B02", "short clear"),
        "longLabel": "long lists and instructions can confuse it", "longAt": at("B02", "Long lists"),
        "longPrompt": "Show me a picture of lots of blooming California poppies, make them bright, vibrant orange, and draw them in an illustrated style with colored pencils",
        "shortPrompt": "Colored pencil illustration of bright orange California poppies", "exampleAt": at("B02", "Its example"),
        "source": "Midjourney, Prompt Basics (their own example)"}),
     "B03": ("PrmSlider", {
        "fewerAt": at("B03", "fewer details"), "lessAt": at("B03", "less control"), "rightAt": at("B03", "the right details"),
        "fewer": "fewer details mean more variety", "less": "but less control", "right": "the right details, not more words"}),
     "B04": ("PrmSeven", {
        "items": [{"text": w, "at": at("B04", "color" if w == "colour" else w)} for w in SEVEN],
        "guessAt": at("B04", "left for it"), "guess": "one was left for it to guess",
        "source": "Midjourney Prompt Basics · handbook 6.4"}),
     "B05": ("PrmScript", {
        "label": "my GPS video script, scene B02", "labelAt": at("B05", "a scene from my GPS"),
        "lines": ["A small phone on a dark Earth.", "Far above it, about thirty satellite dots trace their orbits."],
        "marks": [{"text": "small phone", "at": at("B05", "a small phone")}, {"text": "dark Earth", "at": at("B05", "a dark Earth")},
                  {"text": "thirty satellite", "at": at("B05", "about 30")}, {"text": "Far above", "at": at("B05", "far above")}]}),
     "B06": ("PrmBuild", {
        "start": "satellites", "startAt": at("B06", "One word"),
        "parts": [{"text": "illustration", "q": "medium", "at": at("B06", "An illustration")},
                  {"text": "of a small phone on a dark Earth", "q": "subject", "at": at("B06", "A small phone")},
                  {"text": "about thirty satellites far above", "q": "subject", "at": at("B06", "with about")},
                  {"text": "soft blue glow", "q": "lighting", "at": at("B06", "A soft blue")},
                  {"text": "navy and silver", "q": "colour", "at": at("B06", "Navy and")},
                  {"text": "calm", "q": "mood", "at": at("B06", "Calm")},
                  {"text": "wide shot, whole Earth in frame", "q": "composition", "at": at("B06", "A wide shot")}],
        "answeredAt": at("B06", "So I answered"), "note": "not run yet: next week's test"}),
     "B07": ("PrmTips", {
        "cards": [{"title": "Name the colour, not the feeling", "titleAt": at("B07", "name the color"),
                   "body": "charcoal grey, not scary colours", "bodyAt": at("B07", "charcoal gray")},
                  {"title": "Say what you want, not what you don't", "titleAt": at("B07", "say what you want"),
                   "body": "a party with no cake might still get a cake", "bodyAt": at("B07", "a party with"),
                   "extra": "use --no instead", "extraAt": at("B07", "Use dash")}]}),
     "B08": ("PrmNext", {
        "headAt": at("B08", "Next week"),
        "steps": [{"text": "the one-word prompt and the full prompt", "at": at("B08", "run the one")},
                  {"text": "with the same seed", "at": at("B08", "with the same seed")},
                  {"text": "the only difference is the words", "at": at("B08", "the only difference")}]}),
     "B09": ("GpsTakeaway", {
        "artifactTitle": SHORT_TITLE, "artifactHeading": "Three things to keep",
        "artifactLines": ["1. The right details, not more words.", "2. Seven questions, from subject to composition.",
                          "3. A script tells you which details matter."],
        "lineAt": [at("B09", "The right details"), at("B09", "Seven questions"), at("B09", "And a script")]}),
     "B10": ("MjYourTurn", {
        "prompt": YOUR_TURN, "askAt": at("B10", "Pick one"),
        "steps": [{"text": "pick one scene from a story", "at": at("B10", "Pick one")},
                  {"text": "answer the seven questions", "at": at("B10", "answer the seven")},
                  {"text": "turn them into one short prompt", "at": at("B10", "turn them")}],
        "runAt": 0.99, "runText": ""}),
     "B11": ("HaiTitleOutro", {"title": "Prompt Writing", "handle": HANDLE}),  # "Prompts" alone underfilled the frame (GATE V)
    }


ACTS = {"B00": "ASK", "B01": "BLUF", "B02": "PROBLEM", "B03": "FRAMEWORK", "B04": "FRAMEWORK", "B05": "WORKED EXAMPLE",
        "B06": "WORKED EXAMPLE", "B07": "SURPRISE", "B08": "NEXT", "B09": "VERDICT", "B10": "YOUR TURN", "B11": "OUTRO"}
EST = {"B00": 12, "B01": 12, "B02": 18, "B03": 14, "B04": 18, "B05": 16, "B06": 24, "B07": 18, "B08": 14,
       "B09": 10, "B10": 14, "B11": 4}

# The toy pictures (sky gradients, hills, sun) read as low-contrast "text blobs" to GATE T §8.3b, so
# these beats declare where their real text is and contrast is measured there (landscape layout).
_REASON = "Demo pictures (demo/compress_demo.py) are image content, not typography; contrast is checked on the text areas."
QC = {}
SHOTS = shots()
beats = []
for bid, text in N.items():
    pattern, props = SHOTS[bid]
    o = old.get(bid, {})
    d = timings.get(bid) or o.get("actual_duration_s") or EST[bid]
    props = {**props, "durationSeconds": round(float(d) + 0.4, 2)}
    b = {"beat_id": bid, "act": ACTS[bid], "narration_text": text, "voice": VOICE, "engine": "kokoro",
         "speed": SPEED, "estimated_duration_s": EST[bid],
         "shot": {"type": "REMOTION", "source": "own", "remotion": {"pattern": pattern, "props": props}}}
    if bid in QC:
        b["qc"] = QC[bid]
    for k in ("audio_file", "actual_duration_s"):
        if k in o:
            b[k] = o[k]
    if bid in timings:
        b["actual_duration_s"] = timings[bid]
    beats.append(b)

sheet = {
 "metadata": {
  "title": TITLE, "slug": "midjourney-prompts", "topic": "Irreducibly Human", "brand": "claude-hai",
  "skill": "ai-explainer", "kind": "progress update", "audience": "students new to the topic", "register": "Plain",
  "engine": "kokoro", "voice_kokoro": VOICE, "palette": "claude", "channel": HANDLE,
  "greeting": "Hi, Tanishaa", "fellow": "Tanishaa",
  "fellow_intro": "Hi, I am Tanishaa and this video is about what I learned this week about writing Midjourney prompts (required fellow opening line, B00).",
  "ai_disclosure": "Narration is Kokoro af_bella, an AI voice, disclosed aloud in B00 and on the composer chip.",
  "decisions": [
   "This week's Lyrical Literacy progress update. Topic from Tanishaa 2026-11-20: learning how Midjourney prompts work (more information, based on a script). Script v1 approved in chat 2026-11-20.",
   "Correction from Midjourney's own Prompt Basics page: short, clear prompts work best and long instructions can confuse it, but the right details give control; the video says 'the right details, not more words'.",
   "No Midjourney images (Tanishaa's choice). The B06 prompt is labelled as not run yet; running it with a fixed seed is next week's experiment.",
   "Sync rules: on-screen phrases are Bella's own words on their measured words; frames faint from the first word; no self-typing (B10 uses MjYourTurn)."],
 },
 "beats": beats,
}
if (HERE / "beat_sheet.json").exists():
    prev = json.loads(SHEET.read_text())["metadata"]
    if "build" in prev:
        sheet["metadata"]["build"] = prev["build"]
SHEET.write_text(json.dumps(sheet, indent=1, ensure_ascii=False) + "\n")
print(f"wrote {SHEET} — {len(beats)} beats, {sum(len(words(t)) for t in N.values())} words")
