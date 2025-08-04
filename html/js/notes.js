document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("home-icon").addEventListener("click", function () {
    window.location.href = "index.html";
});
document.getElementById("back-icon").addEventListener("click", function () {   
    window.location.href = "tanggal.html";
});
    
    const selectedDate = localStorage.getItem("selectedDate");
    const noteKey = `note-${selectedDate}`;
    const taskKey = `tasks-${selectedDate}`;

    const title = document.getElementById("selected-date-title");
    if (title && selectedDate) {
        title.textContent = `Notes for ${selectedDate}`;
    }

    const checklist = document.getElementById("checklist");
    const addTaskBtn = document.getElementById("add-task-btn");
    const noteArea = document.querySelector("textarea[placeholder='Write your note here...']");
    const saveButton = document.getElementById("save-note-btn");

    // ➕ Tambah task baru
    addTaskBtn.addEventListener("click", function () {
        const newTask = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const textarea = document.createElement("textarea");
        textarea.placeholder = "New task...";

        newTask.appendChild(checkbox);
        newTask.appendChild(textarea);
        checklist.appendChild(newTask);
    });

    // 💾 Simpan catatan & checklist
    saveButton.addEventListener("click", function () {
        const noteContent = noteArea.value;
        localStorage.setItem(noteKey, noteContent);

        const taskItems = checklist.querySelectorAll("li");
        const tasks = [];

        taskItems.forEach(li => {
            const checkbox = li.querySelector("input[type='checkbox']");
            const textarea = li.querySelector("textarea");
            tasks.push({
                done: checkbox.checked,
                text: textarea.value
            });
        });

        localStorage.setItem(taskKey, JSON.stringify(tasks));
        alert("Note & tasks saved!");
        window.location.href = "tanggal.html";
    });

    // 📦 Tampilkan note jika ada
    const savedNote = localStorage.getItem(noteKey);
    if (savedNote) {
        noteArea.value = savedNote;
    }

    // 📦 Tampilkan tasks jika ada
    const savedTasks = localStorage.getItem(taskKey);
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        checklist.innerHTML = ""; // Kosongkan dulu
        tasks.forEach(task => {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.done;
            const textarea = document.createElement("textarea");
            textarea.value = task.text;
            li.appendChild(checkbox);
            li.appendChild(textarea);
            checklist.appendChild(li);
        });
    }
});

// if (task.done) {
//     document.getElementById("note-card").addEventListener(function (
//         alert("Task already done!"
//     ))
// }
