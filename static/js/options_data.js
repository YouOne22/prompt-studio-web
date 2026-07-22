// Data Dropdown
const subStyleOptions = {
    "Spanduk": [
        "Template Polosan / Background Only (Tanpa Teks)",
        "Formal Modern / Executive (Minimalis)",
        "Formal Klasik Pemda (Konvensional)",
        "Pengajian / Keagamaan",
        "Promosi Produk / Iklan Bisnis"
    ],
    "Kartu Nama": [
        "Pengacara / Konsultan Hukum",
        "Bengkel / Otomotif",
        "Perusahaan / Korporat"
    ],
    "Poster": [
        "Formal Modern / Executive (Minimalis)",
        "Pengajian / Keagamaan",
        "Promosi Produk / Iklan Bisnis"
    ],
    "Lainnya": ["Umum / Kustom Bebas"]
};

const sizePresetOptions = {
    "Spanduk": ["4 x 1 meter", "3 x 1 meter", "2 x 1 meter", "Custom..."],
    "Kartu Nama": ["9 x 5.5 cm (Standar Indonesia)", "9 x 5 cm (Slim)", "Custom..."],
    "Poster": ["A4 (21 x 29.7 cm)", "A3 (29.7 x 42 cm)", "Custom..."],
    "Lainnya": ["1080 x 1080 px", "1920 x 1080 px", "Custom..."]
};

// Preset Form Dinamis
const formalFormFields = [
    { id: "title", label: "Nama Agenda / Rapat", placeholder: "e.g. MUSYAWARAH DESA", type: "input" },
    { id: "subtitle", label: "Tema Utama", placeholder: "e.g. PENETAPAN APBDES TA 2026", type: "input" },
    { id: "agency", label: "Instansi / Desa / Kecamatan", placeholder: "e.g. DESA MENDONGAN, KEC. SUMOWONO", type: "input" },
    { id: "time_place", label: "Tanggal / Waktu", placeholder: "e.g. Mendongan, 7 Januari 2026", type: "input" },
    { id: "notes", label: "Catatan Visual Khusus", placeholder: "Catatan warna/elemen...", type: "textarea" }
];

const backgroundFormFields = [
    { id: "bg_style", label: "Gaya Pattern / Geometric", placeholder: "e.g. Modern Swiss Diagonal, Wave Curved, Islamic Arabesque", type: "input" },
    { id: "text_space", label: "Fokus Area Kosong (Negative Space)", placeholder: "e.g. Area tengah putih bersih untuk tempat teks utama", type: "input" },
    { id: "notes", label: "Catatan Warna & Nuansa", placeholder: "e.g. Hijau Emerald, Aksen Emas Metalik, Krem Off-White", type: "textarea" }
];

const formSchemas = {
    "Spanduk_Formal Modern / Executive (Minimalis)": formalFormFields,
    "Spanduk_Formal Klasik Pemda (Konvensional)": formalFormFields,
    "Spanduk_Template Polosan / Background Only (Tanpa Teks)": backgroundFormFields,
    "Poster_Template Polosan / Background Only (Tanpa Teks)": backgroundFormFields,
    "Spanduk_Pengajian / Keagamaan": [
        { id: "title", label: "Judul Utama / Acara", placeholder: "e.g. TABLIGH AKBAR & HALAL BIHALAL", type: "input" },
        { id: "subtitle", label: "Tema / Sub-Judul", placeholder: "e.g. Menjalin Ukhuwah Islamiyah di Era Digital", type: "input" },
        { id: "speaker", label: "Narasumber / Penceramah", placeholder: "e.g. KH. Ahmad Dahlan, M.Ag", type: "input" },
        { id: "time_place", label: "Waktu & Tempat", placeholder: "e.g. Minggu, 12 Agustus 2026 | Masjid Agung", type: "input" },
        { id: "organizer", label: "Penyelenggara / Logo", placeholder: "e.g. DKM Masjid Agung & Remaja Islam", type: "input" },
        { 
            id: "extra_ornaments", 
            label: "Ornamen & Elemen Visual Tambahan (Opsional)", 
            placeholder: "e.g. Tambahkan siluet kubah masjid 2D di latar belakang, pita emas melengkung, atau ornamen lentera Ramadan di pojok atas", 
            type: "textarea" 
        },
        { id: "notes", label: "Catatan Visual Khusus", placeholder: "e.g. Nuansa hijau botol, aksen ornamen islami emas", type: "textarea" }
    ],
    "Kartu Nama_Pengacara / Konsultan Hukum": [
        { id: "fullname", label: "Nama Lengkap & Gelar", placeholder: "e.g. Budi Santoso, S.H., M.H.", type: "input" },
        { id: "job_title", label: "Jabatan / Legal Title", placeholder: "e.g. Advokat & Legal Consultant", type: "input" },
        { id: "firm_name", label: "Nama Firma Hukum", placeholder: "e.g. Santoso & Partners Law Firm", type: "input" },
        { id: "bar_num", label: "Nomor Anggota / Legal ID", placeholder: "e.g. NIA PERADI: 12.34567", type: "input" },
        { id: "contact", label: "Kontak, Email & Website", placeholder: "e.g. 0812-3456-7890 | info@santosolaw.com", type: "input" },
        { id: "address", label: "Alamat Kantor", placeholder: "e.g. Gedung Sahid Sudirman Center Lt. 12", type: "input" },
        { id: "notes", label: "Catatan Visual Khusus", placeholder: "e.g. Base hitam matte, font emas embossed", type: "textarea" }
    ],
    "DEFAULT": [
        { id: "title", label: "Judul / Header Utama", placeholder: "Isikan judul utama cetakan...", type: "input" },
        { id: "sub_info", label: "Informasi Pendukung", placeholder: "Isikan rincian deskripsi atau poin-poin...", type: "textarea" },
        { id: "contact_info", label: "Kontak & Lokasi", placeholder: "Isikan detail kontak, logo, atau alamat...", type: "input" },
        { id: "notes", label: "Catatan Warna & Elemen", placeholder: "Catatan gaya visual kustom...", type: "textarea" }
    ]
};

const colorPalettes = [
    { label: "🟢 Emerald & Gold", value: "Nuansa Hijau Emerald, Aksen Emas Metalik, Krem Off-White" },
    { label: "🔵 Navy Corporate", value: "Biru Navy Korporat, Aksen Cyan/Biru Muda, Putih Bersih" },
    { label: "🖤 Black & Gold Foil", value: "Hitam Matte/Dark Charcoal, Font & Border Emas Embossed" },
    { label: "🔴 Red & White Bold", value: "Merah Bold, Putih Bersih, Aksen Hitam Kontras Tinggi" },
    { label: "🟣 Purple Gradient", value: "Ungu Gradient Modern, Aksen Magenta & Putih Soft" },
    { label: "⚪ Minimalist Mono", value: "Monokrom Hitam Putih, Minimalis, Clean Grey Textures" }
];
