from pathlib import Path
from PIL import Image, ExifTags
from PIL import ImageDraw, ImageFont

root = Path(r"D:\CodexWork\Personal_Website\tmp\alaska-source")
date_tags = {k for k, v in ExifTags.TAGS.items() if v in {"DateTimeOriginal", "DateTimeDigitized", "DateTime"}}

for path in sorted(root.rglob("*.JPG")):
    with Image.open(path) as image:
        exif = image.getexif()
        dates = [str(exif.get(tag)) for tag in date_tags if exif.get(tag)]
        print(f"{path.parent.name}/{path.name}\t{image.width}x{image.height}\t{dates}")

for folder in (root / "Denali", root / "Kenai-Fjords"):
    paths = sorted(folder.glob("*.JPG"))
    thumb_width, thumb_height = 520, 380
    sheet = Image.new("RGB", (thumb_width * 3, thumb_height * ((len(paths) + 2) // 3)), "white")
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(paths):
        with Image.open(path) as image:
            image.thumbnail((thumb_width - 20, thumb_height - 50), Image.Resampling.LANCZOS)
            x = (index % 3) * thumb_width + (thumb_width - image.width) // 2
            y = (index // 3) * thumb_height + 8
            sheet.paste(image, (x, y))
            draw.text(((index % 3) * thumb_width + 12, (index // 3) * thumb_height + thumb_height - 34), path.stem, fill="#17324a")
    sheet.save(root / f"{folder.name}-contact.jpg", quality=90)
