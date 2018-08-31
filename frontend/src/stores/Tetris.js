import { observable, action } from 'mobx'
import { getInitialMatrix, getRandomGraph, checkCollisions, getCompletedLines, getNewMatrix, rotate, STATUS } from '../utils/tetris'

class Tetris {
  @observable matrix = getInitialMatrix()
  @observable status = STATUS.paused
  @observable score = 0
  @observable lines = 0
  @observable currentGraph = {
    name: '',
    graph: [],
    color: '',
    offsetX: 3,
    offsetY: 0
  }
  @observable nextGraph = {
    name: '',
    graph: [],
    color: '',
    offsetX: 1.5,
    offsetY: 0
  }

  @action loadGame = () => {
    this.matrix = getInitialMatrix()
    this.currentGraph = getRandomGraph({ offsetX: 3, offsetY: 0 })
    this.nextGraph = getRandomGraph({ offsetX: 1.5, offsetY: 0 })
    const handleKeydown = e => {
      switch (e.keyCode) {
        case 37:
          e.preventDefault()
          this.moveGraph('left')
          break
        case 38: {
          e.preventDefault()
          this.rotateGraph()
          break
        }
        case 39:
          e.preventDefault()
          this.moveGraph('right')
          break
        case 40:
          e.preventDefault()
          this.moveGraph('down')
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeydown)

    const load = startTime => {
      const currentTime = Date.now()
      if (currentTime - startTime >= 500 && this.status === STATUS.playing) {
        startTime = currentTime
        this.moveGraph('down')
      }
      requestAnimationFrame(() => load(startTime))
    }
    load(Date.now())
  }

  @action moveGraph = direction => {
    if (this.status !== STATUS.playing) return
    const collisionCheck = checkCollisions(direction, this.matrix, this.currentGraph)
    switch (direction) {
      case 'left': {
        if (collisionCheck === false) {
          this.currentGraph.offsetX--
        }
        break
      }
      case 'right': {
        if (collisionCheck === false) {
          this.currentGraph.offsetX++
        }
        break
      }
      case 'down': {
        if (collisionCheck === false) {
          this.currentGraph.offsetY++
        } else if (collisionCheck === 'GAME_OVER') {
          this.status = STATUS.over
        } else {
          const lines = getCompletedLines(this.matrix, this.currentGraph).length
          this.addScore(lines)
          this.settleGraph(this.currentGraph, this.nextGraph, lines)
        }
        break
      }
    }
  }

  @action addScore = lines => {
    this.lines += lines
    this.score += Math.pow(lines, 2) * 100
  }

  @action settleGraph = () => {
    this.matrix = getNewMatrix(this.matrix, this.currentGraph)
    this.currentGraph = {
      ...this.nextGraph,
      offsetX: 3,
      offsetY: 0
    }
    this.nextGraph = getRandomGraph({ offsetX: 1.5, offsetY: 0 })
  }

  @action rotateGraph = () => {
    const rotatedGraph = rotate(this.currentGraph.graph)
    const collision = checkCollisions('rotate', this.matrix, {
      ...this.currentGraph,
      graph: rotatedGraph
    })
    if (collision === false && this.status === STATUS.playing) {
      this.currentGraph.graph = rotatedGraph
    }
  }

  @action toggleStatus = () => {
    if (this.status === STATUS.paused) {
      this.status = STATUS.playing
    } else if (this.status === STATUS.playing) {
      this.status = STATUS.paused
    }
  }
}
export default new Tetris()
