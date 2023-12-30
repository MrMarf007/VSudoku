const puzzle = document.querySelector('#puzzle')

const board = new Board("000000000000000000000000000000000000000000000000000000000000000000000000000000000")
const myPlayers = {}

const socket = io()
socket.on('currentPlayers', (serverPlayers) => {
  console.log(serverPlayers)
  for (const id in serverPlayers) {
    const serverPlayer = serverPlayers[id]

    if (!myPlayers[id]) {
      myPlayers[id] = new Player({
        x: serverPlayer.x, y: serverPlayer.y, radius: 12, color: serverPlayer.color})
    }
  }

  for (const id in myPlayers) {
    if (!serverPlayers[id]) {
      delete myPlayers[id]
    } else {
      myPlayers[id].x = serverPlayers[id].x
      myPlayers[id].y = serverPlayers[id].y
      myPlayers[id].color = serverPlayers[id].color
    }
  }
})

let animationId
function animate() {
  board.draw()
}
animate()
