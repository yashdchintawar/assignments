const express = require("express");
const app = express();

app.use(express.json());

var users = [
  {
    name: "Jhon Smith",
    username: "JHONS",
    kidneys: [{ healthy: false }, { healthy: true }],
  },
  {
    name: "Yash Chintawar",
    username: "YASHC",
    kidneys: [
      { healthy: true },
      { healthy: true },
      { healthy: false },
      { healthy: false },
    ],
  },
];

const createRes = (status, data, message) => {
  return { status, data, message };
};

function getUserDetails(userName) {
  const findedUser = users.find((user) => user.username === userName);
  if (findedUser) {
    return createRes("success", findedUser, "User founded as per username");
  } else {
    return createRes("failed", [], "User not founded");
  }
}

function getUserKidneysDetails(userData) {
  const userKidneys = userData.kidneys;
  let totalKidneys = userKidneys.length;
  let healthyKidneys = 0;
  let unhealthyKidneys = 0;

  for (let index = 0; index < userKidneys.length; index++) {
    if (userKidneys[index].healthy === true) {
      healthyKidneys++;
    } else {
      unhealthyKidneys++;
    }
  }

  let kidneyDetails = {
    "Healthy Kidneys": healthyKidneys,
    "Unhealthy Kidneys": unhealthyKidneys,
    "Total Kidneys": totalKidneys,
  };

  return kidneyDetails;
}

function addKidneyToUser(userName, isHealthy) {
  const user = users.find((user) => user.username === userName);

  if (user) {
    user.kidneys.push({ healthy: isHealthy });
    return true;
  } else {
    return false;
  }
}

function deleteUnHealthyKidneys(userName) {
  const user = users.find((user) => user.username === userName);
  user.kidneys = user.kidneys.filter((kidney) => kidney.healthy);
  return user;
}

app.get("/", function (req, res) {
  const username = req.query.username;
  const user = getUserDetails(username);

  if (user.status === "failed") {
    res.status(411).send(user);
  }

  const kidneyDetails = getUserKidneysDetails(user.data);

  if (kidneyDetails) {
    res.send(
      createRes(
        "success",
        kidneyDetails,
        "Successfully recieved the data of users kidney"
      )
    );
  } else {
    res
      .status(500)
      .send(createRes("failed", [], `Failed to add the kidney to ${username}`));
  }
});

app.post("/", function (req, res) {
  const username = req.body.username;
  const isHealthy = req.body.isHealthy;
  const addKidney = addKidneyToUser(username, isHealthy);
  const kidneyDetails = getUserDetails(username);

  if (kidneyDetails.status === "failed") {
    res.status(411).send(createRes("failed", [], `${username} not found`));
  }

  if (addKidney) {
    res
      .status(200)
      .send(
        createRes(
          "success",
          kidneyDetails.data,
          `Unhealthy kidney has been added to ${username}`
        )
      );
  } else {
    res
      .status(500)
      .send(createRes("failed", [], `Failed to add the kidney to ${username}`));
  }
});

app.put("/", function (req, res) {});

app.delete("/", function (req, res) {
  const username = req.body.username;
  const userDetails = getUserDetails(username);
  const kidneyDetails = getUserKidneysDetails(userDetails.data);
  if (kidneyDetails["Unhealthy Kidneys"] <= 0) {
    res
      .status(400)
      .send(
        createRes("failed", [], "Thier is no unhealthy kidneys in your body")
      );
  } else {
    res.send(deleteUnHealthyKidneys(username));
  }
});

app.listen(3331, function () {
  console.log("Sever is started at: http://localhost:3331/ ");
});
