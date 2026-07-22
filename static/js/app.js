// ==========================================================================
// CONFIGURATION & GLOBAL STATE
// ==========================================================================
const STORAGE_KEY = "prompt_studio_saved_briefs";
let currentBase64Image = null; // Menyimpan data gambar terkompresi dalam format base64

document.addEventListener("DOMContentLoaded", function () {
    // 1. Restore API Key dari LocalStorage ke Input Header jika ada
    const savedKey = localStorage.getItem("groq_api_key");
    const keyInput = document.getElementById("groqApiKeyInput");
    if (savedKey && keyInput) {
        keyInput.value = savedKey;
    }

    // 2. Event Listener untuk Otomatis Menyimpan Key saat Ditulis di Header
    if (keyInput) {
        keyInput.addEventListener("input", function () {
            saveApiKey(this.value);
        });
    }

    // 3. Inisialisasi Tampilan Sidebar & Form Pertama Kali
    onSidebarChange();
});

function saveApiKey(val) {
    if (val && val.trim()) {
        localStorage.setItem("groq_api_key", val.trim());
    } else {
        localStorage.removeItem("groq_api_key");
    }
}

// ==========================================================================
// HELPER: KOMPRESI GAMBAR BASE64 UNTUK VISION API
// ==========================================================================
function compressImageBase64(base64Str, maxWidth = 1024, maxHeight = 1024, quality = 0.8) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
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

            // Export ke JPEG dengan kompresi kualitas
            resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(base64Str); // Fallback ke original jika gagal
    });
}

// ==========================================================================
// MANAJEMEN UPLOAD & PREVIEW GAMBAR REFERENSI (VISION)
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
        // Kompres gambar secara otomatis agar payload aman di Groq Vision API
        currentBase64Image = await compressImageBase64(rawBase64);

        document.getElementById("imagePreview").src = currentBase64Image;
        document.getElementById("imageFileName").textContent = file.name;
        document.getElementById("uploadPlaceholder").classList.add("hidden");
        document.getElementById("imagePreviewContainer").classList.remove("hidden");
    };
    reader.readAsDataURL(file);
}

function removeImage(event) {
    if (event) event.stopPropagation();
    currentBase64Image = null;
    const input = document.getElementById("imageInput");
    if (input) input.value = "";
    
    document.getElementById("imagePreview").src = "";
    document.getElementById("imageFileName").textContent = "";
    document.getElementById("uploadPlaceholder").classList.remove("hidden");
    document.getElementById("imagePreviewContainer").classList.add("hidden");
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

    // Populate Sub-Style
    subStyleSelect.innerHTML = "";
    (options.subStyles || []).forEach(style => {
        const opt = document.createElement("option");
        opt.value = style;
        opt.textContent = style;
        subStyleSelect.appendChild(opt);
    });

    // Populate Size Presets
    sizeSelect.innerHTML = "";
    (options.sizes || []).forEach(sz => {
        const opt = document.createElement("option");
        opt.value = sz;
        opt.textContent = sz;
        sizeSelect.appendChild(opt);
    });

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
// HELPER: DETEKSI MODEL VISION AKTIF DARI GROQ
// ==========================================================================
async function getActiveGroqVisionModel(apiKey) {
    try {
        const res = await fetch("https://api.groq.com/openai/v1/models", {
            headers: { "Authorization": `Bearer ${apiKey}` }
        });
        if (res.ok) {
            const data = await res.json();
            // Cari model yang memiliki kata 'vision' dan masih aktif
            const visionModels = (data.data || [])
                .map(m => m.id)
                .filter(id => id.toLowerCase().includes("vision"));
            
            if (visionModels.length > 0) {
                // Utamakan model 90b jika ada, atau ambil vision model pertama
                return visionModels.find(m => m.includes("90b")) || visionModels[0];
            }
        }
    } catch (e) {
        console.warn("Gagal mengecek daftar model Groq secara otomatis:", e);
    }
    // Fallback default jika cek API list gagal
    return "llama-3.2-90b-vision-preview";
}

// ==========================================================================
// GENERATOR ENGINE (DENGAN VERIFIKASI KODE AKSES)
// ==========================================================================
async function generatePrompt() {
    // ----------------------------------------------------------------------
    // STEP 1: VERIFIKASI KODE AKSES PENGGUNA TERLEBIH DAHULU
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

    try {
        const verifyRes = await fetch('/api/verify-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_key: accessKey })
        });

        if (!verifyRes.ok) {
            localStorage.removeItem("user_access_key"); // Hapus kunci yang tidak valid/dicabut
            alert("Akses Ditolak! Kode Akses Anda tidak valid atau telah dicabut oleh Admin.");
            return;
        }

        // Simpan kunci valid di browser
        localStorage.setItem("user_access_key", accessKey);

    } catch (err) {
        console.error("Gagal melakukan verifikasi akses:", err);
        alert("Gagal terhubung ke server untuk memverifikasi Kode Akses.");
        return;
    }

    // ----------------------------------------------------------------------
    // STEP 2: PROSES GENERATE PROMPT
    // ----------------------------------------------------------------------
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
        const customSize = document.getElementById("customSizeInput")?.value.trim();
        size = customSize !== "" ? customSize : "Kustom (Ukuran Tidak Ditentukan)";
    }

    // Mengumpulkan input dinamis terisi
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

    const imageInstruction = currentBase64Image 
        ? "\n6. GAMBAR REFERENSI DISERTAKAN: Analisis elemen visual, warna, objek, dan gaya dari gambar referensi terlampir. Integrasikan karakteristik visual tersebut ke dalam Master Prompt secara harmonis."
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
${detailsText}

