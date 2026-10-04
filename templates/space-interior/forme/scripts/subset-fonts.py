"""Optional content-font regeneration: pip install fonttools brotli, then python scripts/subset-fonts.py."""
from pathlib import Path
from fontTools import subset
root = Path(__file__).resolve().parent.parent
chars = set(''.join(f.read_text(encoding='utf8') for f in root.joinpath('src').rglob('*.tsx')))
chars.update(chr(i) for i in range(32, 127))
for weight in ('Regular', 'Medium'):
    source = root / 'node_modules/pretendard/dist/web/static/woff2' / f'Pretendard-{weight}.woff2'
    options = subset.Options()
    options.flavor = 'woff2'
    font = subset.load_font(str(source), options)
    sub = subset.Subsetter(options=options)
    sub.populate(text=''.join(chars))
    sub.subset(font)
    subset.save_font(font, str(root / 'src/fonts' / f'Pretendard-{weight}.woff2'), options)
