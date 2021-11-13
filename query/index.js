const express = require("express");
const axios = require("axios");

const cors = require("cors");

const app = express();

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments = [...post.comments, { id, content, status }];
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening on 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");

  res.data.map((event) => {
    console.log("Processing: ", event);
    handleEvent(event.type, event.data);
  });
});
