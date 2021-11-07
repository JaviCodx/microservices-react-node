const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  commentsByPostId[postId] = [...comments, { id, content, status: "pending" }];

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      status: "pending",
      postId,
    },
  });
  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  console.log("Recievend Event", req.body);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    {
    }
    comment.status = status;
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: { id, status, postId, content },
      });
    } catch (error) {
      console.error(error);
    }
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
