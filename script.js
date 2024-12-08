// Get DOM elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}

// Create task element
function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");

  // Create task text span
  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;
  li.appendChild(taskSpan);

  // Create controls div
  const controls = document.createElement("div");
  controls.className = "task-controls";

  // Add complete functionality
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.style.background = "transparent";
  completeBtn.style.border = "none";
  completeBtn.style.color = "#4CAF50";
  completeBtn.style.cursor = "pointer";
  completeBtn.onclick = function () {
    li.classList.toggle("completed");
    updateLocalStorage();
  };

  // Add delete functionality
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.border = "none";
  deleteBtn.style.color = "#ff6b6b";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.onclick = function () {
    li.remove();
    updateLocalStorage();
  };

  controls.appendChild(completeBtn);
  controls.appendChild(deleteBtn);
  li.appendChild(controls);

  if (completed) {
    li.classList.add("completed");
  }

  taskList.appendChild(li);
}

// Save tasks to localStorage
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent.trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task function
function addTask() {
  if (taskInput.value.trim() !== "") {
    createTaskElement(taskInput.value);
    updateLocalStorage();
    taskInput.value = "";
  }
}

// Add task on Enter key press
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initial focus on input and load saved tasks
taskInput.focus();
loadTasks();
