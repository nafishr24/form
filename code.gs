// ini adalah code yang harus dituli di google sheet agar bisa menyambung html dan sheet

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Formulir") || ss.insertSheet("Formulir");

  // Header otomatis dibuat jika sheet kosong
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Nama Pendamping", "Kontak Pendamping", "Rayon", "Nama Peserta", "NIS", "Tanggal Lahir", "Kelas", "Asal Sekolah"]);
  }

  const data = {
    timestamp: new Date(),
    namaPendamping: e.parameter.nama_pendamping || "",
    kontakPendamping: e.parameter.kontak_pendamping || "",
    rayon: e.parameter.rayon || "",
    namaPeserta: e.parameter.nama || "",
    nis: e.parameter.nis || "",
    tanggalLahir: e.parameter.tanggal_lahir || "",
    kelas: e.parameter.kelas || "",
    asalSekolah: e.parameter.asal_sekolah || "",
  };

  sheet.appendRow([data.timestamp, data.namaPendamping, data.kontakPendamping, data.rayon, data.namaPeserta, data.nis, data.tanggalLahir, data.kelas, data.asalSekolah]);

  return ContentService.createTextOutput("Data berhasil disimpan.").setMimeType(ContentService.MimeType.TEXT);
}
