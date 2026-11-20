# How Compression Shrinks a File (script draft for approval, v1)

**Fellow:** Tanishaa · **Channel:** @HumanitariansAI · **Narrator:** Bella (Kokoro `af_bella`, an AI voice; disclosed on screen and aloud)
**Target length:** ~2½ minutes (about 420 spoken words) · **Exports:** 16:9 at 3840×2160, plus a native 9:16 at 2160×3840
**Audience:** students new to the topic.
**Hook:** a ZIP file gives back every single letter, yet it's a fraction of the size. A JPEG is even smaller, because it quietly throws things away.
**Sync rules (from your notes on the QR and Midjourney videos):** every on-screen phrase uses Bella's own words and appears as she says it; each scene shows its layout faintly from her first word, so the screen is never empty; no self-typing text.

Each beat lists what's **on screen** first, then what Bella **says**. **Bold** on-screen words are the exact words she says when they appear.

---

### B00 · Cold open: the ask (~12 s)
**On screen:** The Claude app, greeting "Hi, Tanishaa". The composer shows *"How does a ZIP file make things smaller without losing anything?"* The first lines of the answer appear. A label reads "AI narration: Bella".
**Says:** "Hi, I am Tanishaa, and this video is about how compression shrinks a file. The voice you're hearing is Bella, an AI narrator reading a script Claude drafted and I approved."

### B01 · The hook (~12 s)
**On screen:** A file icon shrinking. Two key points on their words: **every letter comes back** · **throw away what you won't notice**.
**Says:** "A zipped file is smaller, but when you open it, every letter comes back. A photo shrinks even more, because it learns to throw away what you won't notice."

### B02 · Two kinds (~14 s)
**On screen:** Two columns appear on their words. **Lossless:** ZIP · PNG — *get back every bit*. **Lossy:** JPEG · MP3 — *drop detail*.
**Says:** "There are two kinds. Lossless compression, like ZIP and PNG, gives you back every bit. Lossy compression, like JPEG and MP3, drops detail to get much smaller."

### B03 · Trick one: point back at repeats (~19 s)
**On screen:** The line *"Merrily, merrily, merrily, merrily,"* from "Row, Row, Row Your Boat". The first ten characters stay as letters; the rest collapses into one note: **go back 9, copy 25**. (Real output of `demo/compress_demo.py`.)
**Says:** "The first lossless trick is spotting repeats. Take one line from Row, Row, Row Your Boat. The compressor writes the first ten letters, then just one note: go back nine, copy twenty-five. That's how ZIP and PNG both work underneath."

### B04 · Trick two: short codes for common things (~14 s)
**On screen:** Morse code: **E** = `·` and **Q** = `– – · –`. Then: **common → short code · rare → long code**.
**Says:** "The second trick is like Morse code. The letter E is common, so it gets one dot. Q is rare, so it gets four signals. Common things get short codes, and rare things get long ones."

### B05 · Worked example: lossless, run for real (~20 s)
**On screen:** Real output: **the rhyme: 424 bytes → 87 bytes** · **unzipped: identical**. Then **random bytes: 424 → 435** · **bigger!**
**Says:** "Here it is for real. I compressed four verses of the rhyme, and four hundred twenty-four bytes became eighty-seven, about a fifth. Unzipped, it was identical. Then I tried random bytes. They got bigger, because there was nothing to repeat."

### B06 · Why random can't shrink (~12 s)
**On screen:** **no compressor can shrink every file** — from the DEFLATE standard. Many inputs → fewer short outputs (a simple counting picture).
**Says:** "That's not a bug. There are more long files than short ones, so no compressor can shrink every file. It only wins when there's a pattern."

### B07 · Lossy: throw away what you won't notice (~19 s)
**On screen:** A picture divided into **8 × 8 blocks**. Inside one block: **keep the broad changes** · **drop fine detail**. Note: **your eyes notice brightness more than colour**.
**Says:** "JPEG works differently. It cuts a photo into eight by eight blocks. In each block it keeps the broad changes and drops fine detail your eyes barely notice. Your eyes notice brightness more than colour, so colour gets squeezed hardest."

