const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const Youtube = require('youtube-stream-url');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();
const serveIndex = require('serve-index');

const bodyParser = require('body-parser');
const redis = require("redis");
const client = redis.createClient();
const redisStore = require('connect-redis')(session);
const videoUrl = 'https://www.youtube.com/watch?v=vYsNAmc9mHE';
const videoEmbed = 'https://www.youtube.com/watch?v=keIt6LJEC44';
// Pi7zMzX-m7Y
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
app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));

router.get('/lobby', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index-lobi.html'));
  // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.redirect('/');
  // }
});
router.get('/videos-json', async function(req, res){
  Youtube.getInfo({url: videoEmbed})
  .then(video => res.send(video));
});
router.get('/live-video', async function(req, res){
  res.sendFile(path.join(__dirname+'/express/index-live.html'));
  // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.redirect('/');
  // }
});
router.get('/get-live', async (req, res) => {
  Youtube.getInfo({url: videoEmbed})
  .then(video => {
    var result = {}    
    var len = video.formats.length;
    console.log(len);
    result.video = video.formats[0].url;
    result.audio = video.formats[len-1].url;
    console.log(result);
    // video.formats.forEach(data => {
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
  res.send({status: true});
  // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.send({status: false});
  // }
})
// router.get('/.well-known/pki-validation/8A8964D5ACA006F4D8BC4E85B5AF35AA.txt', (req, res) => {
//   res.send(`228D92BB9FAC87FD4FAC8AB0C8ABCBDBFB2EDEEC995BF38330DDF10C4ABDD0C1
//   comodoca.com
//   t0678761001608253502`);
// })
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
  res.sendFile(path.join(__dirname+'/express/index.html'));
})
router.get('/game', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index-game.html'));
  // let sess = req.session;
  // if(sess.isLoggedIn == true){
  // } else {
  //   res.redirect('/');
  // }
})
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
});
app.use(router);

const server = http.createServer(app);
const port = 80;
server.listen(port);
console.debug('Server listening on port ' + port);
