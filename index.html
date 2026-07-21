<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prompt Studio - AI Prompt Generator & Workspace</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background-color: #0d0f17;
            color: #e2e8f0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col">

    <!-- Header / Navbar -->
    <header class="border-b border-gray-800 bg-[#131622] px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="bg-indigo-600 p-2 rounded-lg text-white flex items-center justify-center">
                <i class="fa-solid fa-wand-magic-sparkles text-xl"></i>
            </div>
            <div>
                <h1 class="text-lg font-bold tracking-wide text-white">Prompt Studio</h1>
                <p class="text-xs text-gray-400">AI Prompt Generator & Visual Workspace</p>
            </div>
        </div>
        <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Server Active
        </div>
    </header>

    <!-- Main Workspace Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Left Column: Prompt Builder -->
        <section class="bg-[#131622] border border-gray-800 rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-xl">
            <div>
                <div class="flex items-center gap-2 mb-5 pb-3 border-b border-gray-800">
                    <i class="fa-solid fa-pen-to-square text-indigo-400"></i>
                    <h2 class="font-semibold text-white">Prompt Builder</h2>
                </div>

                <!-- Input: Jenis Desain -->
                <div class="mb-4">
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Jenis Desain</label>
                    <select id="designTypeSelect" onchange="onDesignTypeChange()" class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition duration-150">
                        <option value="Spanduk">Spanduk</option>
                        <option value="Poster">Poster</option>
                        <option value="Stiker">Stiker</option>
                        <option value="Kartu Nama">Kartu Nama</option>
                        <option value="Lainnya">Lainnya / Umum</option>
                    </select>
                </div>

                <!-- Input: Sub-Kategori / Gaya Desain -->
                <div class="mb-4">
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gaya Desain / Sub-Kategori</label>
                    <select id="subStyleSelect" class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition duration-150">
                        <!-- Otomatis diisi oleh JavaScript -->
                    </select>
                </div>

                <!-- Grid 2 Kolom: Orientasi & Ukuran -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <!-- Input: Orientasi -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Orientasi</label>
                        <select id="orientationSelect" class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition duration-150">
                            <option value="Landscape (Horizontal)">Landscape (Horizontal)</option>
                            <option value="Portrait (Vertikal)">Portrait (Vertikal)</option>
                            <option value="Persegi (Square - 1:1)">Persegi (Square - 1:1)</option>
                        </select>
                    </div>

                    <!-- Input: Ukuran -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ukuran</label>
                        <select id="sizeSelect" onchange="toggleCustomSizeInput()" class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition duration-150">
                            <!-- Otomatis diisi oleh JavaScript -->
                        </select>
                    </div>
                </div>

                <!-- Input Kustom Ukuran (Conditional Input) -->
                <div id="customSizeContainer" class="mb-4 hidden">
                    <label class="block text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Isi Ukuran Kustom Anda</label>
                    <input type="text" id="customSizeInput" placeholder="Contoh: 150 x 80 cm, 2500 x 1080 px, dll." class="w-full bg-[#1a1d2e] border border-indigo-500/60 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition duration-150">
                </div>

                <!-- Input: Gaya Bahasa / Tone -->
                <div class="mb-4">
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gaya Bahasa / Tone</label>
                    <select id="toneSelect" class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition duration-150">
                        <option value="Professional & Persuasif">Professional & Persuasif</option>
                        <option value="Kreatif & Naratif">Kreatif & Naratif</option>
                        <option value="Kasual & Ramah">Kasual & Ramah</option>
                        <option value="Teknis & Detail">Teknis & Detail</option>
                    </select>
                </div>

                <!-- Input: Target AI Platform -->
                <div class="mb-4">
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Target AI Platform</label>
                    <select id="targetAiSelect" class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition duration-150">
                        <option value="ChatGPT">ChatGPT (OpenAI)</option>
                        <option value="Claude">Claude (Anthropic)</option>
                        <option value="Gemini">Gemini (Google)</option>
                        <option value="Midjourney">Midjourney / Image Generator</option>
                    </select>
                </div>

                <!-- Input: Detail Tambahan / Instruksi Khusus -->
                <div class="mb-5">
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Detail Tambahan / Instruksi Khusus</label>
                    <textarea id="detailsInput" rows="3" placeholder="Masukkan konteks spesifik, warna utama, nama brand, target audiens, atau spesifikasi khusus..." class="w-full bg-[#1a1d2e] border border-gray-700/80 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition duration-150 resize-none"></textarea>
                </div>
            </div>

            <!-- Submit Button -->
            <button onclick="generatePrompt()" class="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                <i class="fa-solid fa-bolt"></i> Generate Optimised Prompt
            </button>
        </section>

        <!-- Right Column: Output Result -->
        <section class="bg-[#131622] border border-gray-800 rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-xl">
            <div class="flex-1 flex flex-col">
                <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-terminal text-emerald-400"></i>
                        <h2 class="font-semibold text-white">Output Result</h2>
                    </div>
                    <button onclick="copyToClipboard()" class="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-md border border-gray-700 transition duration-150 flex items-center gap-1.5">
                        <i class="fa-regular fa-copy"></i> Salin
                    </button>
                </div>

                <!-- Output Display Textarea -->
                <div class="flex-1 relative">
                    <textarea id="outputResult" readonly placeholder="Hasil Master Prompt yang dioptimasi akan muncul di sini..." class="w-full h-full min-h-[400px] bg-[#0a0c12] border border-gray-800 rounded-lg p-4 font-mono text-sm text-emerald-400 placeholder-gray-600 focus:outline-none resize-none leading-relaxed"></textarea>
                </div>
            </div>
        </section>

    </main>

    <!-- Client-Side JavaScript Logic -->
    <script>
        // Data relasi sub-gaya berdasarkan jenis desain
        const subStyleOptions = {
            "Spanduk": [
                "Formal (Rapat, Resmi, dan Lain-lain)",
                "Pengajian / Keagamaan",
                "Pengumuman / Informasi Publik",
                "Promosi Produk / Iklan Bisnis",
                "Lainnya"
            ],
            "Poster": [
                "Formal (Rapat, Resmi, dan Lain-lain)",
                "Pengajian / Keagamaan",
                "Pengumuman / Informasi Publik",
                "Promosi Produk / Iklan Bisnis",
                "Lainnya"
            ],
            "Stiker": [
                "Formal / Pelabelan Produk",
                "Pengajian / Komunitas",
                "Pengumuman / Kampanye",
                "Promosi / Merchandise Bisnis",
                "Lainnya"
            ],
            "Kartu Nama": [
                "Pengacara / Konsultan Hukum",
                "Bengkel / Otomotif & Modifikasi",
                "Perusahaan / Korporat Profesional",
                "Kreatif / Freelancer",
                "Lainnya"
            ],
            "Lainnya": [
                "Umum / Kustom Bebas",
                "Lainnya"
            ]
        };

        // Data relasi preset ukuran berdasarkan jenis desain
        const sizePresetOptions = {
            "Spanduk": [
                "2 x 1 meter",
                "3 x 1 meter",
                "4 x 1 meter",
                "1 x 1 meter",
                "Custom..."
            ],
            "Poster": [
                "A4 (21 x 29.7 cm)",
                "A3 (29.7 x 42 cm)",
                "A2 (42 x 59.4 cm)",
                "A1 (59.4 x 84.1 cm)",
                "Custom..."
            ],
            "Stiker": [
                "5 x 5 cm",
                "7 x 7 cm",
                "10 x 10 cm",
                "A6 (10.5 x 14.8 cm)",
                "Custom..."
            ],
            "Kartu Nama": [
                "9 x 5.5 cm (Standar Indonesia)",
                "9 x 5 cm (Standar Slim)",
                "8.5 x 5.5 cm (Standar Eropa)",
                "Custom..."
            ],
            "Lainnya": [
                "1080 x 1080 px (Social Media Square)",
                "1080 x 1920 px (Instagram Story/Reels)",
                "1920 x 1080 px (Full HD Screen)",
                "Custom..."
            ]
        };

        // Fungsi memperbarui opsi Sub-Kategori
        function updateSubStyles() {
            const designType = document.getElementById('designTypeSelect').value;
            const subStyleSelect = document.getElementById('subStyleSelect');
            
            subStyleSelect.innerHTML = "";
            const options = subStyleOptions[designType] || ["Lainnya"];
            
            options.forEach(optionText => {
                const opt = document.createElement('option');
                opt.value = optionText;
                opt.textContent = optionText;
                subStyleSelect.appendChild(opt);
            });
        }

        // Fungsi memperbarui opsi Ukuran
        function updateSizes() {
            const designType = document.getElementById('designTypeSelect').value;
            const sizeSelect = document.getElementById('sizeSelect');
            
            sizeSelect.innerHTML = "";
            const options = sizePresetOptions[designType] || ["Custom..."];
            
            options.forEach(optionText => {
                const opt = document.createElement('option');
                opt.value = optionText;
                opt.textContent = optionText;
                sizeSelect.appendChild(opt);
            });

            toggleCustomSizeInput();
        }

        // Tampilkan/sembunyikan input teks kustom jika opsi "Custom..." dipilih
        function toggleCustomSizeInput() {
            const sizeSelectValue = document.getElementById('sizeSelect').value;
            const customContainer = document.getElementById('customSizeContainer');
            
            if (sizeSelectValue === "Custom...") {
                customContainer.classList.remove('hidden');
            } else {
                customContainer.classList.add('hidden');
            }
        }

        // Trigger perubahan Jenis Desain
        function onDesignTypeChange() {
            updateSubStyles();
            updateSizes();
        }

        // Inisialisasi awal saat halaman selesai dimuat
        document.addEventListener("DOMContentLoaded", () => {
            onDesignTypeChange();
        });

        // Fungsi API request ke backend FastAPI
        async function generatePrompt() {
            const designType = document.getElementById('designTypeSelect').value;
            const subStyle = document.getElementById('subStyleSelect').value;
            const orientation = document.getElementById('orientationSelect').value;
            
            // Ambil ukuran dari preset atau input kustom
            let selectedSize = document.getElementById('sizeSelect').value;
            if (selectedSize === "Custom...") {
                const customVal = document.getElementById('customSizeInput').value.trim();
                selectedSize = customVal ? customVal : "Custom Size";
            }

            const tone = document.getElementById('toneSelect').value;
            const targetAi = document.getElementById('targetAiSelect').value;
            const details = document.getElementById('detailsInput').value.trim();
            const output = document.getElementById('outputResult');
            const btn = document.querySelector('button[onclick="generatePrompt()"]');

            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Meracik Master Prompt...`;
            output.value = "Sedang memproses prompt optimal...";

            try {
                const res = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        design_type: designType, 
                        sub_style: subStyle, 
                        orientation: orientation,
                        size: selectedSize,
                        tone: tone, 
                        target_ai: targetAi, 
                        details: details 
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    output.value = data.prompt;
                } else {
                    output.value = "Error: " + (data.detail || "Gagal memproses.");
                }
            } catch (err) {
                output.value = "Error Koneksi: " + err.message;
            } finally {
                btn.disabled = false;
                btn.innerHTML = `<i class="fa-solid fa-bolt"></i> Generate Optimised Prompt`;
            }
        }

        // Fungsi Salin ke Clipboard
        function copyToClipboard() {
            const output = document.getElementById('outputResult');
            if (!output.value) return;
            
            output.select();
            document.execCommand('copy');
            alert('Prompt berhasil disalin ke clipboard!');
        }
    </script>
</body>
</html>
