
// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

// Check if dark mode preference is saved in localStorage
if (localStorage.getItem("dark-mode") === "true") {
    body.classList.add("dark-mode");
}

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
});

// Journal Entry Storage
let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

// Save Journal Entries
const saveBtn = document.getElementById("save-btn");
const journalTitleInput = document.getElementById("journal-title");
const journalInput = document.getElementById("journal-input");
const entriesContainer = document.getElementById("entries-container");

// Load saved entries from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    journalEntries.forEach(entry => {
        displayEntry(entry.title, entry.text, entry.timestamp);
    });
});

// Save entries to the array and localStorage
saveBtn.addEventListener("click", () => {
    const title = journalTitleInput.value.trim();
    const text = journalInput.value.trim();

    if (title && text) {
        const timestamp = new Date().toLocaleString();
        const newEntry = { title, text, timestamp };

        // Add new entry to array
        journalEntries.push(newEntry);

        // Save to localStorage
        localStorage.setItem("journalEntries", JSON.stringify(journalEntries));

        // Display new entry
        displayEntry(title, text, timestamp);

        // Clear input fields after saving
        journalTitleInput.value = "";
        journalInput.value = "";
    }
});

// Display Journal Entry on the page
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
