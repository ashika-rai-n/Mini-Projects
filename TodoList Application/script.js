const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const empty = document.getElementById("empty");
const counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {

  list.innerHTML = "";

  tasks.forEach((task, i) => {

    const li = document.createElement("li");
    li.className = "task" + (task.done ? " completed" : "");

    const textEl = document.createElement("span");
    textEl.textContent = task.text;

    const checkBtn = document.createElement("button");
    checkBtn.className = "check";

    checkBtn.style.background = task.done ? "#22c55e" : "#d8dfeb";
    checkBtn.textContent = task.done ? "✓" : "";

    checkBtn.onclick = () => {
      task.done = !task.done;
      save();
      render();
    };

    const left = document.createElement("div");
    left.className = "left";

    left.appendChild(checkBtn);
    left.appendChild(textEl);

    const editBtn = document.createElement("button");
    editBtn.className = "small edit";
    editBtn.textContent = "Edit";

    const delBtn = document.createElement("button");
    delBtn.className = "small delete";
    delBtn.textContent = "Delete";

    const actions = document.createElement("div");
    actions.className = "actions";

    editBtn.onclick = () => {

      const editInput = document.createElement("input");
      editInput.value = task.text;

      left.replaceChild(editInput, textEl);
      editInput.focus();

      editBtn.textContent = "Save";

      editBtn.onclick = () => {

        const newText = editInput.value.trim();

        if (!newText) return;

        tasks[i].text = newText;

        save();
        render();
      };

    };

    delBtn.onclick = () => {
      tasks.splice(i, 1);
      save();
      render();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);

    list.appendChild(li);

  });

  empty.style.display = tasks.length ? "none" : "block";

  const remaining = tasks.filter(t => !t.done).length;
  counter.textContent = remaining + " task(s) remaining";
}

function addTask() {

  const text = input.value.trim();

  if (!text) {
    text.value= "Gee"
    return
};

  tasks.push({ text, done: false });

  input.value = "";

  save();
  render();
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

/* CLEAR COMPLETED FIX */

function clearCompleted() {

  for (let i = tasks.length - 1; i >= 0; i--) {

    if (tasks[i].done) {
      tasks.splice(i, 1);
    }

  }

  save();
  render();
}

/* DARK MODE */

function toggleDark() {

  document.body.classList.toggle("dark");

  const toggleBtn = document.getElementsByClassName("toggle")[0];

  if (document.body.classList.contains("dark")) {
    toggleBtn.style.backgroundColor = "white";
    toggleBtn.style.color = "black";
    toggleBtn.textContent = "🔆";
  } else {
    toggleBtn.style.backgroundColor = "black";
    toggleBtn.style.color = "white";
    toggleBtn.textContent = "🌙";
  }

  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

if (localStorage.getItem("dark") === "true") {

  document.body.classList.add("dark");

  const toggleBtn = document.getElementsByClassName("toggle")[0];
  toggleBtn.style.backgroundColor = "white";
  toggleBtn.style.color = "black";
}

render();
