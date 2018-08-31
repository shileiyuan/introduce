import React, { Component } from 'react'
import { Layer, Stage } from 'react-konva'
import { observer } from 'mobx-react'
import { Button } from 'antd'
import Graph from './Graph'
import { STATUS } from '../../utils/tetris'

@observer
class InfoBoard extends Component {
  getStatusText = status => {
    if (status === STATUS.paused) {
      return 'Start'
    } else if (status === STATUS.playing) {
      return 'Pause'
    } else if (status === STATUS.over) {
      return 'Restart'
    }
  }
  render() {
    const { nextGraph, status, score, lines, toggleStatus } = this.props
    return (
      <div className='info-board'>
        <div className='control-btn-wrapper'>
          <Button onClick={toggleStatus}>{this.getStatusText(status)}</Button>
        </div>
        <h2>Next Shape</h2>
        <Stage width={200} height={100}>
          <Layer>
            <Graph {...nextGraph} />
          </Layer>
        </Stage>
        <div className='score'>
          <h2>Score</h2>
          <span>{score}</span>
          <h2>Lines</h2>
          <span>{lines}</span>
        </div>
      </div>
    )
  }
}
export default InfoBoard
