// ini adalah code yang harus dituli di google sheet agar bisa menyambung html dan sheet

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Formulir") || ss.insertSheet("Formulir");

  // Header
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Nama Pendamping", "Kontak Pendamping", "Rayon", "Nama Peserta", "NIS", "Tanggal Lahir", "Kelas", "Asal Sekolah"]);
  }

  const timestamp = new Date();
  const namaPendamping = e.parameter.nama_pendamping || "";
  const kontakPendamping = e.parameter.kontak_pendamping || "";
  const rayon = e.parameter.rayon || "";

  // Tangani array untuk peserta
  const namaPeserta = e.parameter.nama || [];
  const nis = e.parameter.nis || [];
  const tanggalLahir = e.parameter.tanggal_lahir || [];
  const kelas = e.parameter.kelas || [];
  const asalSekolah = e.parameter.asal_sekolah || [];

  // Pastikan semua input peserta dalam bentuk array
  const pesertaCount = Array.isArray(namaPeserta) ? namaPeserta.length : 1;

  for (let i = 0; i < pesertaCount; i++) {
    sheet.appendRow([
      timestamp,
      namaPendamping,
      kontakPendamping,
      rayon,
      Array.isArray(namaPeserta) ? namaPeserta[i] : namaPeserta,
      Array.isArray(nis) ? nis[i] : nis,
      Array.isArray(tanggalLahir) ? tanggalLahir[i] : tanggalLahir,
      Array.isArray(kelas) ? kelas[i] : kelas,
      Array.isArray(asalSekolah) ? asalSekolah[i] : asalSekolah,
    ]);
  }

  return ContentService.createTextOutput("Data berhasil disimpan.").setMimeType(ContentService.MimeType.TEXT);
}
