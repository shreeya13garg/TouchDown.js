import React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import Point from "./Point";

const Grid = ({}) => {
  const grid = getInitialGrid();
  console.log(grid);
  return (
    <Canvas
      camera={{ position: [0, 0, 10] }}
      onCreated={({ camera }) => camera.lookAt(100, 100, 4)}
    >
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      {grid.map((row, rowIdx) => {
        return (
          <>
            {row.map((node, nodeIdx) => {
              const { row, col, isWall } = node;
              return (
                <Point
                  key={nodeIdx}
                  col={col}
                  //isFinish={isFinish}
                  //isStart={isStart}
                  isWall={isWall}
                  //mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                  onMouseUp={() => this.handleMouseUp()}
                  row={row}
                ></Point>
                // <mesh position={[col, row, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
                //   <boxBufferGeometry attach="geometry" args={[1, 1, 0]} />
                //   <meshStandardMaterial attach="material" color="white" />
                // </mesh>
              );
            })}
          </>
        );
      })}
    </Canvas>
  );
};

const getInitialGrid = () => {
  const grid = [];
  const numRows = 50;
  const numCols = 50;
  for (let row = 0; row < 50; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, numCols, numRows));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, numCols, numRows) => {
  return {
    col,
    row,
    numRows,
    numCols,
    //isStart: row === START_NODE_ROW && col === START_NODE_COL,
    //isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default Grid;