### B08 · Worked example: lossy, run for real (~22 s)
**On screen:** Real output on a photo-like test picture, labelled **test picture with added grain, made for this demo**: **raw pixels 786 KB** · **PNG 518 KB** · **JPEG quality 50: 12 KB** (looks the same) · **quality 10: 6 KB** (blocks appear).
**Says:** "Here's the picture test. The raw pixels took seven hundred eighty-six kilobytes. Lossless PNG got it to five hundred eighteen. JPEG at quality fifty: twelve kilobytes, and it looks the same. At quality ten: six kilobytes, and now you can see the blocks."

### B09 · When to use which (~20 s)
**On screen:** Two columns sort as each item is spoken. **Lossless:** text and code · line drawings and screenshots. **Lossy:** photos · music. Card: **Edit the original, not a JPEG of a JPEG.**
**Says:** "So which should you use? Text and code need lossless, because one wrong bit breaks them. Line drawings and screenshots stay sharp as PNG. Photos and music are fine with lossy. And edit the original, not a JPEG of a JPEG, because every re-save loses a little more."

### B10 · Verdict (~10 s)
**On screen:** A Claude-style card titled "How Compression Works", three lines, each on its words:
1. Lossless finds repeats.
2. Lossy drops what you won't notice.
3. Random data can't shrink.
**Says:** "Three things to keep. Lossless finds repeats. Lossy drops what you won't notice. And random data can't shrink."

### B11 · Your turn (~16 s)
**On screen:** "Your turn." with the prompt shown whole in a "paste into Claude" card (no self-typing), and three steps appearing as Bella names them: **1. a sentence with repeats · 2. a sentence with none · 3. guess which shrinks**, then **Run it and see.**
> *"Act as my tutor. Give me two sentences, one full of repeated words and one with none. Have me guess which compresses better, then show me how to check it with Python's zlib."*

**Says:** "Your turn. Ask Claude for two sentences, one full of repeats and one with none. Guess which one shrinks more. Then run it and see."

### B12 · Outro (~4 s)
**On screen:** "Compression." in serif with a terracotta period, @HumanitariansAI below. (Short so it fits one line.)
**Says:** "How compression shrinks a file. At Humanitarians AI."

---

## Fact-check notes
- **Real (`demo/compress_demo.py` → `demo/compress_output.json`, Python zlib level 9 and Pillow):** "Row, Row, Row Your Boat" ×4 = 424 bytes → 87 bytes (20.5%), round trip identical. 424 random bytes → 435 (102.6%). LZ77 on "Merrily, merrily, merrily, merrily,": 10 literals, then one reference ⟨back 9, length 25⟩ (our own small LZ77, written for display; zlib's internal choices may differ). Test picture (512×512, toy landscape plus grain, labelled as made for the demo): raw 786,432 bytes; PNG 518,477; JPEG q95 101,355; q50 11,834 (mean pixel change 5.1); q10 5,599, with visible 8×8 blocks.
- **RFC 1951 (DEFLATE):** LZ77 plus Huffman coding; pointers are ⟨length, backward distance⟩; "no lossless compression algorithm can compress every possible input data set".
- **W3C PNG spec:** lossless; deflate is "a member of the LZ77 family". **Wikipedia, ZIP:** DEFLATE is the most common ZIP method. **Wikipedia, JPEG:** lossy; 8×8 blocks; DCT plus quantization drops high-frequency detail; eyes see more brightness detail than colour (chroma subsampling); "not well suited for line drawings and other textual or iconic graphics"; "some image quality is lost each time the image is recompressed".
- **Morse:** E = one dot, Q = dash dash dot dash (international Morse code).
- **Rhyme:** "Row, Row, Row Your Boat" is a traditional nursery rhyme (19th century), public domain.
- **Simplifications:** B04 uses Morse as the picture for Huffman coding (variable-length codes for common symbols); B07 skips the DCT maths.
