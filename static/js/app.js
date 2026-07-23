// ==========================================================================
// CONFIGURATION & GLOBAL STATE
// ==========================================================================
const STORAGE_KEY = "prompt_studio_saved_briefs";
let currentBase64Image = null; // Menyimpan data gambar terkompresi dalam format base64
let isGenerating = false;      // Flag pelacak status proses API

// Daftar Kunci Akses Cadangan
const LOCAL_VALID_KEYS = [
    "KEY-ADMIN-123",
    "KEY-VIP-12345",
    "PROMPT-STUDIO-2026",
    "MEMBER-SECRET-99"
];

document.addEventListener("DOMContentLoaded", function () {
    // 1. Restore API Keys dari LocalStorage ke Input Header jika ada
    const savedGroqKey = localStorage.getItem("groq_api_key");
    const groqKeyInput = document.getElementById("groqApiKeyInput");
    if (savedGroqKey && groqKeyInput) {
        groqKeyInput.value = savedGroqKey;
    }

    // Restore Gemini Key jika elemen inputnya tersedia di DOM
    const savedGeminiKey = localStorage.getItem("gemini_api_key");
    const geminiKeyInput = document.getElementById("geminiApiKeyInput");
    if (savedGeminiKey && geminiKeyInput) {
        geminiKeyInput.value = savedGeminiKey;
    }

    // 2. Event Listener untuk Otomatis Menyimpan Groq Key saat Ditulis
    if (groqKeyInput) {
        groqKeyInput.addEventListener("input", function () {
            saveGroqApiKey(this.value);
        });
    }

    // Event Listener untuk Gemini Key (Jika ada input khusus di HTML)
    if (geminiKeyInput) {
        geminiKeyInput.addEventListener("input", function () {
            saveGeminiApiKey(this.value);
        });
    }

    // 3. Inisialisasi Tampilan Sidebar & Form Pertama Kali
    onSidebarChange();
});

function saveGroqApiKey(val) {
    if (val && val.trim()) {
        localStorage.setItem("groq_api_key", val.trim());
    } else {
        localStorage.removeItem("groq_api_key");
    }
}

function saveGeminiApiKey(val) {
    if (val && val.trim()) {
        localStorage.setItem("gemini_api_key", val.trim());
    } else {
        localStorage.removeItem("gemini_api_key");
    }
}

// Helper Sanitasi Teks untuk Mencegah Broken HTML / XSS
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================================================
// HELPER: KOMPRESI GAMBAR BASE64 UNTUK VISION API
// ==========================================================================
function compressImageBase64(base64Str, maxWidth = 1024, maxHeight = 1024, quality = 0.8) {
    return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                } else {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL("image/jpeg", quality));
        };
        
        img.onerror = () => resolve(base64Str); // Fallback jika gagal
        img.src = base64Str;
    });
}

// ==========================================================================
// MANAJEMEN UPLOAD & PREVIEW GAMBAR REFERENSI
// ==========================================================================
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Silakan pilih file gambar yang valid (PNG, JPG, WEBP).");
        return;
    }

    if (file.size > 10 * 1024 * 1024) { // Batas 10MB
        alert("Ukuran file gambar terlalu besar (Maksimal 10MB).");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
        const rawBase64 = e.target.result;
        currentBase64Image = await compressImageBase64(rawBase64);

        const imgPreview = document.getElementById("imagePreview");
        const fileNameLabel = document.getElementById("imageFileName");
        const placeholder = document.getElementById("uploadPlaceholder");
        const previewContainer = document.getElementById("imagePreviewContainer");

        if (imgPreview) imgPreview.src = currentBase64Image;
        if (fileNameLabel) fileNameLabel.textContent = file.name;
        if (placeholder) placeholder.classList.add("hidden");
        if (previewContainer) previewContainer.classList.remove("hidden");
    };
    reader.onerror = function () {
        alert("Gagal membaca file gambar.");
    };
    reader.readAsDataURL(file);
}

function removeImage(event) {
    if (event) event.stopPropagation();
    currentBase64Image = null;
    const input = document.getElementById("imageInput");
    if (input) input.value = "";
    
    const imgPreview = document.getElementById("imagePreview");
    const fileNameLabel = document.getElementById("imageFileName");
    const placeholder = document.getElementById("uploadPlaceholder");
    const previewContainer = document.getElementById("imagePreviewContainer");

    if (imgPreview) imgPreview.src = "";
    if (fileNameLabel) fileNameLabel.textContent = "";
    if (placeholder) placeholder.classList.remove("hidden");
    if (previewContainer) previewContainer.classList.add("hidden");
}

