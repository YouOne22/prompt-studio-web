from prompts.background_only import get_background_only_prompt
from prompts.base_engine import build_art_direction_block
from prompts.kartu_nama.pengacara import get_kartu_nama_pengacara_prompt
from prompts.spanduk.formal_rapat import (
    get_spanduk_formal_klasik_prompt,
    get_spanduk_formal_modern_prompt,
)
from prompts.spanduk.pengajian import get_spanduk_pengajian_prompt


# 💡 1. FUNGSI KHUSUS UNTUK MENYEDERHANAKAN PROMPT CANVA AI
def simplify_prompt_for_canva(req, raw_prompt: str) -> str:
    """Canva AI (Magic Media) hanya butuh deskripsi visual inti (maksimal 2-3 kalimat)

    tanpa struktur [MASTER BRIEF], 'Act as...', atau tanda kurung berlebih.
    """
    ornaments = getattr(req, "extra_ornaments", "")
    ornament_text = f", {ornaments}" if ornaments else ""

    # Menyusun prompt ringkas 1 paragraf murni deskripsi visual
    canva_prompt = (
        f"High resolution 2D flat vector {req.design_type.lower()} design, "
        f"{req.sub_style.lower()} style, "
        f"{req.details if req.details else 'professional color theme'}, "
        f"subtle background patterns, clean central negative space for text placement{ornament_text}, "
        f"print-ready horizontal banner layout, zero noise, razor sharp vector edges."
    )
    return canva_prompt


# 💡 2. FUNGSI UTAMA BUILDER
def build_prompt(req):
    d_type = req.design_type.lower()
    sub = req.sub_style.lower()
    target_ai = getattr(req, "target_ai", "").lower()

    # --- Pilihan Prompt Berdasarkan Kategori ---
    if "background" in sub or "polosan" in sub:
        final_prompt = get_background_only_prompt(req)
    elif "spanduk" in d_type:
        if "klasik" in sub or "konvensional" in sub:
            final_prompt = get_spanduk_formal_klasik_prompt(req)
        elif "pengajian" in sub:
            final_prompt = get_spanduk_pengajian_prompt(req)
        elif "formal" in sub or "executive" in sub or "modern" in sub:
            final_prompt = get_spanduk_formal_modern_prompt(req)
        else:
            final_prompt = get_general_fallback(req)
    elif "kartu nama" in d_type and "pengacara" in sub:
        final_prompt = get_kartu_nama_pengacara_prompt(req)
    else:
        final_prompt = get_general_fallback(req)

    # 💡 3. PENGECEKAN TARGET AI (Saring jika pengguna memilih Canva)
    if "canva" in target_ai:
        final_prompt = simplify_prompt_for_canva(req, final_prompt)
        system_instruction = (
            "Kamu adalah Prompt Engineer. Tugasmu membuat deskripsi visual ringkas "
            "1 paragraf yang siap ditempel langsung ke Canva Magic Media tanpa error."
        )
    else:
        system_instruction = (
            f"Kamu adalah Art Director & Master Prompt Engineer profesional. "
            f"Tugasmu meracik brief desain visual bebas 'AI Look' untuk {req.target_ai}. "
            f"Output HARUS langsung berupa Master Prompt final tanpa kata sambutan."
        )

    user_content = (
        f"Generate Master Prompt berdasarkan kriteria berikut:\n{final_prompt}"
    )

    return system_instruction, user_content, final_prompt


def get_general_fallback(req) -> str:
    art_block = build_art_direction_block(
        req.design_type,
        req.sub_style,
        req.orientation,
        req.size,
        req.tone,
        req.render_mode,
    )
    extra = (
        f"\n- Detailed Content Information:\n{req.details}"
        if req.details
        else ""
    )
    return (
        f"[MASTER DESIGN BRIEF]\n{art_block}\n"
        f"Provide a clean, balanced layout structure and print-ready visual direction.{extra}"
    )
