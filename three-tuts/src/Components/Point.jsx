import React, { Component } from "react";

//import './point.css';

export default class Point extends Component {
  render() {
    const {
      col,
      numRows,
      numCols,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;

    // const extraClassName = isFinish
    //   ? 'node-finish'
    //   : isStart
    //   ? 'node-start'
    //   : isWall
    //   ? 'node-wall'
    //   : '';

    return (
      <mesh position={[col, row, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 0]} />
        <meshStandardMaterial attach="material" color="#fff" />
      </mesh>
    );
  }
}
