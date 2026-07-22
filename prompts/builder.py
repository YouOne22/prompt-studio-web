import re

# Pemetaan kata kunci label Bahasa Indonesia ke Bahasa Inggris untuk Section 5
LABEL_TRANSLATIONS = [
    (r"judul\s*utama|nama\s*usaha|nama\s*acara|topik\s*utama", "Main Headline / Title"),
    (r"nama\s*lengkap", "Full Name & Title"),
    (r"sub-judul|tema|slogan|tagline|jabatan|profesi", "Sub-Headline / Tagline"),
    (r"detail\s*acara|penceramah|poin\s*informasi|isi\s*ringkas|highlights|pemateri|detail\s*isi", "Event & Content Details"),
    (r"waktu|tanggal|lokasi|kontak|alamat|website|sosmed", "Date, Location & Contact"),
    (r"penyelenggara|sponsor|logo", "Organizer / Branding Elements"),
    (r"elemen\s*wajib", "Required Visual Elements"),
    (r"call\s*to\s*action|registrasi|htm", "Call To Action / Event Info"),
    (r"preferensi\s*warna|palette\s*warna|nuansa\s*visual", "Color Palette & Vibe"),
    (r"catatan|pesan\s*khusus|instruksi\s*khusus", "Special AI Instructions"),
]


def parse_and_format_details(details_str):
    """
    Memproses string detail dari form dan menerjemahkan label Bahasa Indonesia
    menjadi format kriteria Bahasa Inggris yang rapi untuk Section 5.
    """
    if not details_str or not details_str.strip():
        return "Business name, main services, CTA, and contact details.", ""

    lines = details_str.strip().split("\n")
    parsed_entries = []
    color_vibe = ""
    current_label = None
    current_val = []

    # Parsing baris demi baris
    for line in lines:
        line_str = line.strip()
        if not line_str:
            continue

        if line_str.startswith("•") or ":" in line_str:
            if current_label and current_val:
                val_joined = " ".join(current_val).strip()
                if val_joined:
                    parsed_entries.append((current_label, val_joined))
                current_val = []

            clean_line = line_str.lstrip("•").strip()
            if ":" in clean_line:
                parts = clean_line.split(":", 1)
                current_label = parts[0].strip()
                if parts[1].strip():
                    current_val.append(parts[1].strip())
            else:
                current_label = clean_line
        else:
            if current_label:
                current_val.append(line_str)
            else:
                current_label = "Details"
                current_val.append(line_str)

    if current_label and current_val:
        val_joined = " ".join(current_val).strip()
        if val_joined:
            parsed_entries.append((current_label, val_joined))

    # Format entri ke Bahasa Inggris
    formatted_items = []
    for label_raw, val_raw in parsed_entries:
        label_lower = label_raw.lower()

        # Pisahkan warna agar diletakkan di baris Color Palette khusus
        if any(k in label_lower for k in ["warna", "color", "palette"]):
            color_vibe = val_raw
            continue

        mapped_label = None
        for pattern, eng_label in LABEL_TRANSLATIONS:
            if re.search(pattern, label_lower):
                mapped_label = eng_label
                break

        if not mapped_label:
            mapped_label = label_raw

        formatted_items.append(f'- {mapped_label}: "{val_raw}"')

    details_en = "\n".join(formatted_items) if formatted_items else "Business name, main services, CTA, and contact details."
    return details_en, color_vibe


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

    # Parse details khusus untuk Fallback Result (Section 5)
    details_en, color_vibe = parse_and_format_details(req.details)
    color_line = f"Color Palette: {color_vibe}\n" if color_vibe else ""

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
{color_line}
Use a clean grid system, bold contrast typography, professional hierarchy, vector graphic elements, organized text placement, sharp print-ready resolution, precise alignment, anti-cluttered modern aesthetic.

Text Content & Layout Specifications:
{details_en}
=================================================="""

    return system_instruction, user_content, fallback_result
