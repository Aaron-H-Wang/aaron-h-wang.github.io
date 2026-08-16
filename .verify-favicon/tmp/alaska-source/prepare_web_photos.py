from pathlib import Path
from PIL import Image, ImageOps

source = Path(r"D:\CodexWork\Personal_Website\tmp\alaska-source")
output = Path(r"D:\CodexWork\Personal_Website\assets\img\posts\alaska-2025")
output.mkdir(parents=True, exist_ok=True)

photos = {
    "Denali": ["5559", "5615", "5616", "5618", "5619", "5620", "5621", "5622"],
    "Kenai-Fjords": ["5640", "5641", "5643", "5644", "5645", "5646", "5647", "5648", "5649"],
}

for group, numbers in photos.items():
    prefix = "denali" if group == "Denali" else "kenai-fjords"
    for number in numbers:
        input_path = source / group / f"IMG_{number}.JPG"
        output_path = output / f"{prefix}-img-{number}.jpg"
        with Image.open(input_path) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            save_options = {
                "quality": 90,
                "subsampling": 0,
                "optimize": True,
                "progressive": True,
                "exif": original.getexif(),
            }
            if original.info.get("icc_profile"):
                save_options["icc_profile"] = original.info["icc_profile"]
            image.save(output_path, **save_options)
            print(f"{output_path.name}\t{image.width}x{image.height}\t{output_path.stat().st_size}")
