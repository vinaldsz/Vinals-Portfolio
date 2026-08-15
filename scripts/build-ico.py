#!/usr/bin/env python3
"""Assemble public/favicon.ico from pre-rendered PNGs.

The ICO container has allowed PNG payloads since Vista, so a multi-size icon is
just a 6-byte header, one 16-byte directory entry per image, and the PNG bytes
concatenated. That means no image library is needed - which keeps this repo's
"no new dependencies" posture intact.

Render the PNGs first (see scripts/README.md step 2), then run this from the
repo root. Defaults to /tmp/fav{16,32,48}.png.
"""

import pathlib
import struct
import sys

SIZES = (16, 32, 48)


def main(src_dir: pathlib.Path, out: pathlib.Path) -> int:
    images = []
    for size in SIZES:
        png = src_dir / f"fav{size}.png"
        if not png.exists():
            print(f"missing {png} - render the PNGs first (scripts/README.md)")
            return 1
        images.append((size, png.read_bytes()))

    header = struct.pack("<HHH", 0, 1, len(images))
    offset = len(header) + 16 * len(images)
    directory = b""
    for size, data in images:
        # 0 in the width/height byte means 256; every size here is smaller.
        directory += struct.pack(
            "<BBBBHHII", size, size, 0, 0, 1, 32, len(data), offset
        )
        offset += len(data)

    out.write_bytes(header + directory + b"".join(d for _, d in images))
    print(f"{out}: {out.stat().st_size} bytes, sizes {list(SIZES)}")
    return 0


if __name__ == "__main__":
    src = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("/tmp")
    sys.exit(main(src, pathlib.Path("public/favicon.ico")))
