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
    } else {
        console.error("Dark Mode button not found!");
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
            const text = journalInput.innerHTML;

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
    } else {
        console.error("Save button not found!");
    }

    // Display saved entries
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

    // Calendar (with mood tracker only in the calendar, not in journal entries)
    const calendarContainer = document.getElementById('calendar');
    let currentMonth = new Date().getMonth();  // Get current month (0-11)
    let currentYear = new Date().getFullYear(); // Get current year

    // Function to generate the calendar
    function generateCalendar(month, year) {
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Weekday initials, Sunday as 0
        calendarContainer.innerHTML = ''; // Clear the calendar container before reloading it

        // Create the month title
        const monthTitle = document.createElement('h2');
        monthTitle.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
        calendarContainer.appendChild(monthTitle);

        // Add navigation buttons for previous and next months
        const navigationDiv = document.createElement('div');
        navigationDiv.classList.add('calendar-navigation');

        const prevMonthBtn = document.createElement('button');
        prevMonthBtn.textContent = 'Previous';
        prevMonthBtn.addEventListener('click', () => {
            // Decrease the month and update year if needed
            if (currentMonth === 0) {
                currentMonth = 11;
                currentYear--;
            } else {
                currentMonth--;
            }
            generateCalendar(currentMonth, currentYear);
        });

        const nextMonthBtn = document.createElement('button');
        nextMonthBtn.textContent = 'Next';
        nextMonthBtn.addEventListener('click', () => {
            // Increase the month and update year if needed
            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear++;
            } else {
                currentMonth++;
            }
            generateCalendar(currentMonth, currentYear);
        });

        navigationDiv.appendChild(prevMonthBtn);
        navigationDiv.appendChild(nextMonthBtn);
        calendarContainer.appendChild(navigationDiv);

        const calendarGrid = document.createElement('div');
        calendarGrid.id = 'calendar';
        calendarContainer.appendChild(calendarGrid);

        // Display weekday initials (S, M, T, W, T, F, S)
        weekdays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('weekday');
            dayDiv.textContent = day;
            calendarGrid.appendChild(dayDiv);
        });

        // Get the number of days in the current month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get the starting weekday of the first day of the month
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sunday) to 6 (Saturday)

        // Adjust so the day of the week starts correctly (Sunday = 0, Saturday = 6)
        const correctFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

        // Generate empty cells for days before the first day of the month
        for (let i = 0; i < correctFirstDay - 1; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarGrid.appendChild(emptyCell);
        }

        // Generate the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const moodCell = document.createElement('div');
            moodCell.classList.add('day');
            moodCell.textContent = day; // Display the day number

            // Mood dropdown slider (circle)
            const moodSlider = document.createElement('select');
            moodSlider.classList.add('mood-slider');

            const moods = ['😊', '😐', '😢', '😡'];
            moods.forEach(mood => {
                const option = document.createElement('option');
                option.value = mood;
                option.textContent = mood;
                moodSlider.appendChild(option);
            });

            moodSlider.addEventListener('change', function () {
                moodCell.textContent = `${day} ${moodSlider.value}`; // Display selected mood with day number
            });

            moodCell.appendChild(moodSlider);
            calendarGrid.appendChild(moodCell);
        }
    }

    // Initially generate the current month calendar
    generateCalendar(currentMonth, currentYear);
});



    





    function formatText(command) {
        document.execCommand(command, false, null);
}
function changeTextColor() {
    let color = document.getElementById("color-picker").value;
    document.execCommand("foreColor", false, color);
}

document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Retrieve stored data
    let storedData = JSON.parse(localStorage.getItem("todoData")) || {};
    
    // ✅ Check if the stored date matches today
    if (storedData.date !== today) {
        localStorage.setItem("todoData", JSON.stringify({ date: today, tasks: [] })); // Reset for new day
        storedData = { date: today, tasks: [] };
    }

    let tasks = storedData.tasks;

    // ✅ Load tasks for today
    function loadTasks() {
        todoList.innerHTML = ""; // Clear old list
        tasks.forEach((task, index) => {
            const li = document.createElement("li");

            // Create Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                tasks[index].completed = checkbox.checked;
                saveTasks();
            });

            // Task Text
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.style.textDecoration = "line-through"; // Strikethrough completed tasks
            }

            // Update text style when checkbox is clicked
            checkbox.addEventListener("change", () => {
                taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
            });

            // Append elements
            li.appendChild(checkbox);
            li.appendChild(taskText);
            todoList.appendChild(li);
        });
    }

    // ✅ Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("todoData", JSON.stringify({ date: today, tasks }));
    }

    // ✅ Add a new task
    addTaskBtn.addEventListener("click", function () {
        const taskText = todoInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            loadTasks();
            todoInput.value = ""; // Clear input field
        }
    });

    // Load today's tasks on page load
    loadTasks();
});
