const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const youtubedl = require('youtube-dl');
const redis = require("redis");
const client = redis.createClient({ expire: 60 * 60 * 24, detect_buffers: true });

client.on("error", function(error) {
  console.error(error);
});

const video = youtubedl('https://www.youtube.com/watch?v=vedBvGiXw2E', ['--format=22/17/18'], { cwd: __dirname });

app.use(express.json());
app.use(express.static("express"));
app.use(compression());

app.use('/lobby', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-lobi.html'));
});
app.use('/videos', async function(req, res){
  client.get('urlVideos', function(err, reply){
    if(reply==null){
      video.on('info', function (info) {
        client.set('urlVideos', info.url);
        res.send(info.url);
      });
    } else {
      res.send(reply);
    }
  })
});
app.use('/', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
