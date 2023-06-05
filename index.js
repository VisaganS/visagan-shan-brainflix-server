const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const { uuid } = require("uuidv4");
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('./public/images'));

const pullDB = () => {
  return JSON.parse(fs.readFileSync("./data/video-details.json"));
};

const writeDB = (data) => {
  fs.writeFileSync("./data/video-details.json", JSON.stringify(data));
};

app.get("/videos", (req, res) => {
  let data = pullDB();
  res.json(data);
});

app.get("/videos/:id", (req, res) => {
  const videoId = req.params.id;
  let rawData = pullDB();

  const currentVid = rawData.find((video) => video.id === videoId);

  if (!currentVid) {
    res.status(404).json({ error: "Video not found" });
  } else {
    res.json(currentVid);
  }
});

app.post("/videos", (req, res) => {
  let data = {id:uuid(), image:"http://localhost:8080/images/image-placeholder.jpg", ...req.body};
  let list = pullDB();
  list.push(data);
  writeDB(list);
  res.send(list);
});

app.listen(port, () => console.log(`Listening on ${port}`));
