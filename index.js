const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const axios = require('axios');
const youtubedl = require('youtube-dl');
const video = youtubedl('https://www.youtube.com/watch?v=vedBvGiXw2E', ['--format=136/137/mp4/bestvideo'], { cwd: __dirname });

app.use(express.json());
app.use(express.static("express"));
app.use(compression());

app.use('/lobby', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-lobi.html'));
});
app.use('/videos', async function(req, res){
  video.on('info', function(info) {
    res.send(info.url);
  })
});
app.use('/', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index.html'), data);
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
