document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const space = document.querySelector(".space");
    const total = document.querySelector(".total");
    const totalHigh = document.querySelector("#total");


    //const filterStatusDropdown = document.getElementById("filterStatus");
    //const filterPriorityDropdown = document.getElementById("filterPriority");

    //filterStatusDropdown.addEventListener("change", filterTasks);
    //filterPriorityDropdown.addEventListener("change", filterTasks);
    const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function () {
    filterTasks(searchInput.value.trim().toLowerCase());
  });
  //filter task
  function filterTasks(query) {
    const tasks = document.querySelectorAll('.task');
    const filteredTasksContainer = document.getElementById('filteredTasksContainer');

    // Remove previously filtered tasks
    filteredTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskDetails = task.querySelector('.task-details');
        const taskName = taskDetails.querySelector('.task-name').textContent.toLowerCase();
        const dueDate = taskDetails.querySelector('.due-date').textContent.toLowerCase();

        if (taskName.includes(query) || dueDate.includes(query)) {
            task.style.display = 'flex';

            // Create a clone of the task and append it to the filteredTasksContainer
            const clonedTask = task.cloneNode(true);
            filteredTasksContainer.appendChild(clonedTask);
        } else {
            task.style.display = 'none';
        }
    });
}

      //window.updateTaskStatus = updateTaskStatus;
      window.updateTaskStatus = function (checkbox, taskItem) {
        let count = 0;

        const checkboxes = taskList.querySelectorAll(".checkmark");
        const statusDropdown = taskItem.querySelector(".status-dropdown");

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                count++;
            }
        });

        high.textContent = `${count} of`;

        // Update the task status based on the selected option in the dropdown
        const selectedStatus = statusDropdown.options[statusDropdown.selectedIndex].value;
        switch (selectedStatus) {
            case "To-do":
                // Handle "To-do" status
                break;
            case "In Progress":
                // Handle "In Progress" status
                break;
            case "Done":
                // Handle "Done" status
                break;
            default:
                // Default case
                break;
        }
        filterTasks();
    };

    //filtertask function
   // function filterTasks() {
       // const statusFilter = filterStatusDropdown.value;
       // const priorityFilter = filterPriorityDropdown.value;

       // const taskItems = taskList.querySelectorAll(".task");
        //taskItems.forEach((taskItem) => {
           // const status = taskItem.querySelector(".status-dropdown").value;
            //const priority = taskItem.querySelector("select:first-child").value;

           // const statusMatch = statusFilter === "All" || status === statusFilter;
           // const priorityMatch = priorityFilter === "All" || priority === priorityFilter;

           // if (statusMatch && priorityMatch) {
                //taskItem.style.display = "flex";
           // } else {
               // taskItem.style.display = "none";
           // }
        //});
   // }
  
    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
      addTask();
    });
  //add task
    function addTask() {
      const taskName = document.getElementById("taskName").value;
      const dueDate = document.getElementById("dueDate").value;
  
      if (!searchInput.value.trim() && taskName.trim() === "") {
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
    }
    //display task
  
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
            <span>${task.name} - Due: ${task.dueDate}</span>
            <div>
                <button onclick="editTask(this)" class="btn"><span class="material-symbols-outlined">
                    edit
                </span></button>
                <button onclick="deleteTask(this)" class="btn"><span class="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        `;

        taskItem.insertBefore(priorityDropdown, taskItem.firstChild);
        taskItem.insertBefore(statusDropdown, taskItem.firstChild);
        taskList.prepend(taskItem);
        total.textContent = taskList.children.length;
        totalHigh.textContent = taskList.children.length;
       // Update task count based on the task status
    updateTaskCount(task.status);
    }
    function updateTaskCount(status) {
        const countElement = document.getElementById(`${status.toLowerCase()}-count`);
        if (countElement) {
            const currentCount = parseInt(countElement.textContent) || 0;
            countElement.textContent = currentCount + 1;
        }
    }
  
    function clearForm() {
      document.getElementById("taskForm").reset();
    }
    //edit task
  
    window.editTask = function (button) {
      const taskItem = button.closest(".task");
      const taskText = taskItem.querySelector("span");
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskText.innerText.split(" - ")[0];
      editInput.classList.add("edit-input");
  
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", function () {
        taskText.innerText =
          editInput.value +
          
          taskItem.querySelector("span").innerText.split(" - ")[1];
        taskItem.removeChild(editInput);
        taskItem.removeChild(saveButton);
      });
  
      taskItem.insertBefore(editInput, taskText);
      taskItem.insertBefore(saveButton, taskText);
    };
  //delete task
    window.deleteTask = function (button) {
      const taskItem = button.closest(".task");
      taskList.removeChild(taskItem);
        total.textContent = taskList.children.length;
        totalHigh.textContent = taskList.children.length;
        
  
      if (taskList.children.length === 0) {
        space.classList.remove("none");
      }
      };
      
      const high = document.getElementById("high-count");
  
      function updateTaskStatus(checkbox , ) {
          let count = 0;
      
        
          const checkboxes = taskList.querySelectorAll(".checkmark");
      
          checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                  count++;
              }
          });
      
          high.textContent =  `${count} of`;
      
          
      }
      
      
  });