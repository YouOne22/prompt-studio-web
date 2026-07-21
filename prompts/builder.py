from prompts.background_only import get_background_only_prompt
from prompts.base_engine import build_art_direction_block
from prompts.kartu_nama.pengacara import get_kartu_nama_pengacara_prompt
from prompts.spanduk.formal_rapat import (
    get_spanduk_formal_klasik_prompt,
    get_spanduk_formal_modern_prompt,
)
from prompts.spanduk.pengajian import get_spanduk_pengajian_prompt


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


def build_prompt(req):
    d_type = req.design_type.lower()
    sub = req.sub_style.lower()

    # 1. Pengecekan fitur Background Only / Polosan
    if "background" in sub or "polosan" in sub:
        final_prompt = get_background_only_prompt(req)
        system_instruction = f"Kamu adalah Master Prompt Engineer. Tugasmu membuat brief background polosan tanpa teks untuk {req.target_ai}."

    # 2. Pengecekan Kategori Spanduk
    elif "spanduk" in d_type:
        if "klasik" in sub or "konvensional" in sub:
            final_prompt = get_spanduk_formal_klasik_prompt(req)
        elif "pengajian" in sub:
            final_prompt = get_spanduk_pengajian_prompt(req)
        elif "formal" in sub or "executive" in sub or "modern" in sub:
            final_prompt = get_spanduk_formal_modern_prompt(req)
        else:
            final_prompt = get_general_fallback(req)

        system_instruction = (
            f"Kamu adalah Art Director & Master Prompt Engineer profesional. "
            f"Tugasmu meracik brief desain visual bebas 'AI Look' untuk {req.target_ai}. "
            f"PENTING: Jangan sertakan label nama field (seperti 'Tema Utama:') ke dalam gambar. "
            f"Output HARUS langsung berupa Master Prompt final tanpa kata sambutan."
        )

    # 3. Pengecekan Kartu Nama Pengacara
    elif "kartu nama" in d_type and "pengacara" in sub:
        final_prompt = get_kartu_nama_pengacara_prompt(req)
        system_instruction = (
            f"Kamu adalah Art Director & Master Prompt Engineer profesional. "
            f"Tugasmu meracik brief desain visual bebas 'AI Look' untuk {req.target_ai}. "
            f"PENTING: Jangan sertakan label nama field (seperti 'Tema Utama:') ke dalam gambar. "
            f"Output HARUS langsung berupa Master Prompt final tanpa kata sambutan."
        )

    # 4. Fallback umum
    else:
        final_prompt = get_general_fallback(req)
        system_instruction = (
            f"Kamu adalah Art Director & Master Prompt Engineer profesional. "
            f"Tugasmu meracik brief desain visual bebas 'AI Look' untuk {req.target_ai}. "
            f"PENTING: Jangan sertakan label nama field (seperti 'Tema Utama:') ke dalam gambar. "
            f"Output HARUS langsung berupa Master Prompt final tanpa kata sambutan."
        )

    user_content = (
        f"Generate Master Prompt berdasarkan kriteria berikut:\n{final_prompt}"
    )

    return system_instruction, user_content, final_prompt
