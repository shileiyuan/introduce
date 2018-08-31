import React from 'react'
import { Rect, Group } from 'react-konva'
import { getActualCoordinates, BLOCK_UNIT } from '../../utils/tetris'

class Graph extends React.Component {
  render() {
    const { graph, color, offsetX, offsetY } = this.props
    const coordinates = getActualCoordinates({ graph, offsetX, offsetY })
    return (
      <Group>
        {
          coordinates.map(({ x, y }) => (
            <Rect
              key={`${x}${y}`}
              width={BLOCK_UNIT}
              height={BLOCK_UNIT}
              x={x * BLOCK_UNIT}
              y={y * BLOCK_UNIT}
              fill={color}
              stroke='black'
              strokeWidth={1}
            />
          ))
        }
      </Group>
    )
  }
}

export default Graph
