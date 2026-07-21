from prompts.base_engine import build_art_direction_block

def get_kartu_nama_pengacara_prompt(req) -> str:
    art_block = build_art_direction_block(
        req.design_type, req.sub_style, req.orientation, req.size, req.tone, req.render_mode
    )
    extra = f"\n- Specific Details: {req.details}" if req.details else ""

    return f"""
[MASTER BRIEF: KARTU NAMA PENGACARA & KONSULTAN HUKUM]
Act as a Luxury Stationery Designer. Create a premium business card layout prompt for {req.target_ai}.

{art_block}

[VISUAL STYLE & PALETTE]
- Color Palette: Matte Black or Dark Charcoal Grey background with Embossed Gold Foil font details.
- Material Feel: Premium cotton paper texture with spot UV finish aesthetic.
- Typography: Serif Classic (Garamond/Bodoni style) for Executive Name, Minimalist Sans-Serif for contact details.

[LAYOUT STRUCTURE (FRONT & BACK)]
- Front: Minimalist Firm Logo & Tagline centered with gold foil border accent.
- Back: Full Name, Legal Title (Advokat / Legal Consultant), Bar Association Number, Phone, Email, Office Address.{extra}
"""
