const OPTIONS_DATA = {
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
            { id: "namaUsaha", label: "Judul Utama / Nama Acara / Nama Usaha", type: "text", placeholder: "Contoh: Peringatan Isra Mi'raj / PENTAS SENI BUDAYA / Toko Maju Jaya" },
            { id: "tagline", label: "Sub-Judul / Tema / Slogan Promosi", type: "text", placeholder: "Contoh: Meneladani Akhlak Nabi / Semarak Malam Puncak Kemerdekaan / Diskon 50%" },
            { id: "layanan", label: "Detail Acara / Penceramah / Poin Informasi / Produk", type: "textarea", placeholder: "Contoh:\n- Penceramah: KH. Ahmad\n- Pengisi Acara: Tari Tradisional, Campursari\n- Menjual: Sembako, Pulsa, Alat Tulis" },
            { id: "kontak", label: "Waktu, Tanggal, Lokasi & Kontak (WA/HP)", type: "text", placeholder: "Contoh: Sabtu, 15 April 2026 | Masjid Agung | WA: 0812-3456-7890" },
            { id: "penyelenggara", label: "Penyelenggara / Logo / Sponsor (Opsional)", type: "text", placeholder: "Contoh: DKM Masjid Agung, Karang Taruna, Didukung oleh Bank X" },
            { id: "warna", label: "Preferensi Warna & Nuansa Visual (Opsional)", type: "text", placeholder: "Contoh: Hijau Islami & Gold / Merah Putih & Logo Garuda / Biru Modern" },
            { id: "catatanKhusus", label: "Catatan Tambahan / Pesan Khusus AI (Opsional)", type: "textarea", placeholder: "Contoh: Berikan space kosong di sebelah kanan untuk foto pembicara / panggung utama..." }
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
            { id: "namaUsaha", label: "Judul Utama Panggung / Nama Acara", type: "text", placeholder: "Contoh: MALAM PUNCAK PERINGATAN HUT RI KE-81 / WISUDA PURNAWIYATA" },
            { id: "tagline", label: "Sub-Judul / Tema Utama Panggung", type: "text", placeholder: "Contoh: Nusantara Baru Indonesia Maju / Melangkah Mantap Menuju Masa Depan" },
            { id: "layanan", label: "Pengisi Acara / Bintang Tamu / Agenda Utama", type: "textarea", placeholder: "Contoh:\n- Pertunjukan Tari Kolosal\n- Musik Organ Tunggal\n- Penyerahan Hadiah Lomba" },
            { id: "kontak", label: "Waktu, Tanggal & Lokasi Acara", type: "text", placeholder: "Contoh: Minggu, 17 Agustus 2026 | Panggung Utama Lapangan Merdeka" },
            { id: "penyelenggara", label: "Penyelenggara / Logo / Sponsor", type: "text", placeholder: "Contoh: Pemerintah Desa, Karang Taruna Tunas Muda" },
            { id: "warna", label: "Preferensi Warna & Aesthetic Panggung", type: "text", placeholder: "Contoh: Nuansa Merah Putih Megah / Nuansa Jawa Klasik Batik Gold / Neon Cyberpunk" },
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
            { id: "subJudul", label: "Sub-Judul / Tema Utama", type: "text", placeholder: "Contoh: Menjaga Tradisi di Era Digital" },
            { id: "poinPenting", label: "Isi Ringkas / Highlights / Pemateri", type: "textarea", placeholder: "Contoh:\n1. Syarat Pendaftaran\n2. Bintang Tamu / Keynote Speaker\n3. Fasilitas Peserta" },
            { id: "tanggalLokasi", label: "Waktu, Tanggal & Lokasi", type: "text", placeholder: "Contoh: Sabtu, 15 Agustus 2026 @ Hall A Jakarta" },
            { id: "callToAction", label: "Call To Action / Registrasi & HTM", type: "text", placeholder: "Contoh: HTM Gratis | Daftar di www.website.com | Hub: 0812-xxx" },
            { id: "penyelenggara", label: "Penyelenggara & Sponsor", type: "text", placeholder: "Contoh: Panitia Hari Besar Islam & BEM Universitas X" },
            { id: "warna", label: "Preferensi Warna & Style Visual", type: "text", placeholder: "Contoh: Dark Mode dengan aksen Gold & Neon Gold" },
            { id: "catatanKhusus", label: "Catatan Tambahan untuk AI", type: "text", placeholder: "Contoh: Buat tata letak bertema futuristik minimalis" }
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
            { id: "logoElemen", label: "Logo & Slogan Singkat", type: "text", placeholder: "Contoh: Logo di pojok kiri atas | Slogan: 'Your Digital Partner'" },
            { id: "warna", label: "Palette Warna & Nuansa Desain", type: "text", placeholder: "Contoh: Hitam Matte dengan Emas / Navy & White" }
        ]
    },
    "Kartu Nama": {
        subStyles: [
            "Bengkel",
            "Masakan",
            "Minimarket",
            "Creative",
            "Networking",
            "General",
            "Corporate",
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
            { id: "logoElemen", label: "Logo & Slogan Singkat", type: "text", placeholder: "Contoh: Logo di pojok kiri atas | Slogan: 'Your Digital Partner'" },
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
            { id: "subJudulUmum", label: "Sub-Judul / Keterangan Pendukung", type: "text", placeholder: "Contoh: Diberikan Kepada / Diskon Spesial Akhir Tahun" },
            { id: "deskripsiDetail", label: "Detail Isi Konten / Teks Utama", type: "textarea", placeholder: "Tuliskan seluruh narasi, isi teks, atau detail produk yang ingin dimasukkan ke desain..." },
            { id: "kontakUmum", label: "Kontak & Media Sosial", type: "text", placeholder: "Contoh: WA: 0812-xxx | IG: @namabrand | Website" },
            { id: "elemenWajib", label: "Elemen Visual / Logo / Gambar Wajib", type: "text", placeholder: "Contoh: Sertakan logo instansi, stempel transparan, Bingkai Emas" },
            { id: "warna", label: "Preferensi Warna & Nuansa Visual", type: "text", placeholder: "Contoh: Dominan Merah & Emas / Pastel Minimalis" },
            { id: "catatanKhusus", label: "Instruksi Khusus untuk AI", type: "textarea", placeholder: "Tuliskan instruksi tata letak atau estetika khusus yang diinginkan..." }
        ]
    }
};
