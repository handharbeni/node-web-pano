"use strict";

var https = require('https');

var express = require('express');

var path = require('path');

var app = express();

var fs = require('fs');

var compression = require('compression');

var Youtube = require('youtube-stream-url');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var router = express.Router();

var serveIndex = require('serve-index');

var cors = require('cors');

var proxy = require('express-http-proxy');

var bodyParser = require('body-parser');

var redis = require("redis");

var client = redis.createClient();

var redisStore = require('connect-redis')(session);

var videoUrl = 'https://www.youtube.com/watch?v=vYsNAmc9mHE';
var videoEmbed = 'https://www.youtube.com/watch?v=keIt6LJEC44'; // Pi7zMzX-m7Y

var maxTtl = 60 * 60 * 1;
var ttlSession = maxTtl * 3; // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var https_options = {
  key: fs.readFileSync("cert/wisuda2020-prasetiyamulya.com.key"),
  cert: fs.readFileSync("cert/wisuda2020-prasetiyamulya.com.crt"),
  ca: fs.readFileSync("cert/wisuda2020-prasetiyamulya.com.ca")
};
app.use(cookieParser()); // app.use(express.json());

app.use(cors());
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
app.use('/.well-known', express["static"]('.well-known'), serveIndex('.well-known'));
app.use('/proxy', proxy('http://wisuda2020-prasetiyamulya.com:8080/'));
router.get('/lobby', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-lobi.html')); // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.redirect('/');
  // }
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
          res.sendFile(path.join(__dirname + '/express/index-live.html')); // let sess = req.session;
          // if(sess.isLoggedIn == true){
          // } else {
          //   res.redirect('/');
          // }

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
            var len = video.formats.length;
            console.log(len);
            result.video = video.formats[0].url;
            result.audio = video.formats[len - 1].url;
            console.log(result); // video.formats.forEach(data => {
            //   if(data.itag === 133){
            //     // video
            //     result.video = data.url;
            //   } else if(data.itag === 140){
            //     // audio
            //     result.audio = data.url;
            //   }
            // });

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
  res.send({
    status: true
  }); // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.send({status: false});
  // }
}); // router.get('/.well-known/pki-validation/8A8964D5ACA006F4D8BC4E85B5AF35AA.txt', (req, res) => {
//   res.send(`228D92BB9FAC87FD4FAC8AB0C8ABCBDBFB2EDEEC995BF38330DDF10C4ABDD0C1
//   comodoca.com
//   t0678761001608253502`);
// })

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
  res.sendFile(path.join(__dirname + '/express/index.html'));
});
router.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index-game.html')); // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.redirect('/');
  // }
});
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/express/index.html'));
});
app.use(router);
var server = https.createServer(https_options, app);
var port = 443;
server.listen(port);
console.debug('Server listening on port ' + port);