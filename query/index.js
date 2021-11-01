const express = require("express");

const cors = require("cors");

const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {});

app.post("/events", (req, res) => {
  console.log("Recievend Event", req.body);

  res.send({});
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