=========================================
INSTRUKSI KHUSUS OPTIMASI PROMPT GAMBAR:
=========================================
1. Buat prompt gambar dalam BAHASA INGGRIS yang kaya deskripsi visual (komposisi simetris, lighting studio, ornamen berkualitas tinggi, dan skema warna harmoni).
2. Minta AI generator gambar untuk merender JUDUL UTAMA & SUB-JUDUL secara sangat jelas di dalam tanda petik ganda.
3. TATA LETAK VERTIKAL: Informasi detail acara (seperti Tanggal, Lokasi, Kontak, dll.) HARUS disusun secara VERTIKAL BERTUMPUK (stacked top-to-bottom / baris terpisah satu per satu), BUKAN berdampingan secara horizontal.
4. ATURAN KETAT HAPUS DATA KOSONG: Abaikan dan HAPUS SELURUHNYA elemen atau data yang kosong/tidak diisi di dalam brief. Jangan membuat teks dummy atau placeholder untuk data yang tidak ada.
5. Berikan HANYA teks prompt gambar akhir dalam Bahasa Inggris di dalam KODE BLOK (markdown code block) tanpa basa-basi pembuka atau penutup.${imageInstruction}`;

    // Update UI State Loading
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Menghubungkan Groq API...`;
    outputResult.value = currentBase64Image 
        ? "Sedang Mendeteksi Model Vision & Menganalisis Gambar..." 
        : "Sedang menghubungi AI Prompter Builder...";

    try {
        let apiKey = document.getElementById("groqApiKeyInput")?.value.trim() || localStorage.getItem("groq_api_key") || "";

        if (!apiKey) {
            apiKey = prompt("Masukkan Groq API Key Anda (gsk_...):");
            if (apiKey) {
                apiKey = apiKey.trim();
                saveApiKey(apiKey);
                if (document.getElementById("groqApiKeyInput")) {
                    document.getElementById("groqApiKeyInput").value = apiKey;
                }
            }
        }

        if (!apiKey) {
            throw new Error("API Key Groq kosong atau belum diisi.");
        }

        // Pilihan Model Otomatis
        let selectedModel = "llama-3.3-70b-versatile";
        if (currentBase64Image) {
            // Ambil model Vision yang BENAR-BENAR aktif di akun/API Groq Anda saat ini
            selectedModel = await getActiveGroqVisionModel(apiKey);
        }

        let userMessageContent;
        if (currentBase64Image) {
            userMessageContent = [
                { type: "text", text: metaPromptText },
                { type: "image_url", image_url: { url: currentBase64Image } }
            ];
        } else {
            userMessageContent = metaPromptText;
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [
                    {
                        role: "system",
                        content: "You are a professional Art Director. Convert design briefs into a single markdown code block image prompt in English."
                    },
                    {
                        role: "user",
                        content: userMessageContent
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
        console.error("Gagal melakukan permintaan ke Groq API:", error);
        outputResult.value = `/* [ERROR GROQ API: ${error.message}] */\n\n/* METAPROMPT LOKAL (Dapat langsung di-copy ke ChatGPT / Claude): */\n\n` + metaPromptText;
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Generate Optimised Prompt`;
    }
}

function copyToClipboard() {
    const outputResult = document.getElementById("outputResult");
    if (!outputResult || !outputResult.value.trim()) {
        alert("Belum ada teks prompt untuk disalin!");
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
    const outputResult = document.getElementById("outputResult").value;

    if (!outputResult || outputResult.includes("Menghubungkan Groq Vision API")) {
        alert("Belum ada prompt hasil generate yang bisa disimpan!");
        return;
    }

    const designType = document.getElementById("designTypeSelect").value;
    const subStyle = document.getElementById("subStyleSelect").value;
    const orientation = document.getElementById("orientationSelect").value;
    const sizeSelectVal = document.getElementById("sizeSelect").value;
    const customSizeVal = document.getElementById("customSizeInput")?.value || "";
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
        saveBtn.classList.replace("bg-emerald-600", "bg-emerald-700");

        setTimeout(() => {
            saveBtn.innerHTML = originalContent;
            saveBtn.classList.replace("bg-emerald-700", "bg-emerald-600");
        }, 1500);
    }
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
                    ${brief.title}
                </div>
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

    document.getElementById("designTypeSelect").value = brief.params.designType;
    onSidebarChange();

    document.getElementById("subStyleSelect").value = brief.params.subStyle;
    document.getElementById("orientationSelect").value = brief.params.orientation;
    document.getElementById("sizeSelect").value = brief.params.size;
    if (document.getElementById("customSizeInput")) {
        document.getElementById("customSizeInput").value = brief.params.customSize || "";
    }
    toggleCustomSizeInput();

    document.getElementById("renderModeSelect").value = brief.params.renderMode;
    document.getElementById("toneSelect").value = brief.params.tone;
    document.getElementById("targetAiSelect").value = brief.params.targetAi;

    if (brief.imageRef) {
        currentBase64Image = brief.imageRef;
        document.getElementById("imagePreview").src = currentBase64Image;
        document.getElementById("imageFileName").textContent = "Gambar Referensi Tersimpan";
        document.getElementById("uploadPlaceholder").classList.add("hidden");
        document.getElementById("imagePreviewContainer").classList.remove("hidden");
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

    document.getElementById("outputResult").value = brief.outputPrompt || "";

    closeHistoryModal();
}

function deleteBrief(id) {
    let savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedBriefs = savedBriefs.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBriefs));
    renderHistory();
}
