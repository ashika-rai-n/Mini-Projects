const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskTime = timeInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskText,
        time: taskTime,
        completed: false
    };

    saveTask(task);
    renderTask(task);

    taskInput.value = "";
    timeInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `
    <strong>${task.text}</strong>
    <span class="task-time">${task.time || "No time set"}</span>
  `;

    taskInfo.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        updateTasks();
        updateProgress();

    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateTasks();
        updateProgress();

    });

    li.appendChild(taskInfo);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    updateProgress();

}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
    updateProgress();

}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        const text = li.querySelector("strong").textContent;
        const time = li.querySelector(".task-time").textContent;
        tasks.push({
            text,
            time: time === "No time set" ? "" : time,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
    if (confirm("Clear all tasks?")) {
        taskList.innerHTML = "";
        localStorage.removeItem("tasks");
        updateProgress();

    }
}

function updateProgress() {
    const tasks = document.querySelectorAll("li");
    const completedTasks = document.querySelectorAll("li.completed");

    if (tasks.length === 0) {
        progressFill.style.width = "0%";
        progressFill.style.background = "red";
        progressText.textContent = "0% Completed";
        return;
    }

    const percentage = Math.round(
        (completedTasks.length / tasks.length) * 100
    );

    progressFill.style.width = percentage + "%";
    progressText.textContent = `${percentage}% Completed`;

    if (percentage <= 25) {
        progressFill.style.background = "red";
    } else if (percentage <= 50) {
        progressFill.style.background = "orange";
    } else if (percentage <= 80) {
        progressFill.style.background = "gold";
    } else {
        progressFill.style.background = "green";
    }
}
