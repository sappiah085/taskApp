class Task {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
}
var taskArr, input, list, clear, bin;
bin = document.querySelector(".bi-trash");
clear = document.querySelector(".clear");
list = document.querySelector("ol");
input = document.querySelector("#input");
taskArr = [];

function display(arr) {
  list.textContent = "";
  arr.forEach((element) => {
    var li = `<li id="${element.id}">${element.text}<i class="bi bi-trash"></i></li>`;
    list.insertAdjacentHTML("beforeend", li);
  });
}

function add() {
  // add to array
  var newTask, valueFromInput, id;
  if (taskArr.length === 0) {
    id = 0;
  } else {
    id = taskArr[taskArr.length - 1].id + 1;
  }
  valueFromInput = input.value;

  if (!valueFromInput) return;

  newTask = new Task(valueFromInput, id);

  taskArr.push(newTask);
  input.value = "";

  // display on ui
  display(taskArr);
  store();
}

function store() {
  if (localStorage.getItem("task")) {
    localStorage.removeItem("task");
  }
  var task = JSON.stringify(taskArr);
  localStorage.setItem("task", task);
}

clear.addEventListener("click", () => {
  taskArr = [];
  list.textContent = "";
  store();
});

// remove function
function remove(e) {
  var ids, newmap, newid;
  ids = parseInt(e.target.parentNode.id);
  newmap = taskArr.map((el) => {
    return el.id;
  });
  newid = newmap.findIndex((el) => el === ids);
  taskArr.splice(newid, 1);
  display(taskArr);
  store();
}
window.onload = ()=>{
  taskArr = JSON.parse(localStorage.getItem("task"));
  display(taskArr)
}

list.addEventListener("click", remove);
document.querySelector(".add").addEventListener("click", add);
