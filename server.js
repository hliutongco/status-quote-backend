const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

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
  const path = 'assets/roads-min.mp4'
  helper(req, res, path)
})

app.get('/clip3', function(req, res) {
  const path = 'assets/the-truth-min.mp4'
  helper(req, res, path)
})

app.get('/clip4', function(req, res) {
  const path = 'assets/yoda-min.mp4'
  helper(req, res, path)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
