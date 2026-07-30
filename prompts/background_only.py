from prompts.base_engine import build_background_art_direction

def get_background_only_prompt(req) -> str:
    # Mengambil art direction dasar (orientasi, ukuran, dll)
    art_block = build_background_art_direction(
        req.design_type, req.orientation, req.size, req.render_mode
    )

    # 1. Ambil Sub-Kategori / Sub-Style (misal: "Pengajian / Keagamaan", "3D Stage", dll)
    sub_style = getattr(req, 'sub_style', None) or getattr(req, 'sub_category', None) or "General Abstract"

    # 2. Ambil nilai dari form fields (baik berbentuk dictionary maupun properti)
    fields = getattr(req, 'fields', {}) or {}
    
    # Ekstrak nilai spesifik jika input tersedia
    tema = fields.get('temaBackground') or getattr(req, 'temaBackground', '')
    ornamen = fields.get('elemenOrnamen') or getattr(req, 'elemenOrnamen', '')
    copy_space = fields.get('copySpace') or getattr(req, 'copySpace', '')
    warna = fields.get('warna') or getattr(req, 'warna', '') or getattr(req, 'details', '') or "Harmonious & Professional Palette"
    catatan = fields.get('catatanKhusus') or getattr(req, 'catatanKhusus', '')

    # Susun detail visual tambahan
    visual_details = []
    if tema:
        visual_details.append(f"- Theme & Mood Concept: {tema}")
    if ornamen:
        visual_details.append(f"- Decorative Elements & Motifs: {ornamen}")
    if copy_space:
        visual_details.append(f"- Layout & Copy Space: {copy_space}")
    if catatan:
        visual_details.append(f"- Special Instructions: {catatan}")
        
    extra_details_str = "\n".join(visual_details) if visual_details else "- Layout Elements: Smooth gradient lighting, clean vector lines, elegant frame structure on side borders."

    return f"""[MASTER BRIEF: CLEAN GRAPHIC BACKGROUND TEMPLATE (NO TEXT)]
Act as a Graphic Asset & Background Designer. Create a premium, print-ready empty graphic background template brief for {req.target_ai}.

{art_block}

[VISUAL STYLE & THEME]
- Category / Sub-Style: {sub_style}
- Color Palette: {warna}
{extra_details_str}
- Center Area: Extremely clean, high-contrast surface, wide empty space prepared for future typography placement.

[FINAL OUTPUT REQUIREMENT & NEGATIVE PROMPT]
Render a complete graphic background asset ONLY.
CRITICAL MANDATE: ZERO text, ZERO typography, ZERO letters, ZERO words, ZERO logos, ZERO emblems, ZERO labels, ZERO text placeholders.
Pure blank visual background asset.
"""
