const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Recievend Event", req.body);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status,
        },
      });
    } catch (error) {
      console.error(err);
    }
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("listening on 4003");
});
