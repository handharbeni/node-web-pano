"use strict";

var http = require('http');

var express = require('express');

var path = require('path');

var app = express();

var compression = require('compression');

var Youtube = require('youtube-stream-url');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var router = express.Router();

var bodyParser = require('body-parser');

var redis = require("redis");

var client = redis.createClient();

var redisStore = require('connect-redis')(session);

var videoUrl = 'https://www.youtube.com/watch?v=ckOeCDI2ElU';
var videoEmbed = 'https://www.youtube.com/watch?v=ckOeCDI2ElU';
var maxTtl = 60 * 60 * 1;
var ttlSession = maxTtl * 3; // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(cookieParser()); // app.use(express.json());

app.use(express["static"]("express"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compression());
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    client: client,
    ttl: ttlSession
  }),
  saveUninitialized: false,
  resave: false
}));
router.get('/lobby', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-lobi.html'));
});
router.get('/videos-json', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Youtube.getInfo({
            url: videoEmbed
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
router.get('/live-video', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.sendFile(path.join(__dirname + '/express/index-live.html'));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/get-live', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          Youtube.getInfo({
            url: videoEmbed
          }).then(function (video) {
            var result = {};
            video.formats.forEach(function (data) {
              if (data.itag === 22) {
                // video
                result.video = data.url;
              } else if (data.itag === 140) {
                // audio
                result.audio = data.url;
              }
            });
            res.send(result);
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/save-session', function (req, res) {
  var sess = req.session;
  var body = req.body;
  sess.token = body.token;
  sess.isLoggedIn = body.isLoggedIn;
  console.log(sess);
  sess.save();
  res.send({
    status: true
  });
});
router.get('/get-session', function (req, res) {
  var sess = req.session;

  if (sess.isLoggedIn === 'true') {
    res.send({
      status: true,
      token: sess.token
    });
  } else {
    res.send({
      status: false
    });
  }
});
router.get('/videos', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
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
          return _context4.stop();
      }
    }
  });
});
router.get('/wisudawan', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-wisudawan.html'));
});
router.get('/landing', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index.bak.html'));
});
router.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-game.html'));
});
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-countdown.html'));
});
app.use(router);
var server = http.createServer(app);
var port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);