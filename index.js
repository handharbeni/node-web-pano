const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const Youtube = require('youtube-stream-url');

const redis = require("redis");
const client = redis.createClient();
const videoUrl = 'https://www.youtube.com/watch?v=ckOeCDI2ElU';

app.use(express.json());
app.use(express.static("express"));
app.use(compression());

const maxTtl = 60 * 60 * 3;

app.use('/lobby', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-lobi.html'));
});

app.use('/videos-json', async function(req, res){
  Youtube.getInfo({url: videoUrl})
  .then(video => res.send(video));
});

app.use('/videos', async (req, res) => {
  client.get('urlVideos', (err, data) => {
    if (err) throw err;
    if (data != null){
      res.send(data);
    } else {
      Youtube.getInfo({url: videoUrl})
      .then(video => {
        client.setex('urlVideos', maxTtl, video.formats[2].url);
        res.send(video.formats[2].url);
      });      
    }
  });
});

app.use('/', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
