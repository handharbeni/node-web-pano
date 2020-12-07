const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const Youtube = require('youtube-stream-url');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();

const bodyParser = require('body-parser');
const redis = require("redis");
const client = redis.createClient();
const redisStore = require('connect-redis')(session);
const videoUrl = 'https://www.youtube.com/watch?v=vYsNAmc9mHE';
const videoEmbed = 'https://www.youtube.com/watch?v=ckOeCDI2ElU';
const maxTtl = 60 * 60 * 1;
const ttlSession = maxTtl * 3;
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.json());
app.use(express.static("express"));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : ttlSession}),
  saveUninitialized: false,
  resave: false
}))

router.get('/lobby', function(req,res){
  let sess = req.session;
  if(sess.isLoggedIn == true){
    res.sendFile(path.join(__dirname+'/express/index-lobi.html'));
  } else {
    res.redirect('/landing');
  }
});
router.get('/videos-json', async function(req, res){
  Youtube.getInfo({url: videoUrl})
  .then(video => res.send(video));
});
router.get('/live-video', async function(req, res){
  let sess = req.session;
  if(sess.isLoggedIn == true){
    res.sendFile(path.join(__dirname+'/express/index-live.html'));
  } else {
    res.redirect('/landing');
  }
});
router.get('/get-live', async (req, res) => {
  let sess = req.session;
  if(sess.isLoggedIn == true){
    Youtube.getInfo({url: videoEmbed})
    .then(video => {
      var result = {}    
      video.formats.forEach(data => {
        if(data.itag === 22){
          // video
          result.video = data.url;
        } else if(data.itag === 140){
          // audio
          result.audio = data.url;
        }
      });
      res.send(result);
    });
  } else {
    res.redirect('/landing');
  }
})
router.post('/save-session', (req, res) => {
  let sess = req.session;
  var body = req.body

  sess.token = body.token;
  sess.isLoggedIn = body.isLoggedIn;

  console.log(sess);
  sess.save();
  res.send({status: true})
})
router.get('/get-session', (req, res) => {
  let sess = req.session;
  if(sess.isLoggedIn == true){
    res.send({status: true, token: sess.token});
  } else {
    res.send({status: false});
  }
})
router.get('/videos', async (req, res) => {  
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
})
router.get('/wisudawan', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-wisudawan.html'));
})
router.get('/landing', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index.bak.html'));
})
router.get('/game', function(req, res){
  let sess = req.session;
  if(sess.isLoggedIn == true){
    res.sendFile(path.join(__dirname+'/express/index-game.html'));
  } else {
    res.redirect('/landing');
  }
})
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index-countdown.html'));
});
app.use(router);

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
