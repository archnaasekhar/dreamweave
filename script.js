document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
        });

        // Apply dark mode if it was previously set
        if (localStorage.getItem("dark-mode") === "true") {
            body.classList.add("dark-mode");
        }
    }

    // Full-Screen Toggle
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const exitFullscreenBtn = document.getElementById("exit-fullscreen-btn");
    const controls = document.querySelector(".controls");

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
            controls.classList.add("fullscreen"); 
            fullscreenBtn.style.display = "none";  // Hide full-screen button
            exitFullscreenBtn.style.display = "inline-block";  // Show exit button
        });
    }
// Exit Full-Screen Mode
if (exitFullscreenBtn) {
    exitFullscreenBtn.addEventListener("click", () => {
        controls.classList.remove("fullscreen");
        fullscreenBtn.style.display = "inline-block";  // Show full-screen button
        exitFullscreenBtn.style.display = "none";  // Hide exit button
    });
}
    // Save Journal Entries
    const saveBtn = document.getElementById("save-btn");
    const journalTitleInput = document.getElementById("journal-title");
    const journalInput = document.getElementById("journal-input");
    const entriesContainer = document.getElementById("entries-container");

    let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const title = journalTitleInput.value.trim();
            const text = journalInput.value.trim();

            if (title && text) {
                const timestamp = new Date().toLocaleString();
                const newEntry = { title, text, timestamp };

                journalEntries.push(newEntry);
                localStorage.setItem("journalEntries", JSON.stringify(journalEntries));

                displayEntry(title, text, timestamp);

                journalTitleInput.value = "";
                journalInput.value = "";
            }
        });
    }

    // Display saved entries as cards
    function displayEntry(title, text, timestamp) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const titleDiv = document.createElement("h3");
        titleDiv.textContent = title;

        const textDiv = document.createElement("p");
        textDiv.textContent = text;

        const timestampDiv = document.createElement("div");
        timestampDiv.classList.add("timestamp");
        timestampDiv.textContent = timestamp;

        entryDiv.appendChild(titleDiv);
        entryDiv.appendChild(textDiv);
        entryDiv.appendChild(timestampDiv);

        entriesContainer.appendChild(entryDiv);
    }

    journalEntries.forEach(entry => {
        displayEntry(entry.title, entry.text, entry.timestamp);
    });
});