// ==========================================================================
// MANAJEMEN FORM & SIDEBAR DINAMIS
// ==========================================================================
function onSidebarChange() {
    const designTypeSelect = document.getElementById("designTypeSelect");
    if (!designTypeSelect) return;

    const designType = designTypeSelect.value;
    const subStyleSelect = document.getElementById("subStyleSelect");
    const sizeSelect = document.getElementById("sizeSelect");

    const options = (typeof OPTIONS_DATA !== "undefined" && OPTIONS_DATA[designType]) 
        ? OPTIONS_DATA[designType] 
        : (typeof OPTIONS_DATA !== "undefined" && OPTIONS_DATA["Lainnya"]) 
            ? OPTIONS_DATA["Lainnya"] 
            : { subStyles: ["Umum / Standard"], sizes: ["A3", "Kustom"] };

    if (subStyleSelect) {
        subStyleSelect.innerHTML = "";
        (options.subStyles || []).forEach(style => {
            const opt = document.createElement("option");
            opt.value = style;
            opt.textContent = style;
            subStyleSelect.appendChild(opt);
        });
    }

    if (sizeSelect) {
        sizeSelect.innerHTML = "";
        (options.sizes || []).forEach(sz => {
            const opt = document.createElement("option");
            opt.value = sz;
            opt.textContent = sz;
            sizeSelect.appendChild(opt);
        });
    }

    toggleCustomSizeInput();
    onSubStyleChange();
}

function onSubStyleChange() {
    const designTypeSelect = document.getElementById("designTypeSelect");
    if (!designTypeSelect) return;

    const designType = designTypeSelect.value;
    const container = document.getElementById("dynamicFormContainer");
    if (!container) return;

    const defaultFields = [
        { id: "main_title", label: `Judul Utama ${designType}`, placeholder: "Contoh: OJO DUMEH FEST", type: "input" },
        { id: "subtitle", label: "Sub-Judul / Tema", placeholder: "Contoh: PENTAS SENI PERTUNJUKAN RAKYAT", type: "input" },
        { id: "highlights", label: "Isi Ringkas / Highlights", placeholder: "Contoh: Daftar Bintang Tamu / Menu Utama", type: "textarea" },
        { id: "datetime", label: "Waktu, Tanggal & Lokasi", placeholder: "Contoh: Minggu, 2 Agustus 2026 | Lapangan Desa Kemitir", type: "input" },
        { id: "cta", label: "Call to Action / Registrasi", placeholder: "Contoh: HTM Gratis | Hub: 0812-xxxx", type: "input" },
        { id: "organizer", label: "Penyelenggara & Sponsor", placeholder: "Contoh: Pemdes Kemitir", type: "input" }
    ];

    const fields = (typeof OPTIONS_DATA !== "undefined" && OPTIONS_DATA[designType]?.fields) 
        ? OPTIONS_DATA[designType].fields 
        : defaultFields;

    container.innerHTML = "";

    fields.forEach(field => {
        const wrapper = document.createElement("div");
        wrapper.className = "mb-3.5";

        const label = document.createElement("label");
        label.className = "block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5";
        label.textContent = field.label;

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
            input.rows = 3;
            input.className = "w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-y leading-relaxed font-sans";
        } else {
            input = document.createElement("input");
            input.type = "text";
            input.className = "w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans";
        }

        input.id = `dynamic_${field.id}`;
        input.placeholder = field.placeholder || "";
        input.setAttribute("data-label", field.label);

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
    });
}

function toggleCustomSizeInput() {
    const sizeSelect = document.getElementById("sizeSelect");
    const container = document.getElementById("customSizeContainer");
    if (!sizeSelect || !container) return;

    if (sizeSelect.value === "Kustom") {
        container.classList.remove("hidden");
    } else {
        container.classList.add("hidden");
    }
}

