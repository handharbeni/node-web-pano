const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const Youtube = require('youtube-stream-url');

const redis = require("redis");
const client = redis.createClient();
const videoUrl = 'https://www.youtube.com/watch?v=ckOeCDI2ElU';
const videoEmbed = 'https://www.youtube.com/watch?v=McrvrLUyHos';

app.use(express.json());
app.use(express.static("express"));
app.use(compression());

const maxTtl = 60 * 60 * 1;

app.use('/lobby', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-lobi.html'));
});

app.use('/videos-json', async function(req, res){
  Youtube.getInfo({url: videoUrl})
  .then(video => res.send(video));
});

app.use('/live-video', async function(req, res){
  res.sendFile(path.join(__dirname+'/express/index-live.html'));
})

app.use('/get-live', async (req, res) => {
  Youtube.getInfo({url: videoUrl})
  .then(video => {
    res.send(video.formats[2].url);
  });
  // client.get('urlEmbed', (err, data) => {
  //   if (err) throw err;
  //   if (data != null){
  //     res.send(data);
  //   } else {
  //     Youtube.getInfo({url: videoEmbed})
  //     .then(video => {
  //       client.setex('urlEmbed', maxTtl, video.formats[2].url);
  //       res.send(video.formats[2].url);
  //     });
  //   }
  // });
})

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

app.use('/wisudawan', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-wisudawan.html'));
});

app.use('/', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
