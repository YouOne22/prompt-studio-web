const OPTIONS_DATA = {
    "Background Only": { 
        subStyles: [
            "Pengajian / Keagamaan / Hari Besar",
            "Spanduk Resmi / Pemerintahan / Instansi",
            "Acara Formal / Seminar / Workshop",
            "Promosi Usaha / Toko / Grand Opening",
            "Kuliner / Makanan & Minuman",
            "Selamat Datang / Ucapan / Banner",
            "Properti / Jual Beli / Sewa",
            "Kesenian & Budaya",
            "Kemerdekaan (17 Agustus)",
            "Musik / Konser / Festival",
            "Wisuda / Purnawiyata",
            "Keagamaan / Tabligh Akbar",
            "Hajatan / Acara Desa / Gala Dinner",
            "Abstrak / Wave / Soft Gradient",
            "3D Stage Podium / Spatial Render",
            "Minimalis / Textured Pattern"
        ],
        sizes: [
            "Spanduk Horizontal (3 x 1)",
            "Panggung Horizontal (2 x 1)",
            "Banner Standar (16 : 9)",
            "Potret / Story (9 : 16)",
            "Persegi / Square (1 : 1)",
            "Cetak A4 / Poster (3 : 4)",
            "Kustom"
        ],
        fields: [
            { id: "temaBackground", label: "Nuansa / Tema Utama Latar Belakang", type: "text", placeholder: "Contoh: Nuansa Islami Megah / Panggung Gala Dinner / Gradient Modern Corporate" },
            { id: "elemenOrnamen", label: "Elemen Visual, Motif & Ornamen Utama", type: "textarea", placeholder: "Contoh:\n- Ornamen ukiran Arab & Lentera Emas gantung\n- Sorot lampu panggung (stage spotlight) & pita merah putih\n- Wave ribbon emas dengan partikel cahaya/bokeh" },
            { id: "copySpace", label: "Penataan Area Kosong (Copy Space untuk Teks/Foto)", type: "text", placeholder: "Contoh: Sediakan area kosong bersih di bagian tengah untuk penulisan judul & foto pembicara" },
            { id: "warna", label: "Preferensi Warna Dominan & Palet", type: "text", placeholder: "Contoh: Hijau Tua & Emas / Merah Putih & Gold Trim / Dark Blue & Neon" },
            { id: "catatanKhusus", label: "Gaya Visual & Rendering AI", type: "textarea", placeholder: "Contoh: Efek pencahayaan lembut (soft lighting), depth of field, gaya 3D photorealistic, tanpa ada teks tulisan sama sekali..." }
        ]
    }, // <-- Perbaikan: Koma ditambahkan di sini
    "Logo": {
        subStyles: [
            "Minimalis & Modern Flat",
            "Mascot & Character Brand",
            "Vintage / Retro / Badge",
            "Corporate & Minimalist Lettermark",
            "Luxury / Golden Ratio / Metallic",
            "Futuristic & Geometric Tech",
            "Hand-Drawn & Signature Style"
        ],
        sizes: [
            "Persegi / Square (1 : 1)",
            "Vektor Master Format (SVG/AI)",
            "Kustom"
        ],
        fields: [
            { id: "namaBrand", label: "Nama Brand / Usaha Utama", type: "text", placeholder: "Contoh: NR.PRST Repaint & Custom" },
            { id: "taglineLogo", label: "Slogan / Sub-Teks / Tagline", type: "text", placeholder: "Contoh: Customized Part Solution" },
            { id: "bidangUsaha", label: "Bidang Usaha / Industri / Spesialisasi", type: "text", placeholder: "Contoh: Bengkel Restorasi & Pengecatan Motor, Otomotif, Gaming" },
            { id: "simbolIkon", label: "Elemen Ikon / Simbol Visual Utama", type: "textarea", placeholder: "Contoh:\n- Spray gun Pengecatan digabung dengan siluet piston\n- Huruf monogram 'NR' yang saling mengunci secara futuristik" },
            { id: "warna", label: "Preferensi Warna Utama Logo", type: "text", placeholder: "Contoh: Hitam Carbon, Emas Metallic, Metallic Blue & Silver" },
            { id: "catatanKhusus", label: "Gaya Desain & Rendering Logo", type: "textarea", placeholder: "Contoh: Isolasi logo pada latar polos (vector flat on white background), garis tegas, rasio simetris..." }
        ]
    },
    "Spanduk": {
        subStyles: [
            "Pengajian / Keagamaan / Hari Besar",
            "Spanduk Resmi / Pemerintahan / Instansi",
            "Acara Formal / Seminar / Workshop",
            "Promosi Usaha / Toko / Grand Opening",
            "Kuliner / Makanan & Minuman",
            "Selamat Datang / Ucapan / Banner",
            "Properti / Jual Beli / Sewa",
            "Kesenian & Budaya",
            "Kemerdekaan (17 Agustus)",
            "Musik / Konser / Festival",
            "Wisuda / Purnawiyata",
            "Keagamaan / Tabligh Akbar",
            "Hajatan / Acara Desa / Gala Dinner"
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
            { id: "namaUsaha", label: "Judul Utama / Nama Acara / Nama Usaha", type: "text", placeholder: "Contoh: Peringatan Isra Mi'raj / Pemdes Sukamaju / Toko Maju Jaya" },
            { id: "tagline", label: "Sub-Judul / Tema / Slogan Promosi", type: "textarea", placeholder: "Contoh:\n- Meneladani Akhlak Nabi\n- Diskon Hingga 50%\n- Wujudkan Desa Digital" },
            { id: "layanan", label: "Detail Acara / Penceramah / Poin Informasi / Produk", type: "textarea", placeholder: "Contoh:\n- Penceramah: KH. Ahmad\n- Menjual: Sembako, Pulsa, Alat Tulis\n- Poin Utama Acara..." },
            { id: "kontak", label: "Waktu, Tanggal, Lokasi & Kontak (WA/HP)", type: "text", placeholder: "Contoh: Sabtu, 15 April 2026 | Masjid Agung | WA: 0812-3456-7890" },
            { id: "penyelenggara", label: "Penyelenggara / Logo / Sponsor (Opsional)", type: "text", placeholder: "Contoh: DKM Masjid Agung, Karang Taruna, Didukung oleh Bank X" },
            { id: "warna", label: "Preferensi Warna & Nuansa Visual (Opsional)", type: "text", placeholder: "Contoh: Hijau Islami & Gold / Merah Putih & Logo Garuda / Biru Modern" },
            { id: "catatanKhusus", label: "Catatan Tambahan / Pesan Khusus AI (Opsional)", type: "textarea", placeholder: "Contoh: Berikan space kosong di sebelah kanan untuk foto pembicara..." }
        ]
    },
    "Backdrop / Banner Panggung": {
        subStyles: [
            "Kesenian & Budaya",
            "Kemerdekaan (17 Agustus)",
            "Musik / Konser / Festival",
            "Wisuda / Purnawiyata",
            "Keagamaan / Tabligh Akbar",
            "Hajatan / Acara Desa / Gala Dinner"
        ],
        sizes: [
            "3 x 2 Meter",
            "4 x 2.5 Meter",
            "5 x 3 Meter",
            "6 x 3 Meter",
            "8 x 4 Meter",
            "10 x 4 Meter",
            "Kustom"
        ],
        fields: [
            { id: "namaUsaha", label: "Judul Utama Panggung / Nama Acara", type: "text", placeholder: "Contoh: MALAM PUNCAK PERINGATAN HUT RI KE-81" },
            { id: "tagline", label: "Sub-Judul / Tema Utama Panggung", type: "textarea", placeholder: "Contoh:\n- Nusantara Baru Indonesia Maju\n- Melangkah Mantap Menuju Masa Depan" },
            { id: "layanan", label: "Pengisi Acara / Bintang Tamu / Agenda Utama", type: "textarea", placeholder: "Contoh:\n- Pertunjukan Tari Kolosal\n- Musik Organ Tunggal\n- Penyerahan Hadiah Lomba" },
            { id: "kontak", label: "Waktu, Tanggal & Lokasi Acara", type: "text", placeholder: "Contoh: Minggu, 17 Agustus 2026 | Panggung Utama Lapangan Merdeka" },
            { id: "penyelenggara", label: "Penyelenggara / Logo / Sponsor", type: "text", placeholder: "Contoh: Pemerintah Desa, Karang Taruna Tunas Muda" },
            { id: "warna", label: "Preferensi Warna & Aesthetic Panggung", type: "text", placeholder: "Contoh: Nuansa Merah Putih Megah / Nuansa Jawa Klasik Batik Gold" },
            { id: "catatanKhusus", label: "Catatan Tambahan untuk AI", type: "textarea", placeholder: "Contoh: Buat latar belakang dengan tata lampu panggung pencahayaan sorot (stage spotlight) yang dramatis..." }
        ]
    },
    "Poster": {
        subStyles: [
            "Poster Edukasi / Infografis",
            "Poster Event / Konser / Pameran",
            "Poster Kebudayaan & Keagamaan",
            "Poster Kemerdekaan / Panggung / Lomba 17-an",
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
            { id: "subJudul", label: "Sub-Judul / Tema Utama", type: "textarea", placeholder: "Contoh:\n- Menjaga Tradisi di Era Digital\n- Mewujudkan Generasi Muda Unggul" },
            { id: "poinPenting", label: "Isi Ringkas / Highlights / Pemateri", type: "textarea", placeholder: "Contoh:\n1. Syarat Pendaftaran\n2. Bintang Tamu / Keynote Speaker\n3. Fasilitas Peserta" },
            { id: "tanggalLokasi", label: "Waktu, Tanggal & Lokasi", type: "text", placeholder: "Contoh: Sabtu, 15 Agustus 2026 @ Hall A Jakarta" },
            { id: "callToAction", label: "Call To Action / Registrasi & HTM", type: "text", placeholder: "Contoh: HTM Gratis | Daftar di www.website.com | Hub: 0812-xxx" },
            { id: "penyelenggara", label: "Penyelenggara & Sponsor", type: "text", placeholder: "Contoh: Panitia Hari Besar Islam & BEM Universitas X" },
            { id: "warna", label: "Preferensi Warna & Style Visual", type: "text", placeholder: "Contoh: Dark Mode dengan aksen Gold & Neon Gold" },
            { id: "catatanKhusus", label: "Catatan Tambahan untuk AI", type: "textarea", placeholder: "Contoh: Buat tata letak bertema futuristik minimalis" }
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
            { id: "jabatan", label: "Jabatan / Profesi / Spesialisasi", type: "text", placeholder: "Contoh: Chief Executive Officer / Graphic Designer" },
            { id: "namaPerusahaan", label: "Nama Perusahaan / Brand / Lembaga", type: "text", placeholder: "Contoh: PRST Digital Solution" },
            { id: "kontakLengkap", label: "Detail Kontak (Telepon, WA & Email)", type: "textarea", placeholder: "Telp/WA: +62 812-3456-7890\nEmail: ahmad@prst.id" },
            { id: "sosmed", label: "Website, Media Sosial & Alamat", type: "text", placeholder: "Web: www.prst.id | IG: @prst.id | Jakarta, Indonesia" },
            { id: "logoElemen", label: "Logo & Slogan Singkat", type: "text", placeholder: "Contoh: Logo di pojok kanan atas | Slogan: 'Your Digital Partner'" },
            { id: "warna", label: "Palette Warna & Nuansa Desain", type: "text", placeholder: "Contoh: Hitam Matte dengan Emas / Navy & White" }
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
            { id: "judulUmum", label: "Judul / Topik Utama Desain", type: "text", placeholder: "Contoh: Piagam Penghargaan / Flyer Promo Bulanan" },
            { id: "subJudulUmum", label: "Sub-Judul / Keterangan Pendukung", type: "textarea", placeholder: "Contoh:\n- PERAYAAN YAA QAWIYYU (SEBARAN APEM)\n- Keterangan Tambahan Baris Kedua" },
            { id: "deskripsiDetail", label: "Detail Isi Konten / Teks Utama", type: "textarea", placeholder: "Tuliskan seluruh narasi, isi teks, atau detail produk yang ingin dimasukkan ke desain..." },
            { id: "kontakUmum", label: "Kontak & Media Sosial", type: "text", placeholder: "Contoh: WA: 0812-xxx | IG: @namabrand | Website" },
            { id: "elemenWajib", label: "Elemen Visual / Logo / Gambar Wajib", type: "text", placeholder: "Contoh: Sertakan logo instansi, stempel transparan, Bingkai Emas" },
            { id: "warna", label: "Preferensi Warna & Nuansa Visual", type: "text", placeholder: "Contoh: Dominan Merah & Emas / Pastel Minimalis" },
            { id: "catatanKhusus", label: "Instruksi Khusus untuk AI", type: "textarea", placeholder: "Tuliskan instruksi tata letak atau estetika khusus yang diinginkan..." }
        ]
    }
};
