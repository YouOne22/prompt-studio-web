const OPTIONS_DATA = {
    "Spanduk": {
        subStyles: [
            "Promosi Usaha / Toko",
            "Event / Acara / Seminar",
            "Kuliner / Makanan & Minuman",
            "Selamat Datang / Ucapan",
            "Properti / Jual Beli"
        ],
        sizes: [
            "3 x 1 Meter",
            "2 x 1 Meter",
            "4 x 1 Meter",
            "1.5 x 0.8 Meter",
            "Kustom"
        ],
        fields: [
            { id: "namaUsaha", label: "Nama Usaha / Judul Spanduk", type: "text", placeholder: "Contoh: Warung Berkah / Grand Opening" },
            { id: "tagline", label: "Tagline / Slogan Promosi", type: "text", placeholder: "Contoh: Solusi Hemat Cepat & Berkualitas" },
            { id: "layanan", label: "Daftar Layanan / Produk Utama", type: "textarea", placeholder: "Tuliskan poin-poin layanan atau menu utama..." },
            { id: "kontak", label: "Kontak & Lokasi", type: "text", placeholder: "WA: 0812-xxx | Alamat: Jl. Merdeka No. 10" },
            { id: "warna", label: "Preferensi Warna (Opsional)", type: "text", placeholder: "Contoh: Biru Navy & Kuning Keemasan" }
        ]
    },
    "Poster": {
        subStyles: [
            "Poster Edukasi / Infografis",
            "Poster Event / Konser / Pameran",
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
            { id: "judulPoster", label: "Judul Utama Poster", type: "text", placeholder: "Contoh: Festival Seni Nusantara 2026" },
            { id: "subJudul", label: "Sub-Judul / Tema", type: "text", placeholder: "Contoh: Menjaga Tradisi di Era Digital" },
            { id: "tanggalLokasi", label: "Waktu, Tanggal & Lokasi", type: "text", placeholder: "Sabtu, 15 Agustus 2026 @ Hall A Jakarta" },
            { id: "poinPenting", label: "Isi Ringkas / Highlights", type: "textarea", placeholder: "Poin-poin informasi penting yang wajib ada..." },
            { id: "callToAction", label: "Call To Action / Registrasi", type: "text", placeholder: "Daftar sekarang di website.com" }
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
            { id: "namaLengkap", label: "Nama Lengkap & Gelar", type: "text", placeholder: "Contoh: Ahmad Pratama, S.Kom" },
            { id: "jabatan", label: "Jabatan / Profesi", type: "text", placeholder: "Contoh: Senior UI/UX Designer" },
            { id: "namaPerusahaan", label: "Nama Perusahaan / Brand", type: "text", placeholder: "Contoh: PRST Digital Solution" },
            { id: "kontakLengkap", label: "Detail Kontak (Telepon, Email, Web)", type: "textarea", placeholder: "Telp: +62812xxx\nEmail: ahmad@prst.id\nWeb: www.prst.id" },
            { id: "sosmed", label: "Media Sosial / Alamat", type: "text", placeholder: "LinkedIn: /in/ahmad | Jakarta, Indonesia" }
        ]
    },
    "Lainnya": {
        subStyles: [
            "Brosur / Flyer",
            "Sertifikat / Piagam",
            "Banner Media Sosial",
            "Desain Umum Kustom"
        ],
        sizes: [
            "A4 (21 x 29.7 cm)",
            "Square (1080 x 1080 px)",
            "Full HD (1920 x 1080 px)",
            "Kustom"
        ],
        fields: [
            { id: "judulUmum", label: "Judul / Topic Desain", type: "text", placeholder: "Contoh: Certificate of Appreciation" },
            { id: "deskripsiDetail", label: "Detail Deskripsi Konten", type: "textarea", placeholder: "Jelaskan seluruh konten visual dan instruksi spesifik yang diinginkan..." },
            { id: "elemenWajib", label: "Elemen Visual / Logo Wajib", type: "text", placeholder: "Contoh: Sertakan logo perusahaan, stempel transparan, barcode" }
        ]
    }
};
