"""Derive the website font and Figma-editable outlines from one glyph source.

Offline asset preparation only; CI serves the checked-in WOFF2 unchanged.
Requires fonttools and brotli. Run from any directory with Python 3.
"""
import json
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/fonts/pixelify-sans-bold-latin-v1.woff2"
OUTPUT = ROOT / "public/fonts/jiaming-pixel-bold-latin-v2.woff2"
OUTLINES = ROOT / "design/home-pixel-glyphs-v2.json"

font = TTFont(SOURCE)
cmap = font.getBestCmap()

# Preserve every advance width, side bearing and unaffected glyph. C/c's old
# 34/35-unit slit looked closed at small sizes. New apertures are 205/137 units.
for character, upper, lower in [("C", 416, 211), ("c", 297, 160)]:
    glyph = font["glyf"][cmap[ord(character)]]
    for index, y in [(9, upper), (10, upper), (15, lower), (16, lower)]:
        x, _ = glyph.coordinates[index]
        glyph.coordinates[index] = (x, y)
    glyph.recalcBounds(font["glyf"])

# A three-step diagonal with completely flat top-left and bottom-right
# terminals. The original Z used left/right return hooks resembling a numeral 2.
z_points = [
    (61, 638), (542, 638), (542, 376), (414, 376), (414, 251),
    (286, 251), (286, 125), (542, 125), (542, -11), (61, -11),
    (61, 125), (109, 125), (109, 251), (237, 251), (237, 376),
    (365, 376), (365, 501), (61, 501),
]
pen = TTGlyphPen(None)
pen.moveTo(z_points[0])
for point in z_points[1:]:
    pen.lineTo(point)
pen.closePath()
font["glyf"][cmap[ord("Z")]] = pen.glyph()
# Lowercase z already has the same flat-terminal stair-step construction.

names = {
    1: "Jiaming Pixel", 2: "Bold", 3: "JiamingPixel-v2-Bold",
    4: "Jiaming Pixel Bold", 6: "JiamingPixel-Bold",
    16: "Jiaming Pixel", 17: "Bold",
}
for record in font["name"].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font["head"].fontRevision = 2.0
font.flavor = "woff2"
font.save(OUTPUT)

# Reload the delivered binary so the vector data is provably what browsers use.
delivered = TTFont(OUTPUT)
glyph_set = delivered.getGlyphSet()
characters = sorted(set("JIAMING ZHANGUniLinkDESIGN ACROSSSCREENS,SYSTEMS& SERVICES.BoardGameMateMy Furniture StoreCultureLens ConciergeCrownlandsLET'S CREATEMEANINGFULEXPERIENCES."))
glyphs = {}
for character in characters:
    name = cmap[ord(character)]
    bounds = delivered["glyf"][name]
    bounds.recalcBounds(delivered["glyf"])
    svg_pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(TransformPen(svg_pen, (1, 0, 0, -1, 0, 638)))
    glyphs[character] = {
        "advance": delivered["hmtx"][name][0], "path": svg_pen.getCommands(),
        "bounds": [bounds.xMin, 638 - bounds.yMax, bounds.xMax, 638 - bounds.yMin]
        if bounds.numberOfContours else [0, 0, 0, 0],
    }
data = {
    "family": "Jiaming Pixel", "weight": 700, "unitsPerEm": 1000,
    "capTop": 638, "capHeight": 649, "sourceFont": OUTPUT.name,
    "changedGlyphs": ["C", "c", "Z"],
    "apertures": {"C": {"previous": 34, "current": 205}, "c": {"previous": 35, "current": 137}},
    "glyphs": glyphs,
}
OUTLINES.parent.mkdir(parents=True, exist_ok=True)
OUTLINES.write_text(json.dumps(data, indent=2) + "\n")
print(json.dumps({"fontBytes": OUTPUT.stat().st_size, "glyphCount": len(glyphs), "outlines": str(OUTLINES)}))
