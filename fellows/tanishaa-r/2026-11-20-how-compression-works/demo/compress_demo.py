"""compress_demo.py — real measurements for "How Compression Shrinks a File".

1. Lossless (zlib / DEFLATE, the method inside ZIP and PNG):
   - a repetitive nursery rhyme (public domain), vs the same number of random bytes.
   - decompress and check it is byte-for-byte identical.
   - show the back-references DEFLATE's LZ77 step finds in one short line (our own tiny LZ77, for display).
2. Lossy (JPEG via Pillow) on one picture at quality 95, 50, 10: file size and how far pixels moved.
Writes compress_output.json and PNGs for the video.
"""
import json, os, zlib
import numpy as np
from PIL import Image

out = {}
RHYME = ("Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\n"
         "Life is but a dream.\n") * 4
raw = RHYME.encode()
z = zlib.compress(raw, 9)
out["rhyme_bytes"] = len(raw)
out["rhyme_zlib_bytes"] = len(z)
out["rhyme_pct_of_original"] = round(100 * len(z) / len(raw), 1)
out["rhyme_roundtrip_identical"] = zlib.decompress(z) == raw

rnd = np.random.default_rng(7).integers(0, 256, len(raw), dtype=np.uint8).tobytes()
zr = zlib.compress(rnd, 9)
out["random_bytes"] = len(rnd)
out["random_zlib_bytes"] = len(zr)
out["random_pct_of_original"] = round(100 * len(zr) / len(rnd), 1)


def lz77(s, window=255, min_len=3):
    """Tiny greedy LZ77 for display: literal chars and (back, length) references."""
    i, toks = 0, []
    while i < len(s):
        best = (0, 0)
        for j in range(max(0, i - window), i):
            k = 0
            while i + k < len(s) and s[j + k] == s[i + k] and k < 258:
                k += 1
            if k > best[1]:
                best = (i - j, k)
        if best[1] >= min_len:
            toks.append({"back": best[0], "len": best[1], "text": s[i:i + best[1]]})
            i += best[1]
        else:
            toks.append({"lit": s[i]})
            i += 1
    return toks


line = "Merrily, merrily, merrily, merrily,"
toks = lz77(line)
out["lz77_line"] = line
out["lz77_tokens"] = toks
out["lz77_literal_count"] = sum(1 for t in toks if "lit" in t)
out["lz77_ref_count"] = sum(1 for t in toks if "back" in t)

base = np.asarray(Image.open("sunset.png").convert("RGB").resize((512, 512), Image.BICUBIC), dtype=float)
# photo-like test picture: real photos carry fine sensor grain, which PNG can't squeeze but JPEG can drop
grain = np.random.default_rng(11).normal(0, 6, base.shape)
img = Image.fromarray(np.clip(base + grain, 0, 255).astype(np.uint8))
img.save("original.png")
a0 = np.asarray(img, dtype=float)
out["png_bytes"] = os.path.getsize("original.png")
out["raw_pixel_bytes"] = 512 * 512 * 3
out["jpeg"] = {}
for q in (95, 50, 10):
    fn = f"jpeg_q{q}.jpg"
    img.save(fn, quality=q)
    a = np.asarray(Image.open(fn).convert("RGB"), dtype=float)
    out["jpeg"][str(q)] = {"bytes": os.path.getsize(fn),
                           "pct_of_raw": round(100 * os.path.getsize(fn) / (512 * 512 * 3), 2),
                           "mean_abs_pixel_change": round(float(np.abs(a - a0).mean()), 2)}
    Image.open(fn).convert("RGB").save(f"jpeg_q{q}.png")
json.dump(out, open("compress_output.json", "w"), indent=2)
print(json.dumps({k: v for k, v in out.items() if k != "lz77_tokens"}, indent=2))
print([t.get("lit") or f"<{t['back']},{t['len']}>" for t in toks])
