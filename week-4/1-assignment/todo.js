const fs = require("fs");
const { Command } = require("commander");

const program = new Command();
const TODOS_FILE = "todosdata.json";

function readTodos() {
  if (!fs.existsSync(TODOS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(TODOS_FILE, "utf-8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

program
  .command("list")
  .description("list all todos")
  .action(() => {
    const todos = readTodos();
    if (todos.length === 0) {
      console.log("no todos found");
      return;
    }
    console.log("Your Todos:");
    todos.forEach((todo, index) => {
      console.log(`${index}:[${todo.done ? "X" : " "}] ${todo.task}`);
    });
  });

program.parse(process.argv);
