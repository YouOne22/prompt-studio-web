def build_prompt(req):
    system_instruction = (
        "Anda adalah seorang Senior Graphic Designer & AI Prompt Architect spesialis media cetak dan digital. "
        "Tugas Anda adalah menyusun Master Design Brief & AI Prompt yang sangat terstruktur, spesifik, "
        "dan anti 'generic-AI look'. "
        "Pastikan instruksi mencakup hirarki tipografi, komposisi tata letak, palet warna, margin aman cetak (bleed/safe area), "
        "serta panduan visual mendalam sesuai platform AI yang dituju."
    )

    user_content = f"""
Buatkan Master Prompt Desain Grafis Profesional berdasarkan parameter berikut:

[PARAMETER DESAIN]
- Jenis Desain: {req.design_type}
- Sub-Kategori / Modul: {req.sub_style}
- Orientasi: {req.orientation}
- Ukuran: {req.size}
- Mode Output Visual: {req.render_mode}
- Tone Visual: {req.tone}
- Target AI Platform: {req.target_ai}

[DETAIL KONTEN & INFORMASI]
{req.details if req.details.strip() else 'Tidak ada detail tambahan.'}

[FORMAT OUTPUT DIBUTUHKAN]
1. Header Brief & Spesifikasi Teknikal (Ukuran, Orientasi, Bleed Area, Mode Warna CMYK/RGB).
2. Konsep Visual & Tata Letak (Grid System, Layout Structure, Focal Point).
3. Hirarki Tipografi (Header, Sub-header, Body Text, Font Style & Weights).
4. Palet Warna & Kode Hex/CMYK (Warna Utama, Warna Aksen, Warna Latar Belakang).
5. Teks Konten & Elemen Grafis (Slogan, Detail Informasi, Iconography, Vector Elements).
6. Ready-to-Use Master Prompt dalam Bahasa Inggris (Khusus untuk di-copy langsung ke {req.target_ai}).
    """

    # Fallback jika API Key tidak diset atau terjadi kegagalan jaringan
    fallback_result = f"""==================================================
PROMPT STUDIO - MASTER DESIGN BRIEF
==================================================

[1. SPESIFIKASI TEKNIKAL]
• Jenis Desain   : {req.design_type} ({req.sub_style})
• Orientasi      : {req.orientation}
• Dimensi        : {req.size}
• Render Mode    : {req.render_mode}
• Tone Visual    : {req.tone}
• Output Target  : {req.target_ai}

[2. KONSEP VISUAL & KOMPOSISI]
• Layout Grid    : Clean modular grid dengan margin aman (safe bleed zone 5%).
• Focal Point    : Judul utama dan logo diletakkan pada posisi dominan (rule of thirds).
• Gaya Visual    : Modern, tajam, profesional, dengan kontras tinggi tanpa kesan overcrowded.

[3. HIRARKI TIPOGRAFI & WARNA]
• Primary Font   : Sans-serif Bold / Display Heavy (untuk Headline).
• Secondary Font : Neutral Sans-serif Medium (untuk Subhead & Detail Kontak).
• Palet Warna    : Kontras tinggi (Dominan: Dark/Light base, Accent: Vibrant Highlighting Color).

[4. KONTEN & DETAIL TERLAMPIR]
{req.details if req.details.strip() else '- (Isi detail pada form untuk melengkapi section ini)'}

--------------------------------------------------
[5. READY-TO-USE PROMPT FOR {req.target_ai.upper()}]
--------------------------------------------------
Design a professional, high-impact {req.design_type.lower()} for "{req.sub_style}". 
Layout orientation: {req.orientation}, Size specification: {req.size}. 
Visual style: {req.render_mode} with a {req.tone.lower()} vibe. 
Use a clean grid system, bold contrast typography, professional hierarchy, vector graphic elements, organized text placement, sharp print-ready resolution, precise alignment, anti-cluttered modern aesthetic.
Details to include: {req.details if req.details.strip() else 'Business name, main services, CTA, and contact details.'}
=================================================="""

    return system_instruction, user_content, fallback_result
