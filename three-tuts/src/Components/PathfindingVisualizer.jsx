import React, { Component } from "react";
import { Astar } from "./algorithms/astar";
import { Bestfs } from "./algorithms/Bestfs";
import { bfs } from "./algorithms/bfs";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { Iastar } from "./algorithms/Iastar";
import { IBestfs } from "./algorithms/IBestfs";
import { IDAstar } from "./algorithms/IDAstar";
import { jps, jpsans } from "./algorithms/jps";
import { orthJPS, orthogonalans } from "./algorithms/orthJPS";
import { Orth_Astar } from "./algorithms/orth_astar";
import Node from "./Node";
import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualize() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(visitedNodesInOrder);
    console.log(nodesInShortestPathOrder);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeIntelligentAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
    const visitedNodesInOrder = Iastar(grid, startNode, finishNode, heuristic);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(visitedNodesInOrder);
    console.log(nodesInShortestPathOrder);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBestfs() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
    const visitedNodesInOrder = Bestfs(grid, startNode, finishNode, heuristic);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(visitedNodesInOrder);
    console.log(nodesInShortestPathOrder);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeIBestfs() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
    const visitedNodesInOrder = IBestfs(grid, startNode, finishNode, heuristic);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(visitedNodesInOrder);
    console.log(nodesInShortestPathOrder);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeIDAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var heuristic = "Manhattan";
    const visitedNodesInOrder = IDAstar(grid, startNode, finishNode, heuristic);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(visitedNodesInOrder);
    console.log(nodesInShortestPathOrder);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeOrthAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Orth_Astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeJPS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = jps(grid, startNode, finishNode);
    const nodesInShortestPathOrder = jpsans(finishNode, grid);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeOrthJPS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = orthJPS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = orthogonalans(finishNode, grid);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS Algorithm
        </button>
        <button onClick={() => this.visualizeAstar()}>
          Visualize Astar Algorithm
        </button>
        <button onClick={() => this.visualizeOrthAstar()}>
          Visualize Orthogonal Astar(diagonals not allowed) Algorithm
        </button>
        <button onClick={() => this.visualizeJPS()}>
          Visualize JPS Algorithm
        </button>
        <button onClick={() => this.visualizeOrthJPS()}>
          Visualize OrthJPS Algorithm
        </button>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeIntelligentAstar()}>
          Visualize Intelligent A star algorithm
        </button>
        <button onClick={() => this.visualizeBestfs()}>
          Visualize Best First Search Algorithm
        </button>
        <button onClick={() => this.visualizeIBestfs()}>
          Visualize Intelligent Best First Search
        </button>
        <button onClick={() => this.visualizeIDAstar()}>
          Visualize IDA star
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