// ==========================================================================
// HELPER: VISION API DARI GOOGLE AI STUDIO (GEMINI 1.5 FLASH)
// ==========================================================================
async function analyzeImageWithGemini(geminiKey, base64Image) {
    // Bersihkan header Data URL jika ada
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
    
    // GANTI 'gemini-2.5-flash' MENJADI 'gemini-1.5-flash' ATAU 'gemini-2.0-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { 
                        text: "Analyze this reference image in extreme detail for a graphic design brief. Describe its overall artistic style, color palette, lighting atmosphere, layout composition, typography style, dynamic background, and key visual elements in precise English." 
                    },
                    {
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: cleanBase64
                        }
                    }
                ]
            }]
        })
    });

    if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const errMsg = errJson.error?.message || `HTTP ${response.status}`;
        throw new Error(`[Gemini Vision Error]: ${errMsg}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
        throw new Error("Gemini tidak dapat menganalisis gambar ini.");
    }

    return resultText;
}

// ==========================================================================
// GENERATOR ENGINE (MULTI-MODEL PIPELINE: GEMINI VISION -> GROQ TEXT)
// ==========================================================================
async function generatePrompt() {
    // ----------------------------------------------------------------------
    // STEP 1: VERIFIKASI KODE AKSES PENGGUNA
    // ----------------------------------------------------------------------
    let accessKey = localStorage.getItem("user_access_key");

    if (!accessKey) {
        accessKey = prompt("Masukkan Kode Akses / License Key Anda:");
        if (accessKey) {
            accessKey = accessKey.trim();
        }
    }

    if (!accessKey) {
        alert("Akses Ditolak: Anda harus memasukkan Kode Akses untuk menggunakan aplikasi.");
        return;
    }

    let isKeyValid = false;

    try {
        const verifyRes = await fetch('/api/verify-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_key: accessKey })
        });

        if (verifyRes.ok) {
            isKeyValid = true;
        } else if (verifyRes.status === 404) {
            isKeyValid = LOCAL_VALID_KEYS.includes(accessKey);
        } else {
            isKeyValid = false;
        }
    } catch (err) {
        console.warn("Server backend tidak merespons, menggunakan pengecekan lisensi lokal:", err);
        isKeyValid = LOCAL_VALID_KEYS.includes(accessKey);
    }

    if (!isKeyValid) {
        localStorage.removeItem("user_access_key");
        alert("Akses Ditolak! Kode Akses Anda tidak valid atau telah dicabut.");
        return;
    }

    localStorage.setItem("user_access_key", accessKey);

    // ----------------------------------------------------------------------
    // STEP 2: PERSIAPAN DATA FORMULIR
    // ----------------------------------------------------------------------
    const generateBtn = document.getElementById("generateBtn");
    const outputResult = document.getElementById("outputResult");

    if (!outputResult) return;

    const designType = document.getElementById("designTypeSelect")?.value || "Poster";
    const subStyle = document.getElementById("subStyleSelect")?.value || "Standard";
    const orientation = document.getElementById("orientationSelect")?.value || "Vertical";
    const renderMode = document.getElementById("renderModeSelect")?.value || "Realistic";
    const tone = document.getElementById("toneSelect")?.value || "Professional";
    const targetAi = document.getElementById("targetAiSelect")?.value || "Midjourney";

    let size = document.getElementById("sizeSelect")?.value || "A3";
    if (size === "Kustom") {
        const customSize = document.getElementById("customSizeInput")?.value.trim();
        size = customSize !== "" ? customSize : "Kustom (Ukuran Tidak Ditentukan)";
    }

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
        : "- (Tidak ada detail konten tambahan yang diisi).";

    // Set Status Loading
    isGenerating = true;
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Memproses Prompt...`;
    }

    try {
        // ------------------------------------------------------------------
        // STEP 3: MINTA API KEYS (GROQ & GEMINI JIKA ADA GAMBAR)
        // ------------------------------------------------------------------
        let groqApiKey = document.getElementById("groqApiKeyInput")?.value.trim() || localStorage.getItem("groq_api_key") || "";

        if (!groqApiKey) {
            groqApiKey = prompt("Masukkan Groq API Key Anda (gsk_...):");
            if (groqApiKey) {
                groqApiKey = groqApiKey.trim();
                saveGroqApiKey(groqApiKey);
                if (document.getElementById("groqApiKeyInput")) {
                    document.getElementById("groqApiKeyInput").value = groqApiKey;
                }
            }
        }

        if (!groqApiKey) {
            throw new Error("API Key Groq kosong atau belum diisi.");
        }

        let visualAnalysisResult = "";

        // TAHAP A: JIKA GAMBAR DIUNGGAH -> JALANKAN GOOGLE GEMINI VISION
        if (currentBase64Image) {
            outputResult.value = "Tahap 1/2: Menganalisis elemen & gaya visual gambar menggunakan Google Gemini AI...";

            let geminiApiKey = document.getElementById("geminiApiKeyInput")?.value.trim() || localStorage.getItem("gemini_api_key") || "";

            if (!geminiApiKey) {
                geminiApiKey = prompt("Masukkan Google Gemini API Key Anda (dari Google AI Studio):");
                if (geminiApiKey) {
                    geminiApiKey = geminiApiKey.trim();
                    saveGeminiApiKey(geminiApiKey);
                    if (document.getElementById("geminiApiKeyInput")) {
                        document.getElementById("geminiApiKeyInput").value = geminiApiKey;
                    }
                }
            }

            if (!geminiApiKey) {
                throw new Error("Google Gemini API Key diperlukan untuk menganalisis gambar referensi.");
            }

            // Panggil Fungsi Gemini Vision
            visualAnalysisResult = await analyzeImageWithGemini(geminiApiKey, currentBase64Image);
        }

        // TAHAP B: SUSUN METAPROMPT DAN PROSES KE GROQ API
        outputResult.value = currentBase64Image 
            ? "Tahap 2/2: Menggabungkan hasil analisis visual & meracik Master Prompt dengan Groq..." 
            : "Menghubungkan ke Groq API untuk meracik Master Prompt...";

        const imageInstructionSection = visualAnalysisResult 
            ? `\n\nANALISIS VISUAL DARI GAMBAR REFERENSI (Oleh Gemini Vision):\n${visualAnalysisResult}\n\nInstruksi Integrasi Gambar: Ambil skema warna, nuansa pencahayaan, estetika latar belakang, dan harmoni komposisi dari analisis visual gambar di atas, lalu padukan secara sempurna ke dalam Master Prompt.`
            : "";

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
${detailsText}${imageInstructionSection}

=========================================
INSTRUKSI KHUSUS OPTIMASI PROMPT GAMBAR:
=========================================
1. Buat prompt gambar dalam BAHASA INGGRIS yang kaya deskripsi visual (komposisi simetris, lighting studio, ornamen berkualitas tinggi, dan skema warna harmoni).
2. Minta AI generator gambar untuk merender JUDUL UTAMA & SUB-JUDUL secara sangat jelas di dalam tanda petik ganda.
3. TATA LETAK VERTIKAL: Informasi detail acara (seperti Tanggal, Lokasi, Kontak, dll.) HARUS disusun secara VERTIKAL BERTUMPUK (stacked top-to-bottom / baris terpisah satu per satu), BUKAN berdampingan secara horizontal.
4. ATURAN KETAT HAPUS DATA KOSONG: Abaikan dan HAPUS SELURUHNYA elemen atau data yang kosong/tidak diisi di dalam brief. Jangan membuat teks dummy atau placeholder untuk data yang tidak ada.
5. Berikan HANYA teks prompt gambar akhir dalam Bahasa Inggris di dalam KODE BLOK (markdown code block) tanpa basa-basi pembuka atau penutup.`;

        // ------------------------------------------------------------------
        // STEP 4: KIRIMKAN PROMPT TERSTRUKTUR KE GROQ (LLAMA 3.3 70B)
        // ------------------------------------------------------------------
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional Art Director. Convert design briefs into a single markdown code block image prompt in English."
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
            const errMsg = errJson.error?.message || `HTTP status ${response.status}`;
            if (response.status === 401) {
                localStorage.removeItem("groq_api_key");
            }
            throw new Error(`[GROQ API ERROR ${response.status}]: ${errMsg}`);
        }

        const data = await response.json();
        const aiResult = data.choices[0]?.message?.content;

        if (aiResult) {
            outputResult.value = aiResult;
        } else {
            throw new Error("Groq merespons dengan konten kosong.");
        }

    } catch (error) {
        console.error("Gagal melakukan permintaan API Pipeline:", error);
        outputResult.value = `/* [ERROR PIPELINE: ${error.message}] */\n\n/* METAPROMPT LOKAL (Dapat langsung di-copy ke ChatGPT / Claude): */\n\n` + (typeof metaPromptText !== 'undefined' ? metaPromptText : "");
    } finally {
        isGenerating = false;
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Generate Optimised Prompt`;
        }
    }
}

