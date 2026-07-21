from prompts.base_engine import build_background_art_direction

def get_background_only_prompt(req) -> str:
    art_block = build_background_art_direction(
        req.design_type, req.orientation, req.size, req.render_mode
    )
    
    notes = req.details if req.details else "Modern Corporate Colors"

    return f"""
[MASTER BRIEF: CLEAN GRAPHIC BACKGROUND TEMPLATE (NO TEXT)]
Act as a Graphic Asset & Background Designer. Create a premium, print-ready empty graphic background template brief for {req.target_ai}.

{art_block}

[VISUAL STYLE & PATTERN]
- Concept: Abstract professional vector backdrop for {req.design_type}.
- Color & Palette Details: {notes}
- Layout Elements: Smooth gradient lighting, crisp vector lines, subtle diagonal/curved shapes on side corners, professional side frames.
- Center Area: Extremely clean, high-contrast, flat solid or subtle soft gradient surface ready for typography placement.

[FINAL OUTPUT REQUIREMENT]
Render a complete 2D flat vector graphic background with ZERO text, ZERO logos, and ZERO labels. Pure blank visual background asset.
"""
