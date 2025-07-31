document.getElementById("add-new-btn").addEventListener("click", function () {
    const selectedDate = document.getElementById("tanggalInput").value;
    if (!selectedDate) {
        alert("Pilih tanggal dulu ya!");
    return;
    }
    localStorage.setItem("selectedDate", selectedDate);
    window.location.href = "notes.html";
});

const selectedDate = localStorage.getItem("selectedDate");
const noteKey = `note-${selectedDate}`;
const saveNoteBtn = document.getElementById("save-note-btn");
if (saveNoteBtn) {
    saveNoteBtn.addEventListener("click", function () {
        const noteContent = document.querySelector("textarea").value;
        localStorage.setItem(noteKey, noteContent);
        alert("Note for " + selectedDate + " saved!");
    });
}

document.getElementById("save-note-btn").addEventListener("click", function () {
    const noteContent = document.querySelector("textarea").value;
    localStorage.setItem(noteKey, noteContent);
    alert("Note for " + selectedDate + " saved!");
});

const notesPreview = document.getElementById("notes-preview");
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("note-")) {
        const date = key.split("-")[1];
        const content = localStorage.getItem(key);
        const card = document.createElement("div");
        card.innerHTML = `<h3>${date}</h3><p>${content}</p>`;
        notesPreview.appendChild(card);
    }
}