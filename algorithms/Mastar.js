//Original a star implementation
class PriorityQueue {
    constructor() 
    {
      this.maxSize = 10000000;
     // Init an array that'll contain the queue values.
      this.container = [];
    }
  // Checks if queue is empty
  isEmpty() {
    return this.container.length === 0;
  }
  // checks if queue is full
  isFull() {
    return this.container.length >= this.maxSize;
  }
  enqueue(element, priority) {
     if (this.isFull()) {
        console.log("Queue Overflow!");
        return;
     }
     var currElem = new QElement(element, priority); 
     let addedFlag = false;
     // Since we want to add elements to end, we'll just push them.
     for (let i = 0; i < this.container.length; i++) {
        if (currElem.priority < this.container[i].priority) {
           this.container.splice(i, 0, currElem);
           addedFlag = true; 
           break;
        }
     }
     if (!addedFlag) {
        this.container.push(currElem);
     }
  }
  dequeue() 
  {
  // Check if empty
    if (this.isEmpty()) {
      console.log("Queue Underflow!");
      return;
    }
    return this.container.pop();
  }
clear() {
  this.container = [];
  }
}
// Create an inner class that we'll use to create new nodes in the queue
// Each element has some data and a priority
class QElement { 
  constructor(node, priority) 
  { 
      this.element = node; 
      this.priority = priority; 
  } 
} 

export function astar(grid, startNode, finishNode,heuristic) {
  const visitedNodesInOrder = []; //closed list
  startNode.distance = 0;
  var unvisitedNodes = new PriorityQueue();
  unvisitedNodes.enqueue(startNode, 0); 
  //console.log(unvisitedNodes);
  //console.log(unvisitedNodes.container.length);
  while (unvisitedNodes.container.length>0) {
    console.log(unvisitedNodes);
    const closestNode=unvisitedNodes.dequeue();
    // If we encounter a wall, we skip it.
    console.log(closestNode);
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
    updateUnvisitedNeighbors(closestNode, grid,finishNode,unvisitedNodes,heuristic);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
function updateUnvisitedNeighbors(node, grid,finishNode,unvisitedNodes,heuristic) {
  //console.log("Hello");
  //console.log(node);
  //console.log(grid);
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  //console.log(unvisitedNeighbors);
  for (const neighbor of unvisitedNeighbors) 
  {
      var value;
      var string="Manhattan";
      var string2="Diagonal";
      var string3="Euclidean";
      if(heuristic.localeCompare(string)==0)
      {
        value=Math.abs(neighbor.row-finishNode.row)+Math.abs(neighbor.col-finishNode.col);
        //console.log(value);
      }
      else if(heuristic.localeCompare(string2)==0)
      {
        value=Math.max(Math.abs(neighbor.row-finishNode.row),Math.abs(neighbor.col-finishNode.col));
        //console.log(value);
      }
      else if(heuristic.localeCompare(string3)==0)
      {
        value=Math.sqrt(Math.pow((neighbor.row-finishNode.row),2)+Math.pow((neighbor.col-finishNode.col),2));
        //console.log(value);
      }
      var temp= node.element.distance + 1;
      //console.log(value);
      //console.log(temp);
      neighbor.distance=value+temp;
      neighbor.previousNode = node;
      //console.log(neighbor);
      //console.log(neighbor.distance);
      unvisitedNodes.enqueue(neighbor, neighbor.distance); 
      //console.log(unvisitedNodes);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node.element;
  //console.log(col);
  //console.log(row);
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
function return_min(unvisitedNodes)
{
  var min=99999999999999;
  var min_node;
  for(const node in unvisitedNodes)
  {
    if(node.distance<min)
    {
      min=node.distance;
      min_node=node;
      //console.log(min_node);
    }
  }
  return min_node;
}

