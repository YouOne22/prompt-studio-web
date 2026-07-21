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

// Fungsi memasukkan warna saat chip diklik
function applyColorPalette(colorValue, btnEl) {
    const notesInput = document.getElementById('field_notes');
    if (notesInput) {
        notesInput.value = colorValue;
    }

    // Highlight tombol warna yang aktif
    document.querySelectorAll('.color-chip').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'border-indigo-400', 'text-white');
        btn.classList.add('bg-[#1a1d2e]', 'border-gray-700', 'text-gray-300');
    });

    btnEl.classList.remove('bg-[#1a1d2e]', 'border-gray-700', 'text-gray-300');
    btnEl.classList.add('bg-indigo-600', 'border-indigo-400', 'text-white');
}

// Render Form Dinamis + Quick Color Chips
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

        // Jika ini field catatan, sisipkan Quick Color Palette Chips di atasnya
        if (field.id === "notes") {
            const colorContainer = document.createElement('div');
            colorContainer.className = "mb-2.5";
            
            const colorLabel = document.createElement('span');
            colorLabel.className = "block text-[11px] text-gray-400 mb-1.5 font-medium";
            colorLabel.innerText = "⚡ Quick Color Palette (Klik untuk warna instan):";
            colorContainer.appendChild(colorLabel);

            const chipWrapper = document.createElement('div');
            chipWrapper.className = "flex flex-wrap gap-1.5";

            colorPalettes.forEach(palette => {
                const chip = document.createElement('button');
                chip.type = "button";
                chip.className = "color-chip text-[11px] px-2.5 py-1 rounded-md border border-gray-700 bg-[#1a1d2e] text-gray-300 hover:border-indigo-500 hover:text-white transition cursor-pointer";
                chip.innerText = palette.label;
                chip.onclick = () => applyColorPalette(palette.value, chip);
                chipWrapper.appendChild(chip);
            });

            colorContainer.appendChild(chipWrapper);
            wrapper.appendChild(colorContainer);
        }

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
