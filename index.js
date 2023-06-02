const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const videoList =  require('./data/video-details.json');

app.use(express.json());
app.use(cors());

app.get('/videos', (req, res) => {
  res.json(videoList);
});

app.get('/videos/:id', (req, res) => {
const videoId = req.params.id;
const currentVid = videoList.find(video => video.id === videoId);

if (!currentVid) {
    res.status(404).json({ error: "Video not found"});
}else{
    res.json(currentVid);
}
});


app.listen(port, () => console.log(`Listening on ${port}`));
