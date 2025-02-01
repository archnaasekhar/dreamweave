// Array to hold journal entries, including title and content
let entries = JSON.parse(localStorage.getItem("entries")) || [];

function saveEntry() {
    const title = document.getElementById("title").value;  // Get the title input
    const entryText = document.getElementById("entry").value;  // Get the entry content

    // Validate that both title and entry text are provided
    if (title.trim() === "" || entryText.trim() === "") return;

    // Create a new entry object with title and text
    const newEntry = {
        title: title,
        text: entryText,
        timestamp: new Date().toLocaleString()  // Add timestamp for when the entry is created
    };

    // Add the new entry to the entries array
    entries.push(newEntry);

    // Save the updated entries to LocalStorage
    localStorage.setItem("entries", JSON.stringify(entries));

    // Clear the input fields and reload the entries
    document.getElementById("title").value = "";  // Clear the title
    document.getElementById("entry").value = "";  // Clear the entry text

    loadEntries();  // Reload the entries
}

function loadEntries() {
    const entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = "";  // Clear the existing entries

    // Loop through all entries and display them
    entries.forEach((entry, index) => {
        const entryEl = document.createElement("div");
        entryEl.classList.add("entry");

        // Create the title and content for each entry
        const titleEl = document.createElement("h3");
        titleEl.textContent = entry.title;  // Display the title
        const textEl = document.createElement("p");
        textEl.textContent = entry.text;  // Display the content

        // Create a timestamp
        const timestampEl = document.createElement("small");
        timestampEl.textContent = entry.timestamp;

        entryEl.appendChild(titleEl);
        entryEl.appendChild(textEl);
        entryEl.appendChild(timestampEl);
        entriesDiv.appendChild(entryEl);
    });
}

// Load entries when the page loads
document.addEventListener("DOMContentLoaded", loadEntries);