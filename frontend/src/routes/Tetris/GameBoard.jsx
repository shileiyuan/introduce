import React, { Component } from 'react'
import { Layer, Stage, Rect, Group } from 'react-konva'
import { observer } from 'mobx-react'
import { BGCOLOR, BOARD_WIDTH, BOARD_HEIGHT, BLOCK_UNIT } from '../../utils/tetris'
import Graph from './Graph'

@observer
class GameBoard extends Component {
  render() {
    const { matrix, currentGraph } = this.props
    const arr = []
    // i指的是在第几行，也就是纵坐标
    matrix.forEach((val, i) => {
      val.forEach((color, j) => {
        if (color !== BGCOLOR) {
          const key = JSON.stringify({ x: j, y: i })
          arr.push(<Rect key={key} width={BLOCK_UNIT} height={BLOCK_UNIT} x={j * BLOCK_UNIT} y={i * BLOCK_UNIT} fill={color} stroke='black' strokeWidth={1} />)
        }
      })
    })
    return (
      <div className='game-board'>
        <Stage width={BOARD_WIDTH} height={BOARD_HEIGHT}>
          <Layer>
            <Graph {...currentGraph} />
            <Group>{arr}</Group>
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default GameBoard
