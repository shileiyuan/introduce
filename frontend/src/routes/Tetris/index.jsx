import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'
import GameBoard from './GameBoard'
import InfoBoard from './InfoBoard'

@inject('tetrisStore')
@observer
class Tetris extends Component {
  componentDidMount() {
    // this.props.tetrisStore.loadGame()
  }
  render() {
    const { matrix, currentGraph, nextGraph, status, score, lines, toggleStatus } = this.props.tetrisStore
    return (
      <div className='tetris'>
        <GameBoard matrix={matrix} currentGraph={currentGraph} />
        <InfoBoard
          status={status}
          score={score}
          lines={lines}
          nextGraph={nextGraph}
          toggleStatus={toggleStatus}
        />
      </div>
    )
  }
}

export default Tetris
