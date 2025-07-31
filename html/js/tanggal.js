// Tombol tambah note baru
document.getElementById("add-new-btn").addEventListener("click", function () {
    const selectedDate = document.getElementById("tanggalInput").value;
    if (!selectedDate) {
        alert("Pilih tanggal dulu ya!");
        return;
    }
    localStorage.setItem("selectedDate", selectedDate);
    window.location.href = "notes.html";
});

// Menampilkan semua notes yang sudah tersimpan
const notesPreview = document.getElementById("notes-preview");
notesPreview.innerHTML = "<h2>Notes Preview</h2>";

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("note-")) {
        const date = key.substring(5); // ambil tanggal dari key
        const content = localStorage.getItem(key);

        const card = document.createElement("div");
        card.classList.add("note-card");

        // Tombol edit
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️ Edit";
        editBtn.onclick = function () {
            localStorage.setItem("selectedDate", date);
            window.location.href = "notes.html";
        };

        // Tombol hapus
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️ Delete";
        deleteBtn.onclick = function () {
            if (confirm(`Hapus note untuk tanggal ${date}?`)) {
                localStorage.removeItem(key);
                window.location.reload();
            }
        };

        card.innerHTML = `<h3>${date}</h3><p>${content}</p>`;
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);

        notesPreview.appendChild(card);
    }
}
