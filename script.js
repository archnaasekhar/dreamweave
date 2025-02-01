// script.js

// Handle delete button functionality
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.entry').remove();
    });
});

// Handle adding a new journal entry
document.getElementById('add-entry-btn').addEventListener('click', function() {
    const journalContent = document.getElementById('journal-input').value;
    if (journalContent.trim() === '') {
        alert('Please enter some text.');
        return;
    }

    const entryContainer = document.createElement('div');
    entryContainer.classList.add('entry');

    const timestamp = new Date().toLocaleString();

    const newEntry = `
        <p>${journalContent}</p>
        <p class="timestamp">${timestamp}</p>
        <button class="delete-btn">Delete</button>
    `;

    entryContainer.innerHTML = newEntry;
    document.getElementById('entries-container').appendChild(entryContainer);

    // Clear the input field after adding the entry
    document.getElementById('journal-input').value = '';

    // Re-attach delete functionality to the new entry
    entryContainer.querySelector('.delete-btn').addEventListener('click', function() {
        this.closest('.entry').remove();
    });
});

// Toggle dark mode
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode); // Save the theme preference
});

// Load dark mode preference from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
});

// Save all journal entries to local storage
document.getElementById('save-btn').addEventListener('click', function() {
    const entries = [];
    document.querySelectorAll('.entry').forEach(entry => {
        const content = entry.querySelector('p').innerText;
        const timestamp = entry.querySelector('.timestamp').innerText;
        entries.push({ content, timestamp });
    });
    localStorage.setItem('entries', JSON.stringify(entries));
});

// Load saved journal entries from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.forEach(entry => {
        const entryContainer = document.createElement('div');
        entryContainer.classList.add('entry');
        entryContainer.innerHTML = `
            <p>${entry.content}</p>
            <p class="timestamp">${entry.timestamp}</p>
            <button class="delete-btn">Delete</button>
        `;
        document.getElementById('entries-container').appendChild(entryContainer);

        // Re-attach delete functionality to the loaded entries
        entryContainer.querySelector('.delete-btn').addEventListener('click', function() {
            this.closest('.entry').remove();
        });
    });
});