function isReachable(grid,r,c){
    if (-1 < r && -1 < c && r < grid.length && c <grid[0].length){
        if (!grid[r][c].wallweight < 99999999){
            return true
        }
    }
    return false
}
function getneighbors(grid,node,diagonalallowed){
    var neighbors = []; 
    // else{
    var temp = [[-1,0],[0,-1],[0,1],[1,0]]
    // }
    if (diagonalallowed){
        temp.push([-1,-1])
        temp.push([1,-1])
        temp.push([1,1])
        temp.push([-1,1])
    }
    for (var i = 0 ; i< temp.length ; i++){
        var r = node.row+temp[i][0]
        var c = node.col+temp[i][1]
        if (isReachable(grid,r,c)){
            neighbors.push(grid[r][c])
        }
    }
    return neighbors
}
function heuristic(a,b){
    return Math.sqrt((b.row - a.row) ** 2 + (b.col - a.col) ** 2)
}
var Heap = require('heap');
export function Astar(grid,startNode,finishNode,h,diagonalallowed){
    console.log(diagonalallowed)
    var openList = new Heap(function(nodeA, nodeB) {return nodeA.fscore - nodeB.fscore})
    startNode.gscore = 0 ;
    startNode.fscore = 0 ; 
    openList.push(startNode);
    startNode.inopen = true;
    const visitedNodesInOrder = [];
    while (!openList.empty()) {
        var node = openList.pop();
        if (node.isWall && node.wallweight === 99999999) {
            continue ;
        }
        node.inclosed = true;

        visitedNodesInOrder.push(node)
        if (node === finishNode){
            return visitedNodesInOrder;
        }
        var neighbors = getneighbors(grid,node,diagonalallowed)
        for (var i = 0; i<neighbors.length;i++){
            var neighbor = neighbors[i];
            if (!neighbor.inclosed) {
                var r = neighbor.row; var c = neighbor.col ;
                var ng = node.gscore + Math.sqrt((neighbor.row - node.row) ** 2 + (neighbor.col - node.col) ** 2)
                if (!neighbor.inopen || ng < neighbor.gscore) {
                    neighbor.gscore = ng;
                    neighbor.hscore = heuristic(neighbor,finishNode);
                    neighbor.fscore = neighbor.gscore + neighbor.hscore*neighbor.wallweight;
                    neighbor.previousNode = node;

                    if (!neighbor.inopen) {
                        openList.push(neighbor);
                        neighbor.inopen = true;
                    } else {
                        openList.updateItem(neighbor);
                    }
                }
            }
        }
    }
    return visitedNodesInOrder
}

