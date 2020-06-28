//Original a star implementation
export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = []; //closed list
  startNode.distance = 0;
  const unvisitedNodes = [] //open list
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length>0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    console.log(unvisitedNodes);
    console.log(visitedNodesInOrder);
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) 
    {
      visitedNodesInOrder.push(closestNode);
      return visitedNodesInOrder;
    }  
    updateUnvisitedNeighbors(closestNode, grid,finishNode,unvisitedNodes);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid,finishNode,unvisitedNodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    var value=Math.abs(neighbor.row-finishNode.row)+Math.abs(neighbor.col-finishNode.col);
    var temp= node.distance + 1;
    neighbor.distance=value+temp;
    neighbor.previousNode = node;
    unvisitedNodes.push(neighbor)
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
