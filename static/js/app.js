// ==========================================================================
// OPTIONS DATA CONFIGURATION
// ==========================================================================
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
            { id: "namaUsaha", label: "Judul Utama / Nama Acara / Nama Usaha", type: "text", placeholder: "Contoh: Peringatan Isra Mi'raj / Pemdes Sukamaju / Toko Maju Jaya" },
            { id: "tagline", label: "Sub-Judul / Tema / Slogan Promosi", type: "text", placeholder: "Contoh: Meneladani Akhlak Nabi / Diskon Hingga 50% / Wujudkan Desa Digital" },
            { id: "layanan", label: "Detail Acara / Penceramah / Poin Informasi / Produk", type: "textarea", placeholder: "Contoh:\n- Penceramah: KH. Ahmad\n- Menjual: Sembako, Pulsa, Alat Tulis\n- Poin Utama Acara..." },
            { id: "kontak", label: "Waktu, Tanggal, Lokasi & Kontak (WA/HP)", type: "text", placeholder: "Contoh: Sabtu, 15 April 2026 | Masjid Agung | WA: 0812-3456-7890" },
            { id: "penyelenggara", label: "Penyelenggara / Logo / Sponsor (Opsional)", type: "text", placeholder: "Contoh: DKM Masjid Agung, Karang Taruna, Didukung oleh Bank X" },
            { id: "warna", label: "Preferensi Warna & Nuansa Visual (Opsional)", type: "text", placeholder: "Contoh: Hijau Islami & Gold / Merah Putih & Logo Garuda / Biru Modern" },
            { id: "catatanKhusus", label: "Catatan Tambahan / Pesan Khusus AI (Opsional)", type: "textarea", placeholder: "Contoh: Berikan space kosong di sebelah kanan untuk foto pembicara..." }
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

// ==========================================================================
// CONFIGURATION
// ==========================================================================
const STORAGE_KEY = "prompt_studio_saved_briefs";

document.addEventListener("DOMContentLoaded", function () {
    onSidebarChange();
});

function onSidebarChange() {
    const designType = document.getElementById("designTypeSelect").value;
    const subStyleSelect = document.getElementById("subStyleSelect");
    const sizeSelect = document.getElementById("sizeSelect");

    const data = OPTIONS_DATA[designType] || OPTIONS_DATA["Lainnya"];

    // Populate Sub-Style
    subStyleSelect.innerHTML = "";
    data.subStyles.forEach(style => {
        const opt = document.createElement("option");
        opt.value = style;
        opt.textContent = style;
        subStyleSelect.appendChild(opt);
    });

    // Populate Size Presets
    sizeSelect.innerHTML = "";
    data.sizes.forEach(sz => {
        const opt = document.createElement("option");
        opt.value = sz;
        opt.textContent = sz;
        sizeSelect.appendChild(opt);
    });

    toggleCustomSizeInput();
    onSubStyleChange();
}

function onSubStyleChange() {
    const designType = document.getElementById("designTypeSelect").value;
    const data = OPTIONS_DATA[designType] || OPTIONS_DATA["Lainnya"];
    const container = document.getElementById("dynamicFormContainer");

    container.innerHTML = "";

    data.fields.forEach(field => {
        const wrapper = document.createElement("div");
        wrapper.className = "mb-3.5";

        const label = document.createElement("label");
        label.className = "block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5";
        label.textContent = field.label;

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
            input.rows = 3;
            input.className = "w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none";
        } else {
            input = document.createElement("input");
            input.type = "text";
            input.className = "w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500";
        }

        input.id = `dynamic_${field.id}`;
        input.placeholder = field.placeholder;
        input.setAttribute("data-label", field.label);

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
    });
}

function toggleCustomSizeInput() {
    const sizeSelect = document.getElementById("sizeSelect");
    const container = document.getElementById("customSizeContainer");

    if (sizeSelect.value === "Kustom") {
        container.classList.remove("hidden");
    } else {
        container.classList.add("hidden");
    }
}

