from prompts.base_engine import build_art_direction_block

def get_spanduk_pengajian_prompt(req) -> str:
    art_block = build_art_direction_block(
        req.design_type, req.sub_style, req.orientation, req.size, req.tone, req.render_mode
    )
    extra = f"\n- Detailed Content Information:\n{req.details}" if req.details else ""

    return f"""
[MASTER BRIEF: SPANDUK PENGAJIAN / KEAGAMAAN]
Act as a Senior Islamic Graphic Designer and Art Director. Create an exquisite, non-cluttered design prompt for {req.target_ai}.

{art_block}

[VISUAL STYLE & PALETTE]
- Color Palette: Deep Emerald Green (CMYK: 85,20,90,40), Metallic Warm Gold accents, and Crisp Cream Background.
- Ornaments: Subtle geometric Islamic vector patterns (Arabesque/Moroccan tiles) as background texture. Avoid heavy 3D domes.
- Typography: Elegant Calligraphic header style paired with clean Sans-Serif for time, location, and speaker names.

[CONTENT STRUCTURE]
- Header: Bismillah / Salam in elegant Arabic vector typography.
- Main Title: Acara Pengajian / Tabligh Akbar (Bold, readable from 10 meters away).
- Speaker Focus: Dedicated clean badge/frame for Penceramah / KH / Ustadz photo.
- Footer: Clear Date, Time, Location, and Community/Mosque Organization Logos.{extra}

[GENERATION PROMPT FOR IMAGE GENERATORS]
High resolution 2D flat design concept of an Islamic religious banner, deep green and gold color theme, clean layout, professional typography, print-ready, {art_block}
"""
