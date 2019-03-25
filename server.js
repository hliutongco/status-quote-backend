const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const Score = require('./api/models/scoreModel')

const cors = require('cors');
app.use(cors({ credentials: true, origin:true }));

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)

// mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/statusquote', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const scoreRoutes = require('./api/routes/scoreRoutes'); //importing route
scoreRoutes(app); //register the route

// Below is the video hosting code

function helper(req, res, path){
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

app.get('/clip1', function(req, res) {
  const path = 'assets/crying-min.mp4'
  helper(req, res, path)
})

app.get('/clip2', function(req, res) {
  const path = 'assets/jaws.mp4'
  helper(req, res, path)
})

app.get('/clip3', function(req, res) {
  const path = 'assets/roads-min.mp4'
  helper(req, res, path)
})

app.get('/clip4', function(req, res) {
  const path = 'assets/terminator.mp4'
  helper(req, res, path)
})

app.get('/clip5', function(req, res) {
  const path = 'assets/the-truth-min.mp4'
  helper(req, res, path)
})

app.get('/clip6', function(req, res) {
  const path = 'assets/wizard-of-oz.mp4'
  helper(req, res, path)
})

app.get('/clip7', function(req, res) {
  const path = 'assets/yoda-min.mp4'
  helper(req, res, path)
})

app.get('/clip8', function(req, res) {
  const path = 'assets/planet-of-the-apes.mp4'
  helper(req, res, path)
})

app.get('/clip9', function(req, res) {
  const path = 'assets/apollo-13.mp4'
  helper(req, res, path)
})

app.get('/clip10', function(req, res) {
  const path = 'assets/lotr.mp4'
  helper(req, res, path)
})

server.listen(3000, function () {
  console.log('Listening on port 3000!')
})
