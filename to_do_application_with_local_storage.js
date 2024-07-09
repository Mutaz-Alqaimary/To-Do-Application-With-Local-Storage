let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let deleteAll = document.querySelector(".delete-all");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  addElementsToPageFrom(arrayOfTasks);
}

submit.onclick = function () {
  if (input.value) {
    addTaskToArray(input.value);
  }
  input.value = "";
  submit.classList.add("disabled");
  submit.classList.remove("pointer");
};

deleteAll.onclick = function () {
  tasksDiv.innerHTML = "";
  arrayOfTasks = [];
  localStorage.removeItem("tasks");
  deleteAll.classList.add("disabled");
  deleteAll.classList.remove("pointer");
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    if (!tasksDiv.innerHTML) {
      localStorage.removeItem("tasks");
      deleteAll.classList.add("disabled");
      deleteAll.classList.remove("pointer");
    }
  }

  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
  deleteAll.classList.add("pointer");
  deleteAll.classList.remove("disabled");
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function deleteTaskWith(taskID) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskID);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskID) {
  for (let i of arrayOfTasks) {
    if (i.id == taskID) {
      i.completed == false ? (i.completed = true) : (i.completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

window.onload = function () {
  submit.classList.add("disabled");
  submit.classList.remove("pointer");
  if (tasksDiv.innerHTML) {
    deleteAll.classList.add("pointer");
    deleteAll.classList.remove("disabled");
  } else {
    deleteAll.classList.add("disabled");
    deleteAll.classList.remove("pointer");
  }
};

input.oninput = function () {
  if (input.value) {
    submit.classList.add("pointer");
    submit.classList.remove("disabled");
  } else {
    submit.classList.add("disabled");
    submit.classList.remove("pointer");
  }
};
