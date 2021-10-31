const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  commentsByPostId[postId] = [
    ...comments,
    {
      id,
      content,
    },
  ];
  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
