const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const createServer = (page) => page.resolve(__dirname, 'pages', `${page}.html`)
  if ((req.url = '/')) {
    fs.readFile('./pages/first.html', (err, data) => {
      if (err) {
        console.log(err)
        res.end()
      } else {
        res.write(data)
        res.end()
      }
    })
  }
})

server.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`
  Server has started on port ${PORT}...`)
})
