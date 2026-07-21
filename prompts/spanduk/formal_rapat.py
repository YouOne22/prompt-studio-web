from prompts.base_engine import build_art_direction_block

def get_spanduk_formal_prompt(req) -> str:
    art_block = build_art_direction_block(
        req.design_type, req.sub_style, req.orientation, req.size, req.tone, req.render_mode
    )
    extra = f"\n- Detailed Content Information:\n{req.details}" if req.details else ""

    return f"""
[MASTER BRIEF: SPANDUK RAPAT & FORMAL RESMI]
Act as a Corporate Brand Identity Director. Create a clean, authoritative design brief for {req.target_ai}.

{art_block}

[VISUAL STYLE & PALETTE]
- Color Palette: Corporate Navy Blue, Slate Grey, and Crisp White with vibrant Cyan accent line.
- Aesthetics: Swiss style minimalist layout, diagonal geometric color blocks, structured grid.
- Typography: Bold Neo-Grotesque Sans-Serif (Helvetica / Inter style) for maximum readability.

[CONTENT STRUCTURE]
- Top Bar: Company / Agency Logos on top left/right with proper breathing space.
- Central Area: Event Name (e.g., "RAPAT KERJA NASIONAL").
- Sub-text: Theme of the event in italicized clear font.
- Bottom Bar: Date, Venue, and Committee info.{extra}
"""
