import { observable, action } from 'mobx'
import { getInitialMatrix, getRandomGraph, checkCollisions, getCompletedLines, getNewMatrix, rotate, STATUS } from '../utils/tetris'
let i = 0
class Tetris {
  loaded = false
  animateId = null
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

  @action initData = () => {
    this.matrix = getInitialMatrix()
    this.currentGraph = getRandomGraph({ offsetX: 3, offsetY: 0 })
    this.nextGraph = getRandomGraph({ offsetX: 1.5, offsetY: 0 })
  }

  handleKeydown = e => {
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

  load = () => {
    this.initData()
    this.startAnimate(Date.now())
    window.addEventListener('keydown', this.handleKeydown)
  }

  startAnimate = startTime => {
    console.log(i++)
    const currentTime = Date.now()
    if (currentTime - startTime >= 500 && this.status === STATUS.playing) {
      startTime = currentTime
      this.moveGraph('down')
    }
    this.animateId = window.requestAnimationFrame(() => this.startAnimate(startTime))
  }

  @action toggleStatus = () => {
    if (!this.loaded) {
      this.status = STATUS.playing
      this.load()
      this.loaded = true
    } else {
      if (this.status === STATUS.paused) {
        this.status = STATUS.playing
        this.startAnimate(Date.now())
      } else if (this.status === STATUS.playing) {
        this.status = STATUS.paused
        window.cancelAnimationFrame(this.animateId)
      } else if (this.status === STATUS.over) {
        this.status = STATUS.playing
        this.load()
      }
    }
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
          window.removeEventListener('keydown', this.handleKeydown)
          window.cancelAnimationFrame(this.animateId)
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
}
export default new Tetris()
