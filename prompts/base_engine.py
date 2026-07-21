# Modul Standar Anti-AI Look & Format Cetak

NEGATIVE_PROMPT_RULES = (
    "DO NOT include generic 3D rendered plastic look, overly glossy textures, distorted floating text, "
    "unnatural AI glows, messy typography, extra hands/fingers, or chaotic color gradients. "
    "Ensure clean 2D layout, crisp vector shapes, professional print grid, and legibility."
)

def get_render_mode_instruction(render_mode: str) -> str:
    if "Mockup" in render_mode:
        return (
            "PRESENTATION: Realistic product mockup photorealistic photo. "
            "Show the printed material installed in a clean real-world environment with soft natural lighting."
        )
    return (
        "PRESENTATION: Clean 2D flat graphic design visual layout. "
        "Separated visual layers, ultra-crisp lines, suitable for direct execution in CorelDRAW or Adobe Illustrator."
    )

def build_art_direction_block(design_type: str, sub_style: str, orientation: str, size: str, tone: str, render_mode: str) -> str:
    render_inst = get_render_mode_instruction(render_mode)
    
    return f"""
[SPECIFICATIONS & ART DIRECTION]
- Product Type: {design_type.upper()}
- Style Category: {sub_style}
- Layout Orientation: {orientation}
- Print Dimensions: {size}
- Tone & Mood: {tone}
- Render Output Mode: {render_mode}

[LAYOUT GRID & PRINT SAFE ZONE]
- Safe Margin: Maintain 3-5 cm inner margin for eyelets/cutting lines.
- Hierarchy: 
  1. Primary Focal Point (Main Title / Headline) - 40% visual area.
  2. Secondary Focus (Speaker / Key Details / Sub-headline) - 30% area.
  3. Action & Branding (Logos, Contact, Date, Location, CTA) - 30% area.

[ANTI-AI LOOK & QUALITY CONSTRAINTS]
- {NEGATIVE_PROMPT_RULES}
- {render_inst}
"""
