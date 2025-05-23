    const nomorPanitia = "6287701330823"; // Ganti dengan nomor panitia yang benar
    let pesertaCount = 0;
    let sekolahList = [];

    // Fungsi menampilkan toast
    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.className = "show";
      setTimeout(() => {
        toast.className = toast.className.replace("show", "");
      }, 3000);
    }

    // Fungsi validasi input angka dan tampilkan peringatan jika gagal
    function validateNumberInput(inputElem, errorMessage) {
      inputElem.addEventListener("input", () => {
        const val = inputElem.value;
        if (val !== "" && !/^\d*$/.test(val)) {
          showToast(errorMessage);
          // hapus karakter terakhir yang bukan angka
          inputElem.value = val.replace(/\D/g, "");
        }
      });
    }

    // Fungsi autocomplete untuk nama sekolah
    function autocomplete(input) {
      closeAllLists();
      if (!input.value) return false;
      const val = input.value.toLowerCase();

      // buat container autocomplete
      const listDiv = document.createElement("div");
      listDiv.setAttribute("id", input.id + "-autocomplete-list");
      listDiv.setAttribute("class", "autocomplete-items");
      input.parentNode.appendChild(listDiv);

      // Filter sekolah yang cocok
      const matches = sekolahList.filter(school => 
        school.toLowerCase().includes(val)
      );

      // Tampilkan maksimal 5 rekomendasi
      const maxSuggestions = 5;
      const suggestions = matches.slice(0, maxSuggestions);

      if (suggestions.length === 0) {
        listDiv.innerHTML = '';
        return;
      }

      suggestions.forEach((school) => {
        const itemDiv = document.createElement("div");
        // Highlight bagian yang match
        const matchIndex = school.toLowerCase().indexOf(val);
        const beforeMatch = school.substring(0, matchIndex);
        const matchText = school.substring(matchIndex, matchIndex + val.length);
        const afterMatch = school.substring(matchIndex + val.length);
        
        itemDiv.innerHTML = `${beforeMatch}<strong>${matchText}</strong>${afterMatch}`;
        itemDiv.addEventListener("click", function() {
          input.value = school;
          closeAllLists();
        });
        listDiv.appendChild(itemDiv);
      });
    }

    function closeAllLists(elmnt) {
      const items = document.querySelectorAll(".autocomplete-items");
      items.forEach(item => {
        if (elmnt !== item && elmnt !== item.previousSibling) {
          item.parentNode.removeChild(item);
        }
      });
    }

    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });

    // Tambah peserta baru
    function addPesertaField() {
      pesertaCount++;
      const container = document.getElementById("pesertaContainer");

      const section = document.createElement("div");
      section.classList.add("peserta-section");
      section.setAttribute("id", `peserta-${pesertaCount}`);
      section.style.position = "relative"; // agar autocomplete dropdown benar posisi

      section.innerHTML = `
        <label for="nama-${pesertaCount}">Nama:</label>
        <input type="text" name="nama[]" id="nama-${pesertaCount}" required>

        <label for="nis-${pesertaCount}">NIS (Optional):</label>
        <input type="text" name="nis[]" id="nis-${pesertaCount}">

        <label for="tanggal_lahir-${pesertaCount}">Tanggal Lahir:</label>
        <input type="date" name="tanggal_lahir[]" id="tanggal_lahir-${pesertaCount}" required>

        <label for="kelas-${pesertaCount}">Kelas:</label>
        <input type="text" name="kelas[]" id="kelas-${pesertaCount}" required>

        <label for="asal_sekolah-${pesertaCount}">Asal Sekolah:</label>
        <input type="text" name="asal_sekolah[]" id="asal_sekolah-${pesertaCount}" class="sekolah-autocomplete" required>

        <button type="button" class="remove-btn" onclick="removePesertaField(${pesertaCount})">Hapus</button>
      `;

      container.appendChild(section);

      // Pasang validasi angka untuk NIS dan kelas peserta baru
      const nisInput = section.querySelector(`input[name="nis[]"]`);
      validateNumberInput(nisInput, "NIS harus berupa angka!");

      const kelasInput = section.querySelector(`input[name="kelas[]"]`);
      validateNumberInput(kelasInput, "Kelas harus berupa angka!");

      // Pasang autocomplete untuk sekolah
      const sekolahInput = section.querySelector(".sekolah-autocomplete");
      sekolahInput.addEventListener("input", function() {
        autocomplete(this);
      });
      
      // Simpan nilai sekolah saat input berubah
      sekolahInput.addEventListener("change", function() {
        const value = this.value.trim();
        if (value && !sekolahList.includes(value)) {
          sekolahList.push(value);
        }
      });
    }

    // Hapus peserta
    function removePesertaField(id) {
      const section = document.getElementById(`peserta-${id}`);
      if (section) {
        section.remove();
        // Reset ID dan update atribut peserta yang tersisa supaya tetap berurutan
        const allSections = document.querySelectorAll(".peserta-section");
        pesertaCount = 0;
        allSections.forEach((sec) => {
          pesertaCount++;
          sec.setAttribute("id", `peserta-${pesertaCount}`);

          sec.querySelector(`input[name="nama[]"]`).id = `nama-${pesertaCount}`;
          sec.querySelector(`label[for^="nama-"]`).setAttribute("for", `nama-${pesertaCount}`);

          sec.querySelector(`input[name="nis[]"]`).id = `nis-${pesertaCount}`;
          sec.querySelector(`label[for^="nis-"]`).setAttribute("for", `nis-${pesertaCount}`);

          sec.querySelector(`input[name="tanggal_lahir[]"]`).id = `tanggal_lahir-${pesertaCount}`;
          sec.querySelector(`label[for^="tanggal_lahir-"]`).setAttribute("for", `tanggal_lahir-${pesertaCount}`);

          sec.querySelector(`input[name="kelas[]"]`).id = `kelas-${pesertaCount}`;
          sec.querySelector(`label[for^="kelas-"]`).setAttribute("for", `kelas-${pesertaCount}`);

          sec.querySelector(`input[name="asal_sekolah[]"]`).id = `asal_sekolah-${pesertaCount}`;
          sec.querySelector(`label[for^="asal_sekolah-"]`).setAttribute("for", `asal_sekolah-${pesertaCount}`);

          sec.querySelector(".remove-btn").setAttribute("onclick", `removePesertaField(${pesertaCount})`);
        });
      }
    }

    // Pasang validasi untuk kontak pendamping (hanya angka)
    const kontakPendampingInput = document.getElementById("kontak_pendamping");
    validateNumberInput(kontakPendampingInput, "Kontak Pendamping harus berupa angka!");

    // Tambah peserta awal agar tidak kosong
    addPesertaField();

    // Submit form
    document.getElementById("contestForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const form = e.target;

      const namaPendamping = form.nama_pendamping.value.trim();
      const kontakPendamping = form.kontak_pendamping.value.trim();

      // Validasi kontak pendamping wajib angka
      if (!/^\d+$/.test(kontakPendamping)) {
        showToast("Kontak Pendamping harus berupa angka!");
        return;
      }

      const pesertaSections = document.querySelectorAll(".peserta-section");
      if (pesertaSections.length === 0) {
        showToast("Minimal satu peserta harus diisi!");
        return;
      }

      // Simpan sekolah yang baru diinput ke array sekolahList (tanpa duplikat)
      pesertaSections.forEach(section => {
        const sekolahVal = section.querySelector(`input[name="asal_sekolah[]"]`).value.trim();
        if (sekolahVal && !sekolahList.includes(sekolahVal)) {
          sekolahList.push(sekolahVal);
        }
      });

      const submitPromises = [];

      // Loop tiap peserta dan submit satu per satu ke Google Sheets
      for (let i = 0; i < pesertaSections.length; i++) {
        const section = pesertaSections[i];

        const nama = section.querySelector(`input[name="nama[]"]`).value.trim();
        const nis = section.querySelector(`input[name="nis[]"]`).value.trim();
        const tanggalLahir = section.querySelector(`input[name="tanggal_lahir[]"]`).value;
        const kelas = section.querySelector(`input[name="kelas[]"]`).value.trim();
        const sekolah = section.querySelector(`input[name="asal_sekolah[]"]`).value.trim();

        // Validasi lengkap
        if (!nama || !tanggalLahir || !kelas || !sekolah) {
          showToast(`Data peserta ke-${i + 1} belum lengkap.`);
          return;
        }

        // Validasi angka untuk nis dan kelas
        if (nis && !/^\d+$/.test(nis)) {
          showToast(`NIS peserta ke-${i + 1} harus berupa angka jika diisi!`);
          return;
        }
        if (!/^\d+$/.test(kelas)) {
          showToast(`Kelas peserta ke-${i + 1} harus berupa angka!`);
          return;
        }

        const rayon = form.querySelector("#rayon").value;

        const formData = new FormData();
        formData.append("nama_pendamping", namaPendamping);
        formData.append("kontak_pendamping", kontakPendamping);
        formData.append("nama", nama);
        formData.append("nis", nis);
        formData.append("tanggal_lahir", tanggalLahir);
        formData.append("kelas", kelas);
        formData.append("asal_sekolah", sekolah);
        formData.append("rayon", rayon);

        // Kirim ke Google Apps Script
        submitPromises.push(
          fetch("https://script.google.com/macros/s/AKfycbxQdaK0C3prKweq0pfz4yfTiaW-7opschm9m7Aeov7IwNwH4Q7SYpW7ob8o7imIHBPr/exec", {
            method: "POST",
            body: formData
          })
        );
      }

      Promise.all(submitPromises)
        .then(() => {
          showToast("Semua peserta berhasil dikirim!");
          // Buat pesan WhatsApp
          let pesertaList = "";
          const pesertaSections = document.querySelectorAll(".peserta-section");
          
          pesertaSections.forEach((section, index) => {
            const nama = section.querySelector(`input[name="nama[]"]`).value.trim();
            const sekolah = section.querySelector(`input[name="asal_sekolah[]"]`).value.trim();
            pesertaList += `${index + 1}. ${nama} dari ${sekolah}\n`;
          });

          const whatsappMessage = `Halo, saya adalah ${namaPendamping}, pembimbing atau pendamping dari:\n${pesertaList}\ningin melakukan konfirmasi terkait dengan pendaftaran...`;
          
          // Encode message untuk URL WhatsApp
          const encodedMessage = encodeURIComponent(whatsappMessage);
          
          // Buka WhatsApp dengan pesan yang sudah disiapkan
          window.open(`https://wa.me/${nomorPanitia}?text=${encodedMessage}`, '_blank');

          form.reset();
          document.getElementById("pesertaContainer").innerHTML = "";
          pesertaCount = 0;
          addPesertaField();  // tambah peserta baru kosong setelah submit
        })
        .catch(error => {
          console.error(error);
          showToast("Gagal mengirim beberapa data.");
        });
    });