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

function onDesignTypeChange() {
    updateSubStyles();
    updateSizes();
}

document.addEventListener("DOMContentLoaded", () => {
    onDesignTypeChange();
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
    const details = document.getElementById('detailsInput').value.trim();
    const output = document.getElementById('outputResult');
    const btn = document.getElementById('generateBtn');

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Meracik Brief Visual...`;
    output.value = "Sedang memproses brief anti-AI look...";

    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                design_type: designType, sub_style: subStyle, orientation,
                size: selectedSize, render_mode: renderMode, tone, target_ai: targetAi, details
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
