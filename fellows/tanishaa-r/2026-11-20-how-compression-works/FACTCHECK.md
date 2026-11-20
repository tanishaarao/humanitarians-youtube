# Fact check — How Compression Shrinks a File (script v1)

| Beat | Claim | Status | Source |
|---|---|---|---|
| B01 | A zipped file gives back every letter | ✅ measured | demo: round trip identical |
| B02 | ZIP, PNG lossless; JPEG, MP3 lossy | ✅ | PNG spec; Wikipedia ZIP, JPEG; MP3 is lossy (perceptual audio coding) |
| B03 | First 10 letters, then one note: go back 9, copy 25 | ✅ measured (display LZ77) | demo `lz77_tokens`; zlib's own internal choices may differ |
| B03 | ZIP and PNG both work this way underneath | ✅ | RFC 1951 (LZ77); PNG spec; ZIP uses DEFLATE most commonly |
| B04 | Common symbols get short codes (like Morse: E one dot, Q four signals) | ✅ (analogy) | RFC 1951 Huffman coding; Morse code |
| B05 | 424 bytes → 87 (about a fifth), identical; random 424 → 435 | ✅ measured | demo/compress_output.json |
| B06 | No compressor can shrink every file | ✅ | RFC 1951 counting argument |
| B07 | JPEG uses 8×8 blocks, keeps broad changes, drops fine detail; colour squeezed hardest | ✅ (simplified, no DCT maths) | Wikipedia JPEG |
| B08 | Raw 786 KB, PNG 518 KB, JPEG q50 12 KB (looks the same), q10 6 KB (blocks visible) | ✅ measured | demo; test picture labelled as made for the demo |
| B09 | Text/code need lossless; line drawings stay sharp as PNG; re-saving JPEG loses more | ✅ | Wikipedia JPEG |

**Caveats shown or said:** the test picture is a made-for-demo landscape with added grain (real photos have grain; a flat-colour picture would make PNG look better than JPEG). The B03 note comes from a small LZ77 written for display.