/* ==========================================================================
   HYBRID GENERATOR (OPENROUTER API PRIMARY -> LOCAL FALLBACK)
   ========================================================================== */

async function generatePrompt() {
    const generateBtn = document.getElementById("generateBtn");
    const outputResult = document.getElementById("outputResult");

    const designType = document.getElementById("designTypeSelect").value;
    const subStyle = document.getElementById("subStyleSelect").value;
    const orientation = document.getElementById("orientationSelect").value;
    const renderMode = document.getElementById("renderModeSelect").value;
    const tone = document.getElementById("toneSelect").value;
    const targetAi = document.getElementById("targetAiSelect").value;

    let size = document.getElementById("sizeSelect").value;
    if (size === "Kustom") {
        const customSize = document.getElementById("customSizeInput").value.trim();
        size = customSize !== "" ? customSize : "Kustom (Ukuran Tidak Ditentukan)";
    }

    // Mengumpulkan detail dari form dinamis (Hanya menyertakan input yang terisi)
    const dynamicInputs = document.querySelectorAll("#dynamicFormContainer [id^='dynamic_']");
    let detailsArr = [];

    dynamicInputs.forEach(input => {
        const val = input.value.trim();
        const label = input.getAttribute("data-label");
        if (val !== "") {
            detailsArr.push(`- ${label}: ${val}`);
        }
    });

    const detailsText = detailsArr.length > 0 
        ? detailsArr.join("\n") 
        : "- (Tidak ada detail konten tambahan yang diisi. JANGAN buatkan elemen teks tambahan).";

    // 1. KONTRAK META-PROMPT LOKAL
    const metaPromptText = `Anda adalah seorang Senior Art Director & Expert AI Prompt Engineer.

Tugas Anda adalah menerjemahkan brief desain cetak/grafis di bawah ini menjadi 1 MASTER PROMPT GAMBAR (dalam Bahasa Inggris) yang sangat detail, profesional, dan siap digunakan pada generator AI [${targetAi}].

=========================================
BRIEF DESAIN LENGKAP:
=========================================
• Jenis Desain        : ${designType}
• Modul / Sub-Gaya   : ${subStyle}
• Orientasi Tata Letak : ${orientation}
• Dimensi / Ukuran   : ${size}
• Mode Render Visual  : ${renderMode}
• Tone & Nuansa      : ${tone}
• Target Engine AI   : ${targetAi}

DETAIL KONTEN & ELEMEN DESAIN:
${detailsText}

=========================================
INSTRUKSI KHUSUS OPTIMASI PROMPT GAMBAR:
=========================================
1. Buat prompt gambar dalam BAHASA INGGRIS yang kaya deskripsi visual (komposisi simetris, lighting studio, ornamen berkualitas tinggi, dan skema warna harmoni).
2. Minta AI generator gambar untuk merender JUDUL UTAMA & SUB-JUDUL secara sangat jelas di dalam tanda petik ganda.
3. TATA LETAK VERTIKAL: Informasi detail acara (seperti Tanggal, Lokasi, Kontak, dll.) HARUS disusun secara VERTIKAL BERTUMPUK (stacked top-to-bottom / baris terpisah satu per satu), BUKAN berdampingan secara horizontal.
4. ATURAN KETAT HAPUS DATA KOSONG: Abaikan dan HAPUS SELURUHNYA elemen atau data yang kosong/tidak diisi di dalam brief. Jangan membuat teks dummy atau placeholder untuk data yang tidak ada.
5. Berikan HANYA teks prompt gambar akhir dalam Bahasa Inggris di dalam KODE BLOK (markdown code block) tanpa basa-basi pembuka atau penutup.`;

    // Visual Loading State
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Menghubungkan OpenRouter...`;
    outputResult.value = "Sedang menghubungi OpenRouter AI untuk meracik prompt profesional...";

    // 2. EKSEKUSI HYBRID SYSTEM
    try {
        // Ambil API Key OpenRouter dari browser
        let apiKey = localStorage.getItem("openrouter_api_key") || "";

        if (!apiKey) {
            apiKey = prompt("Masukkan apikey");
            if (apiKey) {
                apiKey = apiKey.trim();
                localStorage.setItem("openrouter_api_key", apiKey);
            }
        }

        if (!apiKey) {
            throw new Error("API Key tidak diisi.");
        }

        // Panggilan ke API OpenRouter
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": window.location.origin,
                "X-Title": "Prompt Studio",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemma-4-26b-a4b-it:free", 
                messages: [
                    {
                        role: "system",
                        content: "You are a professional Art Director. Convert design briefs into single markdown code block image prompts in English.\n\nCRITICAL RULES:\n1. OMIT MISSING DATA: Completely exclude and omit any design elements, fields, or details that are left empty or omitted in the brief. Do NOT invent placeholders or fake text for empty fields.\n2. VERTICAL LAYOUT: For event info (date, location, contact, parent names, etc.), explicitly instruct a vertically stacked layout (top-to-bottom, line-by-line / stacked blocks) instead of placing them side-by-side in a horizontal row."
                    },
                    {
                        role: "user",
                        content: metaPromptText
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            // Jika Key salah / invalid, hapus dari storage browser
            if (response.status === 401) {
                localStorage.removeItem("openrouter_api_key");
            }
            throw new Error(errJson.error?.message || `HTTP status ${response.status}`);
        }

        const data = await response.json();
        const aiResult = data.choices[0]?.message?.content;

        if (aiResult) {
            outputResult.value = aiResult;
        } else {
            throw new Error("Respons OpenRouter kosong.");
        }

    } catch (error) {
        console.warn("Panggilan OpenRouter API gagal/terkendala. Berpindah ke Fallback Lokal:", error.message);

        // FALLBACK AUTOMATIC: Jika API gagal/kendala sinyal, tampilkan Meta-Prompt lokal!
        outputResult.value = `/* [SISTEM HYBRID: API OpenRouter Offline / Perlu Key Baru] */\n/* Menampilkan Meta-Prompt Siap Tempel ke ChatGPT */\n\n` + metaPromptText;
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Generate Optimised Prompt`;
    }
}

