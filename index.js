const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 8080;

// const videoList =  require('./data/video-details.json');
app.use(express.json());
app.use(cors());

const pullDB = () => {
    return JSON.parse(fs.readFileSync('./data/video-details.json'));
  }
  
  const writeDB = (data) => {
    fs.writeFileSync('./data/video-details.json', JSON.stringify(data));
  }
  


app.get('/videos', (req, res) => {
  let data = pullDB();
  res.json(data);
});

app.get('/videos/:id', (req, res) => {
const videoId = req.params.id;
let rawData = pullDB();

const currentVid = rawData.find(video => video.id === videoId);

if (!currentVid) {
    res.status(404).json({ error: "Video not found"});
}else{
    res.json(currentVid);
}
});


app.listen(port, () => console.log(`Listening on ${port}`));
