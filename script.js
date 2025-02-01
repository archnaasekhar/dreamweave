// Handle adding a new journal entry when Enter is pressed
document.getElementById('journal-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {  // Check for Enter without Shift (for multiline)
        event.preventDefault(); // Prevent the default Enter action (new line)

        const journalTitle = document.getElementById('journal-title').value; // Get title
        const journalContent = document.getElementById('journal-input').value; // Get journal content
        
        if (journalTitle.trim() === '' || journalContent.trim() === '') {
            alert('Please enter both a title and content.');
            return;
        }

        // Create the new entry container
        const entryContainer = document.createElement('div');
        entryContainer.classList.add('entry');

        const timestamp = new Date().toLocaleString();

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = "Delete";

        // Add event listener to the delete button
        deleteButton.addEventListener('click', function() {
            entryContainer.remove(); // Removes the entry when delete button is clicked
            saveEntriesToLocalStorage(); // Re-save entries to localStorage
        });

        // Add the new entry content (including title)
        entryContainer.innerHTML = `
            <h3 class="entry-title">${journalTitle}</h3>
            <p>${journalContent}</p>
            <p class="timestamp">${timestamp}</p>
        `;

        // Append the delete button to the entry container
        entryContainer.appendChild(deleteButton);

        // Append the entry to the container
        document.getElementById('entries-container').appendChild(entryContainer);

        // Clear the input fields after adding the entry
        document.getElementById('journal-title').value = '';
        document.getElementById('journal-input').value = '';

        // Save entries to localStorage
        saveEntriesToLocalStorage();
    }
});

// Save all journal entries to localStorage
function saveEntriesToLocalStorage() {
    const entries = [];
    document.querySelectorAll('.entry').forEach(entry => {
        const title = entry.querySelector('.entry-title').innerText;
        const content = entry.querySelector('p').innerText;
        const timestamp = entry.querySelector('.timestamp').innerText;
        entries.push({ title, content, timestamp });
    });
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Load saved journal entries from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.forEach(entry => {
        const entryContainer = document.createElement('div');
        entryContainer.classList.add('entry');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = "Delete";

        // Add delete button event listener
        deleteButton.addEventListener('click', function() {
            entryContainer.remove();
            saveEntriesToLocalStorage(); // Re-save the updated entries
        });

        entryContainer.innerHTML = `
            <h3 class="entry-title">${entry.title}</h3>
            <p>${entry.content}</p>
            <p class="timestamp">${entry.timestamp}</p>
        `;
        
        entryContainer.appendChild(deleteButton);
        document.getElementById('entries-container').appendChild(entryContainer);
    });
});