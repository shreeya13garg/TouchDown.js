//Original implementation of Best First Search
export function IBestfs(grid, startNode, finishNode,heuristic,diagonalallowed) {
    const visitedNodesInOrder = []; //closed list
    startNode.distance = 0;
    const unvisitedNodes = []; //open list
    unvisitedNodes.push(startNode);
    while (unvisitedNodes.length>0) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall && closestNode.wallweight==99999999) continue;
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
      updateUnvisitedNeighbors(closestNode, grid,finishNode,unvisitedNodes,heuristic,diagonalallowed,closestNode.wallweight);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid,finishNode,unvisitedNodes,heuristic,diagonalallowed,wallweight) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid,diagonalallowed);
    for (const neighbor of unvisitedNeighbors) {
      console.log(finishNode.col);
      console.log(neighbor.col);
      var value;
      var string="Manhattan";
      var string2="Diagonal";
      var string3="Euclidean";
      var string4="Octile";
      var string5="Chebyshev";
      if(heuristic.localeCompare(string)==0)
      {
        value=Math.abs(neighbor.row-finishNode.row)+Math.abs(neighbor.col-finishNode.col);
        console.log(value);
      }
      else if(heuristic.localeCompare(string2)==0)
      {
        value=Math.max(Math.abs(neighbor.row-finishNode.row),Math.abs(neighbor.col-finishNode.col));
        console.log(value);
      }
      else if(heuristic.localeCompare(string3)==0)
      {
        value=Math.sqrt(Math.pow((neighbor.row-finishNode.row),2)+Math.pow((neighbor.col-finishNode.col),2));
        console.log(value);
      }
      else if(heuristic.localeCompare(string4)==0)
      {
        var x_dist=Math.abs(neighbor.row-finishNode.row);
        var y_dist=Math.abs(neighbor.col-finishNode.col);
        value=Math.max(x_dist,y_dist)+(Math.sqrt(2)-1) * Math.min(x_dist,y_dist);
        console.log(value);
      }
      else if(heuristic.localeCompare(string5)==0)
      {
        value=Math.max(Math.abs(neighbor.row-finishNode.row),Math.abs(neighbor.col-finishNode.col));
        console.log(value);
      }
      neighbor.distance=wallweight*value;
      neighbor.previousNode = node;
      neighbor.isVisited = true;
      unvisitedNodes.push(neighbor);
    }
  }
  
  function getUnvisitedNeighbors(node, grid,diagonalallowed) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (diagonalallowed){
      if (row > 0 && col > 0) neighbors.push(grid[row-1][col-1]);
      if (row > 0 && col < grid[0].length - 1) neighbors.push(grid[row-1][col+1]);
      if (row <  grid.length - 1 && col > 0 ) neighbors.push(grid[row+1][col-1]);
      if (row <  grid.length - 1 && col < grid[0].length - 1) neighbors.push(grid[row+1][col+1]);
      
    }
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
  