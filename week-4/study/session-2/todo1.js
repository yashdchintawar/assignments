const express = require("express");
const app = express();

const port = 3331;
app.use(express.json());

let todosData = [
  {
    id: 1,
    todo: "what to do",
  },
  {
    id: 2,
    todo: "what to do",
  },
];

const createResponse = (status, data, message) => ({
  status,
  data,
  message,
});

app.get("/", function (req, res) {
  res.json(
    createResponse("Success", todosData, "Successfully Received The Todo List")
  );
});

app.post("/", function (req, res) {
  const { id, todo } = req.body;

  if (!id || !todo) {
    return res
      .status(400)
      .json(createResponse("error", null, "Both Id & Todo Are Required"));
  }

  if (todosData.some((item) => item.id === id)) {
    return res
      .status(400)
      .json(createResponse("error", null, `Todo With ID ${id} Already Exists`));
  }

  todosData.push({ id, todo });

  res.json(
    createResponse("success", todosData, "Successfully Added Your Todo")
  );
});

app.delete("/:id", function (req, res) {
  const todoId = parseInt(req.params.id);
  const initialTodoLength = todosData.length;

  todosData = todosData.filter((todo) => todo.id !== todoId);

  if (todosData.length < initialTodoLength) {
    res
      .status(200)
      .json(
        createResponse(
          "success",
          todosData,
          `Todo with ID ${todoId} successfully deleted`
        )
      );
  } else {
    res
      .status(404)
      .json(createResponse("failed", null, `Todo with ID ${todoId} not found`));
  }
});

app.listen(port, () => {
  console.log(`Server Is Running On http://localhost:${port}`);
});
