NEGATIVE_PROMPT_RULES = (
    "DO NOT include generic 3D rendered plastic look, overly glossy textures, distorted floating text, "
    "unnatural AI glows, messy typography, extra hands/fingers, or chaotic color gradients. "
    "STRICTLY DO NOT PRINT FORM FIELD LABELS or structural text headers like 'TEMA UTAMA:', 'TANGGAL & LOKASI:', "
    "'NAMA AGENDA:', or 'CATATAN:' on the banner layout—render ONLY the exact literal content values."
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
  1. Primary Focal Point (Main Title / Headline) – more prominent or visible than other elements, yet without being overly dominant
  2. Secondary Focus (Sub-headline / Key Detail) – 60% smaller than the main headline
  3. Action & Branding (Logos, Contact, Date, Location) - 40% smaller than the main headline.

[ANTI-AI LOOK & QUALITY CONSTRAINTS]
- {NEGATIVE_PROMPT_RULES}
- {render_inst}
"""

# Aturan khusus untuk Background Polosan
BACKGROUND_ONLY_NEGATIVE_PROMPT = (
    "STRICTLY NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO TYPOGRAPHY, NO ALPHABET, "
    "NO LOGOS, NO EMBLEMS, NO WATERMARKS, NO READABLE CHARACTERS. "
    "DO NOT print any text elements or placeholders. "
    "Pure empty graphic template background only with clean layout framing."
)

def build_background_art_direction(design_type: str, orientation: str, size: str, render_mode: str) -> str:
    return f"""
[SPECIFICATIONS & ART DIRECTION]
- Product Type: {design_type.upper()} BACKGROUND TEMPLATE
- Style Category: Clean Graphics / Graphic Background Only
- Layout Orientation: {orientation}
- Print Dimensions: {size}
- Render Output Mode: {render_mode}

[BACKGROUND COMPOSITION & NEGATIVE SPACE]
- Composition: High-end graphic template background. Must provide ample 'Negative Space' (clean, un-cluttered central area) specifically designed for text overlay in CorelDRAW/Canva.
- Framing: Outer geometric or abstract borders, leaving 70% of central visual area clean and open.

[ANTI-TEXT CONSTRAINTS]
- {BACKGROUND_ONLY_NEGATIVE_PROMPT}
"""
