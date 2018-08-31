export const BGCOLOR = '#cccccc'

// 15*25   22行，10列
// export const initialMatrix = new Array(15);

// for (let i = 0; i < 15; i++) {
//   initialMatrix[i] = new Array(25).fill(BGCOLOR);
// }

export const BLOCK_UNIT = 30
export const BOARD_WIDTH = 30 * 10
export const BOARD_HEIGHT = 30 * 22
export const GRAPH_NAMES = ['straight', 'square', 'cross', 'leftGun', 'rightGun', 'leftSnake', 'rightSnake']
export const GRAPHS = {
  straight: {
    graph: [
      [1, 1, 1, 1]
    ],
    color: 'red',
  },
  square: {
    graph: [
      [1, 1],
      [1, 1]
    ],
    color: '#00BCD4',
  },
  cross: {
    graph: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'green',
  },
  leftGun: {
    graph: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'orange',
  },
  rightGun: {
    graph: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'yellow',
  },
  leftSnake: {
    graph: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'purple',
  },
  rightSnake: {
    graph: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'brown',
  }
}

export const STATUS = {
  paused: 'paused',
  playing: 'playing',
  over: 'over'
}

function occupied(matrix, i, j) {
  return matrix[i][j] !== BGCOLOR
}

export function getInitialMatrix() {
  const initialMatrix = new Array(22)
  for (let i = 0; i < 22; i++) {
    initialMatrix[i] = new Array(10).fill(BGCOLOR)
  }
  return initialMatrix
}

export function getActualCoordinates(newGraph) {
  const coordinates = []
  const { graph, offsetX, offsetY } = newGraph
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j]) {
        coordinates.push({ x: j + offsetX, y: i + offsetY })
      }
    }
  }
  return coordinates
}

function getMatrixCopy(matrix, coords, color) {
  const matrixCopy = matrix.map((x) => [...x])
  for (let i = 0; i < coords.length; i++) {
    const { x, y } = coords[i]
    matrixCopy[y][x] = color
  }
  return matrixCopy
}

// 方块下落的时候，生成一个新的matrix
export function getNewMatrix(matrix, currentGraph, lines) {
  const coords = getActualCoordinates(currentGraph)
  const matrixCopy = getMatrixCopy(matrix, coords, currentGraph.color)
  lines = typeof lines === 'number' ? lines : getCompletedLines(matrix, currentGraph)
  lines.forEach(line => {
    for (let j = 0; j < 10; j++) {
      matrixCopy[line][j] = BGCOLOR
    }
  })
  const step = lines.length
  for (let row = lines[0] - 1; row >= 0; row--) {
    matrixCopy[row + step] = matrix[row]
  }
  return matrixCopy
}

export function getCompletedLines(matrix, currentGraph) {
  const linesToClear = []
  const coords = getActualCoordinates(currentGraph)
  const matrixCopy = getMatrixCopy(matrix, coords, 'temp')
  const rowSet = new Set()
  coords.forEach(coord => {
    rowSet.add(coord.y)
  })
  const rows = [...rowSet]
  for (let i = 0; i < rows.length; i++) {
    let flag = true
    for (let j = 0; j < 10; j++) {
      if (matrixCopy[rows[i]][j] === BGCOLOR) {
        flag = false
      }
    }
    if (flag) {
      linesToClear.push(rows[i])
    }
  }
  return linesToClear
}

export function checkCollisions(direction, matrix, currentGraph) {
  const currentX = currentGraph.offsetX
  const currentY = currentGraph.offsetY
  let collision = false
  let gameOver = false
  let nx = 0
  let ny = 0
  switch (direction) {
    case 'left':
      nx = -1
      break
    case 'right':
      nx = 1
      break
    case 'down':
      ny = 1
      break
  }
  for (let i = 0; i < currentGraph.graph.length; i++) {
    for (let j = 0; j < currentGraph.graph[i].length; j++) {
      const coord = currentGraph.graph[i][j]
      if (coord) {
        const totalX = nx + currentX + j
        const totalY = ny + currentY + i
        if (totalX < 0 || totalY > 21 || totalX > 9 || occupied(matrix, totalY, totalX)) {
          collision = true
        }
        if (collision && currentY === 0 && direction === 'down') {
          gameOver = true
        }
      }
    }
  }
  return gameOver ? 'GAME_OVER' : collision
}

export function rotate(graph) {
  const rotatedGraph = []
  const row = graph.length
  const col = graph[0].length
  for (let j = 0; j < col; j++) {
    let tempArr = []
    for (let i = 0; i < row; i++) {
      tempArr[row - 1 - i] = graph[i][j]
    }
    rotatedGraph[j] = tempArr
  }
  return rotatedGraph
}

export function getRandomGraph(props = {}) {
  const number = Math.floor(Math.random() * 7)
  const name = GRAPH_NAMES[number]
  return {
    ...GRAPHS[name],
    name,
    ...props
  }
}
