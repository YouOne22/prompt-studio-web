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
