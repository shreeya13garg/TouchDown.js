// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
import _ from "lodash" ;
export function bidijkstra(grid,startNode,finishNode,diagonalallowed){
    const visitedNodesInOrder = [];
    const TempEnd=[];
    const TempStart=[];
    const tempstart = _.cloneDeep(startNode);
    tempstart.distance=0;
    const tempend = _.cloneDeep(finishNode);
    tempend.distance=0;
    TempStart.push(tempstart);
    TempEnd.push(tempend);
    while (TempStart.length>0 && TempEnd.length>0){
        sortNodesByDistance(TempStart);
      const closestNode = TempStart.shift();
      if (closestNode.isWall && closestNode.wallweight==999999) continue ;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.startvisited = true;
      const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors){
        if (neighbor.startvisited) continue ;
        // console.log("Neighbor updating");  
        // closestNode.next=neighbor;
        neighbor.previousNode = closestNode;
          neighbor.startvisited = true;
          neighbor.distance = closestNode.distance + closestNode.wallweight;
          TempStart.push(neighbor);
      }
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) {
          console.log("Hello");
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      if (closestNode.endvisited){
          // console.log("Hi");
        var temp2 = [closestNode];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }
      
      // console.log("Entering another field");
      sortNodesByDistance(TempEnd);
      const closestNodeEnd = TempEnd.shift();
      if (closestNodeEnd.isWall && closestNodeEnd.wallweight==999999) continue ;
      if (closestNodeEnd.distance === Infinity) return visitedNodesInOrder;
      closestNodeEnd.endvisited = true;
      const unvisitedNeighbors2 = getUnvisitedNeighbors(closestNodeEnd, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors2){
        if (neighbor.endvisited) continue ;
         neighbor.next=closestNodeEnd; 
         // neighbor.previousNode = closestNodeEnd;
          neighbor.endvisited = true;
          neighbor.distance = closestNodeEnd.distance + closestNodeEnd.wallweight;
          TempEnd.push(neighbor);
          // console.log("Neighbor updation");
      }
      visitedNodesInOrder.push(closestNodeEnd);
      if (closestNodeEnd === startNode) {
          console.log("Reached End");
        var temp1 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      if (closestNodeEnd.startvisited){
          console.log("Hurrayyyy!!!");
        var temp2 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }
      
      
    }
    while ( TempStart.length>0){
        // console.log("Start side left");
        sortNodesByDistance(TempStart);
      const closestNode = TempStart.shift();
      if (closestNode.isWall && closestNode.wallweight==999999) continue ;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.startvisited = true;
      const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors){
        if (neighbor.startvisited) continue ;
         neighbor.previousNode = closestNode;
          neighbor.startvisited = true;
          neighbor.distance = closestNode.distance + closestNode.wallweight;
          TempStart.push(neighbor);
      }
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) {
        var temp1 = [closestNode];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      if (closestNode.endvisited){
        var temp2 = [closestNode];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }

      
    }
    while (TempEnd.length>0){
        // console.log("End side left");
      sortNodesByDistance(TempEnd);
      const closestNodeEnd = TempEnd.shift();
      if (closestNodeEnd.isWall && closestNodeEnd.wallweight==999999) continue ;
      if (closestNodeEnd.distance === Infinity) return visitedNodesInOrder;
      closestNodeEnd.endvisited = true;
      const unvisitedNeighbors2 = getUnvisitedNeighbors(closestNodeEnd, grid,diagonalallowed);
      for (const neighbor of unvisitedNeighbors2){
        if (neighbor.endvisited) continue ;
        neighbor.next=closestNodeEnd;
          neighbor.endvisited = true;
          neighbor.distance = closestNodeEnd.distance + closestNodeEnd.wallweight;
          TempEnd.push(neighbor);
      }
      visitedNodesInOrder.push(closestNodeEnd);
      if (closestNodeEnd === startNode) {
        var temp1 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp1)
        return visitedNodesInOrder;
      }
      if (closestNodeEnd.startvisited){
        var temp2 = [closestNodeEnd];
        visitedNodesInOrder.unshift(temp2)
        return visitedNodesInOrder;
      }
      
    }
  }
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
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
    return neighbors
  }
  
  
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called after the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  export function bidfsans(node) {

    // return [node];
    console.log(node);
    var ans = [];
    let s = node;  
    let e = node;
    // console.log(s);
    // console.log(e);
    while (s.previousNode !== null && e.next!== null){
      ans.unshift(s.previousNode);
      ans.unshift(e.next);
      s = s.previousNode;
      e = e.next ;
    }
    while (s.previousNode !== null){
        // console.log("Wohooo");
      ans.unshift(s.previousNode);
      s = s.previousNode;
    }
    while (e.next !== null){
      ans.unshift(e.next);
      e = e.next ;
    }
    ans.push(node)
    return ans
  }
  