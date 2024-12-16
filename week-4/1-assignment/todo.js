const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

let toDos = [];

try {
  const toDoData = fs.readFileSync("./todosdata.json", "utf-8");
  toDos = JSON.parse(toDoData);
} catch (error) {
  console.log("No tasks found or data is currently unavailable.");
}

function updateTodo(todos) {
  fs.writeFileSync("./todosdata.json", JSON.stringify(todos, null, 2), "utf-8");
  listToDo();
}

function listToDo() {
  console.log("\nYour To-Do List:");
  console.log("================");

  if (toDos.length === 0) {
    console.log("No tasks available. Add some tasks first!");
  } else {
    toDos.forEach((todo, index) => {
      const status = todo.done ? "✅ Completed" : "🕒 Pending";
      console.log(`${index + 1}. ${todo.task} -> ${status}`);
    });
  }
}

function deleteToDo(id) {
  const updatedId = parseInt(id - 1);
  if (updatedId > 0 && updatedId <= toDos.length) {
    toDos.splice(updatedId, 1);
    updateTodo(toDos);
  } else {
    console.log("Invalid task ID. Please provide a valid ID.");
  }
}

function changeStatus(id) {
  const updatedId = parseInt(id - 1);
  if (updatedId > 0 && updatedId <= toDos.length) {
    if (toDos[updatedId].done) {
      console.log(
        `Task #${id} (${toDos[updatedId].task}) is already marked as ✅ Completed.`
      );
      listToDo();
    } else {
      toDos[updatedId].done = true;
      console.log(
        `Task #${id} (${toDos[updatedId].task}) has been marked as ✅ Completed.`
      );
      updateTodo(toDos);
    }
  } else {
    console.log("Invalid task ID. Please provide a valid ID.");
  }
}

program
  .name("Todo-cli")
  .description(
    "A CLI-based app to add, manage, and organize your tasks efficiently."
  )
  .version("1.0.0");

program
  .command("list")
  .description(
    "Displays the list of all your to-do tasks, showing their current status (e.g., pending or completed) for easy management."
  )
  .action(() => {
    listToDo();
  });

program
  .command("add <task>")
  .description(
    "Adds a new to-do task with the specified name. The task will be marked as pending by default."
  )
  .action((task) => {
    const newTask = { task: task, done: false };
    toDos.push(newTask);
    updateTodo(toDos);
  });

program
  .command("done <id>")
  .description(
    "Marks a specific task as completed using its ID. Updates its status to ✅ Completed."
  )
  .action((id) => {
    changeStatus(id);
  });

program
  .command("delete <id>")
  .description(
    "Deletes a to-do task by its ID. The ID corresponds to the task's position in the list."
  )
  .action((id) => {
    deleteToDo(id);
  });

program.parse(process.argv);
