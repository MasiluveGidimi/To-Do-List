window.onload = function () {
  loadTasks();

  if (localStorage.getItem("tasks") == null) {
    saveTasks();
  }

  updateCounter();
};


function markDone(checkbox){

  let label = checkbox.nextElementSibling;

  if(checkbox.checked){
    label.classList.add("completed");
  } else {
    label.classList.remove("completed");
  }

  saveTasks();
  updateCounter();
}


function addTask(){

  let input = document.getElementById("newTask");
  let taskText = input.value;

  if(taskText === "") return;

  let taskHTML = `
  <div class="items">
    <input type="checkbox" onclick="markDone(this)">
    <label>${taskText}</label>
    <button onclick="deleteTask(this)">delete</button>
  </div>
  `;

  document.getElementById("taskList").innerHTML += taskHTML;

  input.value = "";

  saveTasks();
  updateCounter();
}


function deleteTask(button){

  let item = button.parentElement;

  localStorage.setItem("lastDeleted", item.outerHTML);

  item.remove();

  saveTasks();
  updateCounter();
}


function restoreTask(){

  let deleted = localStorage.getItem("lastDeleted");

  if(deleted){

    document.getElementById("taskList").innerHTML += deleted;

    localStorage.removeItem("lastDeleted");

    saveTasks();
    updateCounter();
  }
}


function saveTasks(){

  let tasks = document.getElementById("taskList").innerHTML;

  localStorage.setItem("tasks", tasks);
}


function loadTasks(){

  let savedTasks = localStorage.getItem("tasks");

  if(savedTasks !== null){
    document.getElementById("taskList").innerHTML = savedTasks;
  }
}


function updateCounter(){

  let total = document.querySelectorAll("#taskList .items").length;
  let completed = document.querySelectorAll("#taskList input:checked").length;

  let remaining = total - completed;

  document.getElementById("taskCounter").textContent =
  remaining + " tasks remaining";
}

localStorage.clear()