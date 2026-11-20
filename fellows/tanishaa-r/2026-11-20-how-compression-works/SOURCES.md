# Sources — How Compression Shrinks a File

Checked 2026-11-20 (read in the browser).

1. RFC 1951, "DEFLATE Compressed Data Format Specification version 1.3": https://www.rfc-editor.org/rfc/rfc1951.txt (LZ77 plus Huffman coding; duplicated strings become a pair ⟨length, backward distance⟩; "A simple counting argument shows that no lossless compression algorithm can compress every possible input data set"; worst-case expansion 5 bytes per 32K block).
2. W3C, PNG Specification (Third Edition): https://www.w3.org/TR/png-3/ ("lossless"; deflate is "a member of the LZ77 family of compression methods").
3. Wikipedia, "ZIP (file format)": https://en.wikipedia.org/wiki/ZIP_(file_format) ("DEFLATE is the most common").
4. Wikipedia, "JPEG": https://en.wikipedia.org/wiki/JPEG (lossy; 8×8 blocks; DCT and quantization drop high-frequency detail; eyes see more detail in brightness than in colour; "not well suited for line drawings and other textual or iconic graphics"; "some image quality is lost each time the image is recompressed").
5. International Morse code: E = one dot, Q = dash dash dot dash (ITU-R M.1677-1).
6. "Row, Row, Row Your Boat": traditional nursery rhyme, public domain.
7. Own experiment: `demo/compress_demo.py` → `demo/compress_output.json` (Python zlib level 9; Pillow PNG and JPEG).
