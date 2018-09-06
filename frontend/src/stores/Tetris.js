import { observable, action, runInAction } from 'mobx'
import {
  getInitialMatrix,
  getRandomGraph,
  checkCollisions,
  getCompletedLines,
  getNewMatrix,
  rotate,
  STATUS
} from '../utils/tetris'
// let i = 0
class Tetris {
  loaded = false
  mounted = false
  animateId = null
  startMoveStraightDown = false
  animateCtrl = true
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
    this.score = 0
    this.lines = 0
  }

  handleKeydown = e => {
    switch (e.keyCode) {
      case 65:
        e.preventDefault()
        this.moveGraph('left')
        break
      case 74: {
        e.preventDefault()
        this.rotateGraph()
        break
      }
      case 68:
        e.preventDefault()
        this.moveGraph('right')
        break
      case 83:
        e.preventDefault()
        this.moveGraph('down')
        break
      case 75:
        e.preventDefault()
        this.startMoveStraightDown = true
        this.moveStraightDown()
        break
      case 80:
        e.preventDefault()
        this.toggleStatus()
        break
      default:
        break
    }
  }

  moveStraightDown = () => {
    if (!this.startMoveStraightDown) return
    this.moveGraph('down')
    setTimeout(() => {
      this.moveStraightDown()
    }, 10)
  }

  startAnimate = startTime => {
    const currentTime = Date.now()
    if (this.animateCtrl && currentTime - startTime >= 600 && this.status === STATUS.playing) {
      // console.log(i++)
      startTime = currentTime
      this.moveGraph('down')
    }
    this.animateId = window.requestAnimationFrame(() => this.startAnimate(startTime))
  }

  stopAnimate = () => {
    window.cancelAnimationFrame(this.animateId)
  }

  addListener = () => {
    window.addEventListener('keydown', this.handleKeydown)
  }

  removeListener = () => {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  @action unmount = () => {
    this.stopAnimate()
    this.removeListener()
    this.mounted = false
    this.status = STATUS.paused
    this.startMoveStraightDown = false
  }

  @action toggleStatus = () => {
    if (!this.loaded) {
      this.loaded = true
      this.mounted = true
      this.status = STATUS.playing
      this.initData()
      this.startAnimate(Date.now())
    } else if (!this.mounted) {
      this.mounted = true
      this.status = STATUS.playing
      this.startAnimate(Date.now())
    } else {
      if (this.status === STATUS.paused) {
        this.status = STATUS.playing
        this.startAnimate(Date.now())
      } else if (this.status === STATUS.playing) {
        this.status = STATUS.paused
        this.stopAnimate()
      } else if (this.status === STATUS.over) {
        this.status = STATUS.playing
        this.initData()
        this.startAnimate(Date.now())
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
          this.startMoveStraightDown = false
          this.status = STATUS.over
          this.stopAnimate()
        } else {
          this.startMoveStraightDown = false
          const lines = getCompletedLines(this.matrix, this.currentGraph)
          const score = lines.length
          if (score > 0) {
            this.clearLineAnimate(lines)
          } else {
            this.addScore(score)
            this.settleGraph(lines)
          }
        }
        break
      }
    }
  }

  clearLineAnimate = (lines) => {
    this.animateCtrl = false
    setTimeout(() => {
      runInAction(() => {
        lines.forEach(line => {
          this.matrix[line] = this.matrix[line].fill('#eee')
        })
      })
      setTimeout(() => {
        this.addScore(lines.length)
        this.settleGraph(lines)
        this.animateCtrl = true
      }, 500)
    }, 200)
  }

  @action addScore = lines => {
    this.lines += lines
    this.score += Math.pow(lines, 2) * 100
  }

  @action settleGraph = lines => {
    this.matrix = getNewMatrix(this.matrix, this.currentGraph, lines)
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
