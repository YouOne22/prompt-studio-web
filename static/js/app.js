function updateSubStyles() {
    const designType = document.getElementById('designTypeSelect').value;
    const subStyleSelect = document.getElementById('subStyleSelect');
    subStyleSelect.innerHTML = "";
    (subStyleOptions[designType] || ["Lainnya"]).forEach(opt => {
        subStyleSelect.add(new Option(opt, opt));
    });
}

function updateSizes() {
    const designType = document.getElementById('designTypeSelect').value;
    const sizeSelect = document.getElementById('sizeSelect');
    sizeSelect.innerHTML = "";
    (sizePresetOptions[designType] || ["Custom..."]).forEach(opt => {
        sizeSelect.add(new Option(opt, opt));
    });
    toggleCustomSizeInput();
}

function toggleCustomSizeInput() {
    const isCustom = document.getElementById('sizeSelect').value === "Custom...";
    document.getElementById('customSizeContainer').classList.toggle('hidden', !isCustom);
}

// Fungsi Utama Render Form Dinamis di Area Tengah
function renderDynamicForm() {
    const designType = document.getElementById('designTypeSelect').value;
    const subStyle = document.getElementById('subStyleSelect').value;
    const key = `${designType}_${subStyle}`;
    const fields = formSchemas[key] || formSchemas["DEFAULT"];
    
    const container = document.getElementById('dynamicFormContainer');
    container.innerHTML = "";

    fields.forEach(field => {
        const wrapper = document.createElement('div');
        wrapper.className = "mb-4";

        const label = document.createElement('label');
        label.className = "block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2";
        label.innerText = field.label;

        let input;
        if (field.type === "textarea") {
            input = document.createElement('textarea');
            input.rows = 3;
            input.className = "w-full bg-[#0d0f17] border border-gray-700 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none";
        } else {
            input = document.createElement('input');
            input.type = "text";
            input.className = "w-full bg-[#0d0f17] border border-gray-700 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500";
        }

        input.id = `field_${field.id}`;
        input.dataset.label = field.label;
        input.placeholder = field.placeholder;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
    });
}

function onSidebarChange() {
    updateSubStyles();
    updateSizes();
    renderDynamicForm();
}

function onSubStyleChange() {
    renderDynamicForm();
}

document.addEventListener("DOMContentLoaded", () => {
    onSidebarChange();
});

// Mengumpulkan Seluruh Data Form dan Mengirim ke Backend
async function generatePrompt() {
    const designType = document.getElementById('designTypeSelect').value;
    const subStyle = document.getElementById('subStyleSelect').value;
    const orientation = document.getElementById('orientationSelect').value;
    let selectedSize = document.getElementById('sizeSelect').value;
    if (selectedSize === "Custom...") {
        selectedSize = document.getElementById('customSizeInput').value.trim() || "Custom Size";
    }
    const renderMode = document.getElementById('renderModeSelect').value;
    const tone = document.getElementById('toneSelect').value;
    const targetAi = document.getElementById('targetAiSelect').value;

    // Kumpulkan seluruh isian dari form dinamis di tengah
    const dynamicFields = document.querySelectorAll('#dynamicFormContainer [id^="field_"]');
    let collectedDetails = [];
    dynamicFields.forEach(field => {
        if (field.value.trim() !== "") {
            collectedDetails.push(`${field.dataset.label}: ${field.value.trim()}`);
        }
    });

    const detailsString = collectedDetails.join("\n");
    const output = document.getElementById('outputResult');
    const btn = document.getElementById('generateBtn');

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Meracik Brief Visual...`;
    output.value = "Sedang menyusun brief master anti-AI look...";

    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                design_type: designType, 
                sub_style: subStyle, 
                orientation,
                size: selectedSize, 
                render_mode: renderMode, 
                tone, 
                target_ai: targetAi, 
                details: detailsString
            })
        });

        const data = await res.json();
        output.value = res.ok ? data.prompt : "Error: " + (data.detail || "Gagal memproses.");
    } catch (err) {
        output.value = "Error Koneksi: " + err.message;
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-bolt"></i> Generate Optimised Prompt`;
    }
}

function copyToClipboard() {
    const output = document.getElementById('outputResult');
    if (!output.value) return;
    output.select();
    document.execCommand('copy');
    alert('Brief Prompt berhasil disalin!');
}
