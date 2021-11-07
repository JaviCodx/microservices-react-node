const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  try {
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);
  } catch (error) {
    console.error(error);
    res.send({ status: 500 });
  }

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listening on 4005");
});