function copyToClipboard() {
    const outputResult = document.getElementById("outputResult");
    if (!outputResult || !outputResult.value.trim() || isGenerating) {
        alert("Belum ada teks prompt hasil generate untuk disalin!");
        return;
    }

    navigator.clipboard.writeText(outputResult.value).then(() => {
        alert("Prompt berhasil disalin ke clipboard!");
    }).catch(() => {
        outputResult.select();
        document.execCommand("copy");
        alert("Prompt berhasil disalin!");
    });
}

// ==========================================================================
// FITUR SIMPAN & RIWAYAT BRIEF
// ==========================================================================
function saveCurrentBrief() {
    const outputResultElem = document.getElementById("outputResult");
    const outputResult = outputResultElem ? outputResultElem.value : "";

    if (isGenerating || !outputResult.trim() || outputResult.startsWith("Sedang ") || outputResult.startsWith("Tahap ")) {
        alert("Belum ada prompt hasil generate yang valid untuk disimpan!");
        return;
    }

    const designType = document.getElementById("designTypeSelect")?.value || "Desain";
    const subStyle = document.getElementById("subStyleSelect")?.value || "";
    const orientation = document.getElementById("orientationSelect")?.value || "";
    const sizeSelectVal = document.getElementById("sizeSelect")?.value || "";
    const customSizeVal = document.getElementById("customSizeInput")?.value || "";
    const renderMode = document.getElementById("renderModeSelect")?.value || "";
    const tone = document.getElementById("toneSelect")?.value || "";
    const targetAi = document.getElementById("targetAiSelect")?.value || "";

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
        imageRef: currentBase64Image,
        outputPrompt: outputResult
    };

    const savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedBriefs.unshift(newBrief);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBriefs));

    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        const originalContent = saveBtn.innerHTML;
        saveBtn.innerHTML = `<i class="fa-solid fa-check"></i> Tersimpan`;
        saveBtn.classList.add("bg-emerald-700");

        setTimeout(() => {
            saveBtn.innerHTML = originalContent;
            saveBtn.classList.remove("bg-emerald-700");
        }, 1500);
    }
}

