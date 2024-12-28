const express = require("express");
const app = express();
const PORT = 1234;

app.use(express.json());

const createRes = (status, data, message) => {
    return { status, data, message }
}

let users = [
    { "id": 1, "username": "yashdchintawar1", "first_name": "Yash", "last_name": "Chintawar", "email": "yashchintawar1@gmail.com", "password": "Yash@3331" },
    { "id": 2, "username": "yashdchintawar2", "first_name": "Yash2", "last_name": "Chintawar2", "email": "yashchintawar2@gmail.com", "password": "Yash2@3331" }
];

let todos = [
    { "id": 1, "userId": 1, "title": "Buy groceries", "status": "Todo", "deleted": false },
    { "id": 2, "userId": 1, "title": "Call mom", "status": "In Progress", "deleted": false },
    { "id": 3, "userId": 2, "title": "Walk the dog", "status": "Completed", "deleted": false },
];

app.get("/todo/view/:userId?", function (req, res) {
    const userId = parseInt(req.params.userId);
    if (userId) {
        const idWiseTodo = todos.filter((element) => { return element.userId === userId });
        res.json(createRes("success", idWiseTodo, "ToDo Data Received Successfully!"));
    } else {
        res.json(createRes("failed", todos, "All ToDo Data Received Successfully."));
    }
});

app.post("/todo/add/:userId", function (req, res) {
    const userId = parseInt(req.params.userId);
    const todo = req.body.todo;

    if (!todo) {
        return res.status(404).json(createRes("failed", [], "todo not found, please send todo in request."));
    }

    const userIsPresent = users.some((element) => element.id === userId);

    if (!userIsPresent) {
        return res.status(404).json(createRes("failed", [], "User Not Found."));

    }

    const newTodoId = todos.length > 0 ? todos.length + 1 : 1;

    todos.push({ "id": newTodoId, "userId": userId, "title": todo, "status": "Todo", "deleted": false });

    res.json(createRes("success", todos, "Todo Has Been Added."));
});


app.delete("/todo/delete/:userId", function (req, res) {
    const userId = parseInt(req.params.userId);
    const todoIdToDelete = parseInt(req.body.todoId);

    if (!todoIdToDelete) {
        return res.status(404).json(createRes("failed", [], "Todo Id required to Delete The Todo."))
    };

    const userIsPresent = users.some((element) => { return element.id === userId });
    if (!userIsPresent) {
        return res.status(404).json(createRes("failed", [], "User is not present in system"));
    };

    // Find the index of the todo to delete
    const todoIndex = todos.findIndex(
        (todo) => todo.id === todoIdToDelete && todo.userId === userId
    );

    if (todoIndex === -1) {
        return res
            .status(404)
            .json(createRes("failed", [], "Todo not found or does not belong to this user."));
    }

    // Remove the todo
    todos.splice(todoIndex, 1);

    res.json(createRes("success", todos, "Your selected todo has been deleted."));

})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});