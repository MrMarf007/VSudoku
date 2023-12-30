class Board {
  constructor(board) {
    this.startboard = board
    this.board = board
  }

  draw() {
    const sudokuBoard = document.querySelector("#board")
    const w = sudokuBoard.clientWidth
    const h = sudokuBoard.clientHeight

    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        const block = document.createElement("div")
        block.setAttribute('class', 'block')
        block.setAttribute('id', 'block')
        for (let k=0; k<9; k++) {
          console.log(board[i])
          const cell = document.createElement("input")
          cell.setAttribute('id', 'cell')
          cell.setAttribute('type', 'number')
          cell.setAttribute('min', '1')
          cell.setAttribute('max', '9')
          block.appendChild(cell)
        }
        sudokuBoard.appendChild(block)
      }
    }
  }
}

class Block {
  constructor(block) {
    this.block = block
  }
}