let toDo = [];
function addToDo() {
  const value = document.querySelector("#input-text").value;
  toDo.push({
    title: value,
  });
  document.querySelector("#input-text").value = "";
  value.value = "";
  render();
}

function deleteLastToDo() {
  toDo.splice(toDo.length - 1, 1);
  render();
}

function deleteAllToDO() {
  toDo.splice(0, toDo.length);
  render();
}

function deleteToDo(index) {
  toDo.splice(index, 1);
  render();
}

function createToDoComponent(todo, index) {
  const toDoContainer = document.createElement("div");
  const toDoH1 = document.createElement("h1");
  const toDoDeleteBtn = document.createElement("button");
  toDoH1.innerText = todo.title;
  toDoDeleteBtn.innerHTML = "Delete";

  toDoDeleteBtn.onclick = () => deleteToDo(index);

  toDoContainer.appendChild(toDoH1);
  toDoContainer.appendChild(toDoDeleteBtn);

  return toDoContainer;
}

function render() {
  document.querySelector("#todos").innerHTML = "";
  toDo.map((item, index) => {
    const ele = createToDoComponent(item, index);
    document.querySelector("#todos").appendChild(ele);
  });
}
