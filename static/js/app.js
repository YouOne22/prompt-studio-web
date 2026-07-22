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

    // Mengumpulkan detail dari form dinamis
    const dynamicInputs = document.querySelectorAll("#dynamicFormContainer [id^='dynamic_']");
    let detailsArr = [];

    dynamicInputs.forEach(input => {
        const val = input.value.trim();
        const label = input.getAttribute("data-label");
        if (val) {
            detailsArr.push(`• ${label}:${val}`);
        }
    });

    const detailsText = detailsArr.length > 0 ? detailsArr.join("\n") : "Tidak ada detail spesifik dikirim.";

    const payload = {
        design_type: designType,
        sub_style: subStyle,
        orientation: orientation,
        size: size,
        render_mode: renderMode,
        tone: tone,
        target_ai: targetAi,
        details: detailsText
    };

    // UI Loading state
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Meracik Prompt...`;
    outputResult.value = "Sedang meracik prompt profesional anti-AI look...";

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.status === "success") {
            outputResult.value = data.prompt;
        } else {
            outputResult.value = "Gagal memproses prompt. Silakan coba lagi.";
        }
    } catch (error) {
        console.error("Error:", error);
        outputResult.value = "Terjadi kesalahan koneksi ke server.";
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
   FITUR TAMBAHAN: SIMPAN & RIWAYAT BRIEF
   ========================================================================== */

function saveCurrentBrief() {
    const outputResult = document.getElementById("outputResult").value;

    if (!outputResult || outputResult.includes("Sedang meracik prompt")) {
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

    // Ambil nilai seluruh form dinamis
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

    // 1. Set Parameter Utama & Trigger Pembentukan Form Dinamis
    document.getElementById("designTypeSelect").value = brief.params.designType;
    onSidebarChange(); // Secara otomatis meregenerasi dropdown subStyle, size, dan form dinamis

    // 2. Set Dropdown Lainnya
    document.getElementById("subStyleSelect").value = brief.params.subStyle;
    document.getElementById("orientationSelect").value = brief.params.orientation;
    document.getElementById("sizeSelect").value = brief.params.size;
    document.getElementById("customSizeInput").value = brief.params.customSize || "";
    toggleCustomSizeInput();

    document.getElementById("renderModeSelect").value = brief.params.renderMode;
    document.getElementById("toneSelect").value = brief.params.tone;
    document.getElementById("targetAiSelect").value = brief.params.targetAi;

    // 3. Kembalikan Isian Form Dinamis
    if (brief.dynamicFields) {
        for (const [fieldId, val] of Object.entries(brief.dynamicFields)) {
            const inputElem = document.getElementById(fieldId);
            if (inputElem) {
                inputElem.value = val;
            }
        }
    }

    // 4. Kembalikan Teks Prompt Output
    document.getElementById("outputResult").value = brief.outputPrompt || "";

    // Tutup Modal
    closeHistoryModal();
}

function deleteBrief(id) {
    let savedBriefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    savedBriefs = savedBriefs.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBriefs));
    renderHistory();
}
