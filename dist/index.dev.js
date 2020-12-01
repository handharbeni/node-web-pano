"use strict";

var http = require('http');

var express = require('express');

var path = require('path');

var app = express();

var compression = require('compression');

var Youtube = require('youtube-stream-url');

var redis = require("redis");

var client = redis.createClient();
var videoUrl = 'https://www.youtube.com/watch?v=ckOeCDI2ElU';
app.use(express.json());
app.use(express["static"]("express"));
app.use(compression());
var maxTtl = 60 * 60 * 3;
app.use('/lobby', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-lobi.html'));
});
app.use('/videos-json', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Youtube.getInfo({
            url: videoUrl
          }).then(function (video) {
            return res.send(video);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.use('/videos', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          client.get('urlVideos', function (err, data) {
            if (err) throw err;

            if (data != null) {
              res.send(data);
            } else {
              Youtube.getInfo({
                url: videoUrl
              }).then(function (video) {
                client.setex('urlVideos', maxTtl, video.formats[2].url);
                res.send(video.formats[2].url);
              });
            }
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.use('/wisudawan', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-wisudawan.html'));
});
app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index.html'));
});
var server = http.createServer(app);
var port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);