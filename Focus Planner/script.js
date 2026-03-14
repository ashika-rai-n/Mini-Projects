const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatTime(time) {
  if (!time) return "";

  let [hour, minute] = time.split(":");

  hour = parseInt(hour);

  let period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return hour + ":" + minute + " " + period;
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "% Completed";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");

    span.innerHTML = `
${task.text}
${task.time ? `<span class="task-time">⏰ ${formatTime(task.time)}</span>` : ""}
`;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "task-buttons";

    const doneBtn = document.createElement("button");
    doneBtn.className = "doneBtn";
    doneBtn.textContent = task.completed ? "Undo" : "Done";

    doneBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    buttonGroup.appendChild(doneBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonGroup);

    taskList.appendChild(li);
  });

  updateProgress();
}

function addTask() {
  const text = taskInput.value.trim();
  const time = timeInput.value;

  if (text === "") return;

  tasks.push({
    text: text,
    time: time,
    completed: false,
  });

  taskInput.value = "";
  timeInput.value = "";

  saveTasks();
  renderTasks();
}

addTaskBtn.onclick = addTask;

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

clearBtn.onclick = () => {
  if (!confirm("Clear all tasks?")) return;

  tasks = [];
  saveTasks();
  renderTasks();
};

renderTasks();