function openHistoryModal() {
    renderHistory();
    const modal = document.getElementById("historyModal");
    if (modal) modal.classList.remove("hidden");
}

function closeHistoryModal() {
    const modal = document.getElementById("historyModal");
    if (modal) modal.classList.add("hidden");
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    if (!historyList) return;

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
                <div class="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    ${brief.imageRef ? '<i class="fa-solid fa-image text-indigo-400 text-[11px]"></i>' : ''}
                    ${escapeHtml(brief.title)}
                </div>
                <div class="text-[10px] text-gray-400 flex items-center gap-1.5 flex-wrap">
                    <span class="bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-700/50">${escapeHtml(brief.params.designType)}</span>
                    <span class="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">${escapeHtml(brief.params.targetAi)}</span>
                    <span>• ${escapeHtml(brief.date)}</span>
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

    const designTypeSelect = document.getElementById("designTypeSelect");
    if (designTypeSelect) {
        designTypeSelect.value = brief.params.designType;
        onSidebarChange();
    }

    const subStyleSelect = document.getElementById("subStyleSelect");
    if (subStyleSelect) subStyleSelect.value = brief.params.subStyle;

    const orientationSelect = document.getElementById("orientationSelect");
    if (orientationSelect) orientationSelect.value = brief.params.orientation;

    const sizeSelect = document.getElementById("sizeSelect");
    if (sizeSelect) sizeSelect.value = brief.params.size;

    const customSizeInput = document.getElementById("customSizeInput");
    if (customSizeInput) customSizeInput.value = brief.params.customSize || "";
    
    toggleCustomSizeInput();

    const renderModeSelect = document.getElementById("renderModeSelect");
    if (renderModeSelect) renderModeSelect.value = brief.params.renderMode;

    const toneSelect = document.getElementById("toneSelect");
    if (toneSelect) toneSelect.value = brief.params.tone;

    const targetAiSelect = document.getElementById("targetAiSelect");
    if (targetAiSelect) targetAiSelect.value = brief.params.targetAi;

    if (brief.imageRef) {
        currentBase64Image = brief.imageRef;
        const imgPreview = document.getElementById("imagePreview");
        const fileNameLabel = document.getElementById("imageFileName");
        const placeholder = document.getElementById("uploadPlaceholder");
        const previewContainer = document.getElementById("imagePreviewContainer");

        if (imgPreview) imgPreview.src = currentBase64Image;
        if (fileNameLabel) fileNameLabel.textContent = "Gambar Referensi Tersimpan";
        if (placeholder) placeholder.classList.add("hidden");
        if (previewContainer) previewContainer.classList.remove("hidden");
    } else {
        removeImage();
    }

    if (brief.dynamicFields) {
        for (const [fieldId, val] of Object.entries(brief.dynamicFields)) {
            const inputElem = document.getElementById(fieldId);
            if (inputElem) {
                inputElem.value = val;
            }
        }
    }

    const outputResult = document.getElementById("outputResult");
    if (outputResult) outputResult.value = brief.outputPrompt || "";

    closeHistoryModal();
}

function deleteBrief(id) {
    let savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedBriefs = savedBriefs.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBriefs));
    renderHistory();
}
