document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const space = document.querySelector(".space");
    const total = document.querySelector(".total");
    const high = document.getElementById("high-count");
    const tot = document.getElementById("total");
    const searchInput = document.getElementById('searchInput');
     // Task count elements
     const todoCount = document.getElementById("todo-count");
     const inProgressCount = document.getElementById("in-progress-count");
     const doneCount = document.getElementById("done-count");

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addTask();
    });

    //const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        filterTasks(searchInput.value.trim().toLowerCase());
    });

    window.updateTaskStatus = function (checkbox, taskItem) {
        let count = 0;
        const checkboxes = taskList.querySelectorAll(".checkmark");

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                count++;
            }
        });

        high.textContent = `${count} of`;
        tot.textContent = `${count}`;
        // Call the function to update the count based on the dropdown value
        updateCountBasedOnDropdown(taskItem);
    };

    function updateTaskCount(status) {
        const countElement = document.getElementById(`${status.toLowerCase()}-count`);
        if (countElement) {
            const currentCount = parseInt(countElement.textContent) || 0;
            countElement.textContent = currentCount + 1;
            updateCountDisplay();
        }
    }
    // New function to update the count display in the window
    function updateCountDisplay() {
        const todoCount = parseInt(document.getElementById("todo-count").textContent) || 0;
        const inProgressCount = parseInt(document.getElementById("in-progress-count").textContent) || 0;
        const doneCount = parseInt(document.getElementById("done-count").textContent) || 0;

        // Update the count display in the window
        document.getElementById("todo-count-display").textContent = `To-do: ${todoCount}`;
        document.getElementById("in-progress-count-display").textContent = `In Progress: ${inProgressCount}`;
        document.getElementById("done-count-display").textContent = `Done: ${doneCount}`;
    }
    
    
    // Update the count based on the selected dropdown value
    function updateCountBasedOnDropdown(taskItem) {
        const statusDropdown = taskItem.querySelector('.status-dropdown');
        const selectedStatus = statusDropdown.value;
        updateTaskCount(selectedStatus);
    }


    function filterTasks(query) {
        const tasks = document.querySelectorAll('.task');

        tasks.forEach(task => {
            const taskDetails = task.querySelector('.task-details');
            const taskName = taskDetails.textContent.toLowerCase(); // Updated this line
            const dueDate = taskDetails.querySelector('.due-date').textContent.toLowerCase();

            if (taskName.includes(query) || dueDate.includes(query)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function addTask() {
        const taskName = document.getElementById("taskName").value;
        const dueDate = document.getElementById("dueDate").value;
        let tt=0;

        if (taskName.trim() === "") {
            alert("Task name cannot be empty");
            return;
        }

        const task = {
            name: taskName,
            dueDate: dueDate,
            status: "To-Do",
            priority: "Medium",
        };

        displayTask(task);
        space.classList.add("none");
        clearForm();

        
        updateTaskCount(task.status);
    }

    function displayTask(task) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        const priorityDropdown = document.createElement("select");
        priorityDropdown.innerHTML = `
            <option value="High">High</option>
            <option value="Medium" selected>Medium</option>
            <option value="Low">Low</option>
        `;

        const statusDropdown = document.createElement("select");
        statusDropdown.classList.add("status-dropdown");
        statusDropdown.innerHTML = `
            <option value="To-do" selected>To-do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        `;

        taskItem.innerHTML = `
            <input type="checkbox" class="checkmark" onchange="updateTaskStatus(this, this.parentElement)">
            <span class="task-details">
                ${task.name} - Due: ${task.dueDate}
            </span>
            <div>
                <button onclick="editTask(this)" class="btn"><span class="material-symbols-outlined">edit</span></button>
                <button onclick="deleteTask(this)" class="btn"><span class="material-symbols-outlined">delete</span></button>
            </div>
        `;

        taskItem.insertBefore(priorityDropdown, taskItem.firstChild);
        taskItem.insertBefore(statusDropdown, taskItem.firstChild);
        taskList.prepend(taskItem);
        updateTaskCount(task.status);
        total.textContent = taskList.children.length;
    }

    function clearForm() {
        document.getElementById("taskForm").reset();
    }

    window.editTask = function (button) {
        const taskItem = button.closest(".task");
        const taskText = taskItem.querySelector(".task-details");
        const oldStatus = taskText.innerText.split(" - ")[1].toLowerCase();
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.innerText.split(" - ")[0];
        editInput.classList.add("edit-input");

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", function () {
            taskText.innerText =
                editInput.value +
                " - " + taskItem.querySelector(".task-details").innerText.split(" - ")[1];
            taskItem.removeChild(editInput);
            taskItem.removeChild(saveButton);
            updateCountBasedOnDropdown(taskItem, oldStatus);
        });

        taskItem.insertBefore(editInput, taskText);
        taskItem.insertBefore(saveButton, taskText);
    };

    window.deleteTask = function (button) {
        const taskItem = button.closest(".task");
        taskList.removeChild(taskItem);
        total.textContent = taskList.children.length;
        updateTaskCount("To-do");
        updateTaskCount("In Progress");
        updateTaskCount("Done");
        updateCountBasedOnDropdown(taskItem);
        if (taskList.children.length === 0) {
            space.classList.remove("none");
        }
    };

    function updateTaskCount(status) {
        const countElement = document.getElementById(`${status.toLowerCase()}-count`);
        if (countElement) {
            const currentCount = parseInt(countElement.textContent) || 0;
            countElement.textContent = currentCount + 1;
        }
    }
});
