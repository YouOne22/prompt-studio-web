from prompts.base_engine import build_art_direction_block

# 1. MODUL SPANDUK FORMAL MODERN / EXECUTIVE
def get_spanduk_formal_modern_prompt(req) -> str:
    art_block = build_art_direction_block(
        req.design_type, req.sub_style, req.orientation, req.size, req.tone, req.render_mode
    )
    extra = f"\n- Exact Text Contents to Render:\n{req.details}" if req.details else ""

    return f"""
[MASTER BRIEF: SPANDUK FORMAL MODERN & EXECUTIVE]
Act as an Executive Brand Director. Create a clean, modern, Swiss-style official banner design brief for {req.target_ai}.

{art_block}

[VISUAL STYLE & PALETTE]
- Style Concept: Executive Minimalist, Swiss International Style, Spacious Grid, Clean Alignment.
- Color Palette: Deep Corporate Navy, Pure White, Slate Grey, with thin vibrant Cyan accent lines.
- Typography: Bold Neo-Grotesque Sans-Serif (Inter / Montserrat style). Flat solid colors (White/Navy). NO text strokes, NO heavy drop shadows, NO cheap text gradients.
- Layout Elements: Subtle angled geometric background shapes, elegant card containers for dates/locations, clean white breathing space.

[CONTENT LAYOUT INSTRUCTIONS]
- Top-Left: Dedicated clean space for Government / Official Regional Emblem/Logo.
- Center Area: Render the primary event name in large extra-bold typography.
- Sub-Center: Render the main theme in clear, elegant sans-serif text.
- Bottom Bar: Date, location, and regional info neatly organized inside a rounded pill-shaped container or flat banner strip.{extra}
"""

# 2. MODUL SPANDUK FORMAL KLASIK PEMDA
def get_spanduk_formal_klasik_prompt(req) -> str:
    art_block = build_art_direction_block(
        req.design_type, req.sub_style, req.orientation, req.size, req.tone, req.render_mode
    )
    extra = f"\n- Exact Text Contents to Render:\n{req.details}" if req.details else ""

    return f"""
[MASTER BRIEF: SPANDUK FORMAL KLASIK PEMDA / KONVENSIONAL]
Act as a Regional Commercial Printing Designer. Create a classic Indonesian local government event banner design brief for {req.target_ai}.

{art_block}

[VISUAL STYLE & PALETTE]
- Style Concept: Traditional Indonesian Village / Pemda Official Banner, High-Contrast Commercial Look.
- Color Palette: Vivid Cyan-to-Blue or Emerald Green background gradient with abstract corner wave vectors.
- Typography: Heavy Condensed Bold Sans-Serif, centered text alignment.
- Text Effects: High-contrast title styling (Red-to-Yellow gradient text fill, thick white inner outline/stroke, black drop shadow for maximum outdoor readability).
- Layout Elements: Top corner emblem placeholder, wave vector frames on corners, bottom pill badge for date and location.{extra}
"""
