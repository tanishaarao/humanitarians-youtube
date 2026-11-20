"""build_sheet.py — writes beat_sheet.json for "How Compression Shrinks a File" from the
approved SCRIPT.md v1 (approved by Tanishaa 2026-11-20).

Same method as how-gps-works: reveal times are fractions of the beat, taken from
MEASURED word starts (mp3/words.json, faster-whisper on Bella's audio) once the audio
exists; before that, from word position. Nothing on screen runs on its own clock.
Numbers and pictures come from demo/compress_output.json (demo/compress_demo.py).

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
TITLE = "How Compression Shrinks a File"
SHORT_TITLE = "How Compression Works"

old = {b["beat_id"]: b for b in json.loads(SHEET.read_text())["beats"]} if SHEET.exists() else {}
timings = json.loads((HERE / "mp3/timings.json").read_text()) if (HERE / "mp3/timings.json").exists() else {}
MEASURED = json.loads((HERE / "mp3/words.json").read_text()) if (HERE / "mp3/words.json").exists() else {}
DEMO = json.loads((HERE / "demo/compress_output.json").read_text())
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
 "B00": "Hi, I am Tanishaa, and this video is about how compression shrinks a file. The voice you're hearing is Bella, an AI narrator reading a script Claude drafted and I approved.",
 "B01": "A zipped file is smaller, but when you open it, every letter comes back. A photo shrinks even more, because it learns to throw away what you won't notice.",
 "B02": "There are two kinds. Lossless compression, like ZIP and PNG, gives you back every bit. Lossy compression, like JPEG and MP3, drops detail to get much smaller.",
 "B03": "The first lossless trick is spotting repeats. Take one line from Row, Row, Row Your Boat. The compressor writes the first ten letters, then just one note: go back nine, copy twenty-five. That's how ZIP and PNG both work underneath.",
 "B04": "The second trick is like Morse code. The letter E is common, so it gets one dot. Q is rare, so it gets four signals. Common things get short codes, and rare things get long ones.",
 "B05": "Here it is for real. I compressed four verses of the rhyme, and four hundred twenty-four bytes became eighty-seven, about a fifth. Unzipped, it was identical. Then I tried random bytes. They got bigger, because there was nothing to repeat.",
 "B06": "That's not a bug. There are more long files than short ones, so no compressor can shrink every file. It only wins when there's a pattern.",
 "B07": "JPEG works differently. It cuts a photo into eight by eight blocks. In each block it keeps the broad changes and drops fine detail your eyes barely notice. Your eyes notice brightness more than colour, so colour gets squeezed hardest.",
 "B08": "Here's the picture test. The raw pixels took seven hundred eighty-six kilobytes. Lossless PNG got it to five hundred eighteen. JPEG at quality fifty: twelve kilobytes, and it looks the same. At quality ten: six kilobytes, and now you can see the blocks.",
 "B09": "So which should you use? Text and code need lossless, because one wrong bit breaks them. Line drawings and screenshots stay sharp as PNG. Photos and music are fine with lossy. And edit the original, not a JPEG of a JPEG, because every re-save loses a little more.",
 "B10": "Three things to keep. Lossless finds repeats. Lossy drops what you won't notice. And random data can't shrink.",
 "B11": "Your turn. Ask Claude for two sentences, one full of repeats and one with none. Guess which one shrinks more. Then run it and see.",
 "B12": "How compression shrinks a file. At Humanitarians AI.",
}

YOUR_TURN = ("Act as my tutor. Give me two sentences, one full of repeated words and one with none. Have me guess "
             "which compresses better, then show me how to check it with Python's zlib.")
IMG = "compression/"


def shots():
    D = DEMO
    J = D["jpeg"]
    toks = D["lz77_tokens"]
    ref = next(t for t in toks if "back" in t)
    return {
     "B00": ("ClaudeComposerAsk", {
        "greeting": "Hi, Tanishaa", "topic": "Irreducibly Human", "segment": SHORT_TITLE,
        "command": "How does a ZIP file make things smaller without losing anything?",
        "runningText": "thinking…",
        "output": ["It finds repeats and writes them once,", "gives common things short codes,",
                   "and gives back every letter when you unzip."],
        "folderLabel": HANDLE, "modelLabel": "Claude", "effortLabel": "AI narration: Bella", "largeText": True}),
     "B01": ("CmpHook", {
        "shrinkAt": at("B01", "is smaller"),
        "points": [{"text": "every letter comes back", "at": at("B01", "every letter")},
                   {"text": "throw away what you won't notice", "at": at("B01", "throw away"), "accent": True}]}),
     "B02": ("CmpColumns", {
        "left": {"header": "Lossless", "at": at("B02", "Lossless compression"),
                 "items": [{"text": "like ZIP and PNG", "at": at("B02", "like ZIP")},
                           {"text": "gives you back every bit", "at": at("B02", "gives you back")}]},
        "right": {"header": "Lossy", "at": at("B02", "Lossy compression"),
                  "items": [{"text": "like JPEG and MP3", "at": at("B02", "like JPEG")},
                            {"text": "drops detail", "at": at("B02", "drops detail")}]},
        "card": "", "cardAt": 0.99}),
     "B03": ("CmpRepeat", {
        "source": "Row, Row, Row Your Boat", "line": D["lz77_line"], "literals": D["lz77_literal_count"],
        "back": ref["back"], "len": ref["len"],
        "lineAt": at("B03", "Take one line"), "literalsAt": at("B03", "first 10 letters"),
        "noteAt": at("B03", "go back"), "tailAt": at("B03", "That's how"),
        "tail": "That's how ZIP and PNG both work underneath."}),
     "B04": ("CmpMorse", {
        "eAt": at("B04", "The letter E"), "qAt": at("B04", "Q is rare"),
        "ruleAt": at("B04", "Common things"), "introAt": at("B04", "like Morse")}),
     "B05": ("CmpLossless", {
        "rhymeBytes": D["rhyme_bytes"], "rhymeZip": D["rhyme_zlib_bytes"], "randomBytes": D["random_bytes"],
        "randomZip": D["random_zlib_bytes"], "identical": D["rhyme_roundtrip_identical"],
        "rhymeAt": at("B05", "four verses"), "zipAt": at("B05", "became"), "sameAt": at("B05", "Unzipped"),
        "randomAt": at("B05", "random bytes"), "biggerAt": at("B05", "got bigger"),
        "footnote": "Real result: demo/compress_demo.py (Python zlib, the DEFLATE method inside ZIP and PNG)."}),
     "B06": ("CmpCounting", {
        "longAt": at("B06", "more long files"), "ruleAt": at("B06", "no compressor"), "patternAt": at("B06", "only wins"),
        "source": "RFC 1951 (DEFLATE): “no lossless compression algorithm can compress every possible input”"}),
     "B07": ("CmpBlocks", {
        "photo": IMG + "original.png", "blocksAt": at("B07", "8 by 8"), "keepAt": at("B07", "keeps the broad"),
        "dropAt": at("B07", "drops fine"), "colourAt": at("B07", "Your eyes notice brightness")}),
     "B08": ("CmpPhoto", {
        "tiles": [{"img": IMG + "original.png", "label": "raw pixels", "size": f"{round(D['raw_pixel_bytes']/1000)} KB", "at": at("B08", "raw pixels")},
                  {"img": IMG + "original.png", "label": "lossless PNG", "size": f"{round(D['png_bytes']/1000)} KB", "at": at("B08", "Lossless PNG")},
                  {"img": IMG + "jpeg_q50.png", "label": "JPEG quality 50", "size": f"{round(J['50']['bytes']/1000)} KB", "at": at("B08", "JPEG at quality"), "note": "looks the same", "noteAt": at("B08", "looks the same")},
                  {"img": IMG + "jpeg_q10.png", "label": "JPEG quality 10", "size": f"{round(J['10']['bytes']/1000)} KB", "at": at("B08", "quality 10"), "note": "you can see the blocks", "noteAt": at("B08", "see the blocks")}],
        "testAt": at("B08", "picture test"),
        "footnote": "Test picture with added grain, made for this demo (demo/compress_demo.py)."}),
     "B09": ("CmpColumns", {
        "left": {"header": "Lossless", "at": at("B09", "Text and code"),
                 "items": [{"text": "text and code", "at": at("B09", "Text and code")},
                           {"text": "line drawings and screenshots", "at": at("B09", "Line drawings")}]},
        "right": {"header": "Lossy", "at": at("B09", "Photos and music"),
                  "items": [{"text": "photos and music", "at": at("B09", "Photos and music")}]},
        "card": "Edit the original, not a JPEG of a JPEG.", "cardAt": at("B09", "edit the original")}),
     "B10": ("GpsTakeaway", {
        "artifactTitle": SHORT_TITLE, "artifactHeading": "Three things to keep",
        "artifactLines": ["1. Lossless finds repeats.", "2. Lossy drops what you won't notice.", "3. Random data can't shrink."],
        "lineAt": [at("B10", "Lossless"), at("B10", "Lossy drops"), at("B10", "And random")]}),
     "B11": ("MjYourTurn", {
        "prompt": YOUR_TURN, "askAt": at("B11", "Ask Claude"),
        "steps": [{"text": "one full of repeats", "at": at("B11", "one full")},
                  {"text": "one with none", "at": at("B11", "one with none")},
                  {"text": "guess which one shrinks more", "at": at("B11", "Guess which")}],
        "runAt": at("B11", "Then run"), "runText": "Then run it and see."}),
     "B12": ("HaiTitleOutro", {"title": "Compression", "handle": HANDLE}),
    }


ACTS = {"B00": "ASK", "B01": "BLUF", "B02": "FRAMEWORK", "B03": "MECHANISM", "B04": "MECHANISM", "B05": "WORKED EXAMPLE",
        "B06": "SURPRISE", "B07": "MECHANISM", "B08": "WORKED EXAMPLE", "B09": "WHEN NOT TO", "B10": "VERDICT", "B11": "YOUR TURN", "B12": "OUTRO"}
EST = {"B00": 12, "B01": 12, "B02": 14, "B03": 19, "B04": 14, "B05": 20, "B06": 12, "B07": 19, "B08": 22,
       "B09": 20, "B10": 10, "B11": 16, "B12": 4}

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
  "title": TITLE, "slug": "how-compression-works", "topic": "Irreducibly Human", "brand": "claude-hai",
  "skill": "ai-explainer", "audience": "students new to the topic", "register": "Plain",
  "engine": "kokoro", "voice_kokoro": VOICE, "palette": "claude", "channel": HANDLE,
  "greeting": "Hi, Tanishaa", "fellow": "Tanishaa",
  "fellow_intro": "Hi, I am Tanishaa and this video is about how compression shrinks a file (required fellow opening line, B00).",
  "ai_disclosure": "Narration is Kokoro af_bella, an AI voice, disclosed aloud in B00 and on the composer chip.",
  "decisions": [
   "Topic chosen by Tanishaa on 2026-11-20 (compression, from four options). Script v1 approved in chat 2026-11-20 (\"Approved, build it\").",
   "Sync rules from her QR and Midjourney notes: every on-screen phrase is Bella's own words, cued to its measured word; each scene's layout shows faintly from the first word; no self-typing text (B11 uses MjYourTurn).",
   "All numbers are real output of demo/compress_demo.py; the test picture is labelled as made for the demo."],
 },
 "beats": beats,
}
if (HERE / "beat_sheet.json").exists():
    prev = json.loads(SHEET.read_text())["metadata"]
    if "build" in prev:
        sheet["metadata"]["build"] = prev["build"]
SHEET.write_text(json.dumps(sheet, indent=1, ensure_ascii=False) + "\n")
print(f"wrote {SHEET} — {len(beats)} beats, {sum(len(words(t)) for t in N.values())} words")
