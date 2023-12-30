const { randomInt } = require('crypto')
const express = require('express')
const app = express()

// Socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const game = {
  startBoard: "",
  players: {},
  code: "ABCD"
}

const serverPlayers = {}

// command: nodemon backend.js
io.on('connection', (socket) => {
  console.log('a user connected')
  serverPlayers[socket.id] = {
    name: "player",
    color: `hsl(${Math.floor(360*Math.random())}, 100%, 50%)`,
    status: "menu"
  }
  io.emit('currentPlayers', serverPlayers)

  socket.on('disconnect', (reason) => {
    console.log('user disconnected')
    delete serverPlayers[socket.id]
    io.emit('currentPlayers', serverPlayers)
  })

  socket.on('keydown', (key) => {
    switch (key.direction) {
      case 'KeyW':
        serverPlayers[socket.id].y -= 5
        break
      case 'KeyA':
        serverPlayers[socket.id].x -= 5
        break
      case 'KeyS':
        serverPlayers[socket.id].y += 5
        break
      case 'KeyD':
        serverPlayers[socket.id].x += 5
        break
    }
  })

  
  console.log(serverPlayers)
})

setInterval(() => { 
  io.emit('currentPlayers', serverPlayers)
}, 1000)


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('Server running')