function copyToClipboard() {
    const outputResult = document.getElementById("outputResult");
    if (!outputResult.value) return;

    outputResult.select();
    navigator.clipboard.writeText(outputResult.value).then(() => {
        alert("Prompt berhasil disalin ke clipboard!");
    }).catch(err => {
        console.error("Gagal menyalin: ", err);
    });
}

/* ==========================================================================
   FITUR SIMPAN & RIWAYAT BRIEF
   ========================================================================== */

function saveCurrentBrief() {
    const outputResult = document.getElementById("outputResult").value;

    if (!outputResult || outputResult.includes("Menghubungkan OpenRouter")) {
        alert("Belum ada prompt hasil generate yang bisa disimpan!");
        return;
    }

    const designType = document.getElementById("designTypeSelect").value;
    const subStyle = document.getElementById("subStyleSelect").value;
    const orientation = document.getElementById("orientationSelect").value;
    const sizeSelectVal = document.getElementById("sizeSelect").value;
    const customSizeVal = document.getElementById("customSizeInput").value;
    const renderMode = document.getElementById("renderModeSelect").value;
    const tone = document.getElementById("toneSelect").value;
    const targetAi = document.getElementById("targetAiSelect").value;

    const dynamicInputs = document.querySelectorAll("#dynamicFormContainer [id^='dynamic_']");
    const dynamicFields = {};
    let sampleTitle = "";

    dynamicInputs.forEach(input => {
        dynamicFields[input.id] = input.value;
        if (!sampleTitle && input.value.trim() !== "") {
            sampleTitle = input.value.trim();
        }
    });

    const displayTitle = sampleTitle ? `${designType} - ${sampleTitle}` : `${designType} (${subStyle})`;

    const newBrief = {
        id: Date.now(),
        date: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }),
        title: displayTitle,
        params: {
            designType,
            subStyle,
            orientation,
            size: sizeSelectVal,
            customSize: customSizeVal,
            renderMode,
            tone,
            targetAi
        },
        dynamicFields,
        outputPrompt: outputResult
    };

    const savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedBriefs.unshift(newBrief);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBriefs));

    const saveBtn = document.getElementById("saveBtn");
    saveBtn.innerHTML = `<i class="fa-solid fa-check"></i> Tersimpan`;
    saveBtn.classList.replace("bg-emerald-600", "bg-emerald-700");

    setTimeout(() => {
        saveBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Simpan`;
        saveBtn.classList.replace("bg-emerald-700", "bg-emerald-600");
    }, 1500);
}

function openHistoryModal() {
    renderHistory();
    document.getElementById("historyModal").classList.remove("hidden");
}

function closeHistoryModal() {
    document.getElementById("historyModal").classList.add("hidden");
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    const savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (savedBriefs.length === 0) {
        historyList.innerHTML = `
            <div class="text-center py-8 text-gray-500 text-xs">
                Belum ada brief tersimpan. Klik tombol <b>Simpan</b> setelah meng-generate prompt.
            </div>`;
        return;
    }

    historyList.innerHTML = savedBriefs.map(brief => `
        <div class="bg-[#1a1d2e] border border-gray-800 hover:border-gray-700 rounded-lg p-3 flex items-center justify-between transition gap-2">
            <div class="space-y-1 overflow-hidden">
                <div class="text-xs font-bold text-white truncate">${brief.title}</div>
                <div class="text-[10px] text-gray-400 flex items-center gap-1.5 flex-wrap">
                    <span class="bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-700/50">${brief.params.designType}</span>
                    <span class="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">${brief.params.targetAi}</span>
                    <span>• ${brief.date}</span>
                </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
                <button onclick="loadBrief(${brief.id})" class="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-md transition flex items-center gap-1">
                    <i class="fa-solid fa-arrows-rotate text-[10px]"></i> Ambil Brief
                </button>
                <button onclick="deleteBrief(${brief.id})" class="px-2 py-1 bg-red-900/40 hover:bg-red-800/60 text-red-300 text-xs rounded-md transition">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join("");
}

function loadBrief(id) {
    const savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const brief = savedBriefs.find(item => item.id === id);

    if (!brief) return;

    // 1. Set Parameter Utama
    document.getElementById("designTypeSelect").value = brief.params.designType;
    onSidebarChange();

    // 2. Set Dropdown
    document.getElementById("subStyleSelect").value = brief.params.subStyle;
    document.getElementById("orientationSelect").value = brief.params.orientation;
    document.getElementById("sizeSelect").value = brief.params.size;
    document.getElementById("customSizeInput").value = brief.params.customSize || "";
    toggleCustomSizeInput();

    document.getElementById("renderModeSelect").value = brief.params.renderMode;
    document.getElementById("toneSelect").value = brief.params.tone;
    document.getElementById("targetAiSelect").value = brief.params.targetAi;

    // 3. Kembalikan Dynamic Fields
    if (brief.dynamicFields) {
        for (const [fieldId, val] of Object.entries(brief.dynamicFields)) {
            const inputElem = document.getElementById(fieldId);
            if (inputElem) {
                inputElem.value = val;
            }
        }
    }

    // 4. Restore Output
    document.getElementById("outputResult").value = brief.outputPrompt || "";

    closeHistoryModal();
}

function deleteBrief(id) {
    let savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedBriefs = savedBriefs.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBriefs));
    renderHistory();
}
