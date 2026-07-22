const OPTIONS_DATA = {
    "Spanduk": {
        subStyles: [
            "Pengajian / Keagamaan / Hari Besar",
            "Spanduk Resmi / Pemerintahan / Instansi",
            "Acara Formal / Seminar / Workshop",
            "Promosi Usaha / Toko / Grand Opening",
            "Kuliner / Makanan & Minuman",
            "Selamat Datang / Ucapan / Banner",
            "Properti / Jual Beli / Sewa"
        ],
        sizes: [
            "3 x 1 Meter",
            "2 x 1 Meter",
            "4 x 1 Meter",
            "5 x 1 Meter",
            "1.5 x 0.8 Meter",
            "Kustom"
        ],
        fields: [
            { id: "namaUsaha", label: "Judul Utama / Nama Acara / Nama Usaha", type: "text", placeholder: "Contoh: Peringatan Isra Mi'raj / Pemdes Sukamaju" },
            { id: "tagline", label: "Sub-Judul / Tema / Tagline", type: "text", placeholder: "Contoh: Meneladani Akhlak Nabi / Wujudkan Desa Digital" },
            { id: "layanan", label: "Detail Acara / Penceramah / Poin Informasi", type: "textarea", placeholder: "Contoh: Penceramah: KH. Ahmad | Bintang Tamu / Poin Layanan..." },
            { id: "kontak", label: "Waktu, Lokasi & Kontak", type: "text", placeholder: "Contoh: Sabtu, 15 April 2026 | Masjid Agung | WA: 0812-xxx" },
            { id: "warna", label: "Preferensi Warna & Ornamen (Opsional)", type: "text", placeholder: "Contoh: Hijau Islami & Gold / Merah Putih & Logo Garuda" }
        ]
    },
    "Poster": {
        subStyles: [
            "Poster Edukasi / Infografis",
            "Poster Event / Konser / Pameran",
            "Poster Kebudayaan & Keagamaan",
            "Poster Produk / Iklan Commercial",
            "Poster Kampanye / Layanan Masyarakat"
        ],
        sizes: [
            "A3 (29.7 x 42 cm)",
            "A4 (21 x 29.7 cm)",
            "A2 (42 x 59.4 cm)",
            "Kustom"
        ],
        fields: [
            { id: "judulPoster", label: "Judul Utama Poster", type: "text", placeholder: "Contoh: Festival Seni & Tabligh Akbar 2026" },
            { id: "subJudul", label: "Sub-Judul / Tema Acara", type: "text", placeholder: "Contoh: Menjaga Tradisi di Era Digital" },
            { id: "tanggalLokasi", label: "Waktu, Tanggal & Lokasi", type: "text", placeholder: "Sabtu, 15 Agustus 2026 @ Hall A Jakarta" },
            { id: "poinPenting", label: "Isi Ringkas / Highlights / Pemateri", type: "textarea", placeholder: "Poin-poin informasi penting atau daftar narasumber..." },
            { id: "callToAction", label: "Call To Action / Registrasi", type: "text", placeholder: "Daftar gratis di www.website.com / Hubungi 0812-xxx" }
        ]
    },
    "Kartu Nama": {
        subStyles: [
            "Corporate & Professional",
            "Creative & Portfolio",
            "Minimalist Modern",
            "Elegant & Luxury"
        ],
        sizes: [
            "Standar Indonesia (9 x 5.5 cm)",
            "Standar US (8.9 x 5.1 cm)",
            "Persegi (6.5 x 6.5 cm)",
            "Kustom"
        ],
        fields: [
            { id: "namaLengkap", label: "Nama Lengkap & Gelar", type: "text", placeholder: "Contoh: H. Ahmad Pratama, S.T." },
            { id: "jabatan", label: "Jabatan / Profesi", type: "text", placeholder: "Contoh: Chief Executive Officer" },
            { id: "namaPerusahaan", label: "Nama Perusahaan / Lembaga", type: "text", placeholder: "Contoh: PRST Digital Solution" },
            { id: "kontakLengkap", label: "Detail Kontak (Telepon, Email, Web)", type: "textarea", placeholder: "Telp: +62812xxx\nEmail: ahmad@prst.id\nWeb: www.prst.id" },
            { id: "sosmed", label: "Media Sosial / Alamat", type: "text", placeholder: "LinkedIn: /in/ahmad | Jakarta, Indonesia" }
        ]
    },
    "Lainnya": {
        subStyles: [
            "Brosur / Flyer / Catalog",
            "Sertifikat / Piagam Penghargaan",
            "Banner Media Sosial (IG/FB)",
            "Desain Umum Kustom"
        ],
        sizes: [
            "A4 (21 x 29.7 cm)",
            "Square (1080 x 1080 px)",
            "Full HD (1920 x 1080 px)",
            "Kustom"
        ],
        fields: [
            { id: "judulUmum", label: "Judul / Topik Utama Desain", type: "text", placeholder: "Contoh: Piagam Penghargaan / Flyer Promo" },
            { id: "deskripsiDetail", label: "Detail Deskripsi Konten", type: "textarea", placeholder: "Jelaskan seluruh konten visual dan instruksi spesifik yang diinginkan..." },
            { id: "elemenWajib", label: "Elemen Visual / Logo Wajib", type: "text", placeholder: "Contoh: Sertakan logo instansi, stempel transparan, Bingkai Emas" }
        ]
    }
};
