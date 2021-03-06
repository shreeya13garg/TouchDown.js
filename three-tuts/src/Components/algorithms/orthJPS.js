var Heap = require('heap');
function heurestics(a,b,h){
    if (h === 1){
        // Euclidean
       return Math.sqrt((b.row - a.row) ** 2 + (b.col - a.col) ** 2)
    }
    if (h === 2){
        // Manhattan
        return b.row - a.row + b.col - a.col
    }
    if (h === 3){
        // octile
        var a = Math.sqrt(2) - 1
        var dx = b.row - a.row 
        var dy = b.col - a.col
        return dx + dy + (a- 2)*Math.min(dx,dy)

    }
    if (h === 4){
        // chebyshev
        var dx = b.row - a.row 
        var dy = b.col - a.col
        return Math.max(dx,dy)
    }
}
function dblock(cX,cY,dX,dY,grid){
    if (grid[cX-dX][cY].wallweight > 99999998 && grid[cX][cY-dY].wallweight > 99999998){
        return true
    }
    return false
}
function blocked(cX,cY,dX,dY,grid){
    // console.log("check blocked",cX,cY,dX,dY)
    if (cX + dX < 0 || cX +dX >= grid.length){
        return true
    }
    if (cY +dY <0 || cY +dY >= grid[0].length){
        return true
    }
    if (dX !== 0 && dY !== 0){
        if (grid[cX + dX][cY].wallweight > 99999998 && grid[cX][cY+dY].wallweight > 99999998){
            return true
        }
        if (grid[cX + dX][cY + dY].wallweight > 99999998){
            return true
        }
    }
    else{
        if (dX !== 0){
            if (grid[cX+dX][cY].wallweight > 99999998){
                return true
            }
        }
        else{
            if (grid[cX][cY+dY].wallweight > 99999998){
                return true
            }
        }
    }
    return false
}
function direction(a,b){
    var dX = Math.sign(a.row-b.row)
    var dY = Math.sign(a.col-b.col)
    if (a.row-b.row === 0){
        dX = 0
    }
    if (a.col-b.col === 0){
        dY = 0
    }
    return [dX,dY]
}
function nodeNeighbors(node,parent,grid){
    var neighbors = []
    var cX = node.row ; var cY = node.col
    if (parent == null){
        var temp = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
        for (var i = 0 ; i< 8 ; i++){
            var r = temp[i][0]
            var c = temp[i][1]
            if (!blocked(cX,cY,r,c,grid)){
                neighbors.push(grid[cX+r][cY+c])
            }
        }
        return neighbors
    }
    var x = direction(node,parent)
    var dX = x[0] ; var dY = x[1];
    if (dX !== 0 && dY !== 0){
        if (!blocked(cX,cY,0,dY,grid)){
            neighbors.push(grid[cX][cY+dY])
        }
        if (!blocked(cX,cY,dX,0,grid)){
            neighbors.push(grid[cX+dX][cY])
        }
        if ((!blocked(cX, cY, 0, dY, grid) || !blocked(cX, cY, dX, 0, grid)) && (!blocked(cX, cY, dX, dY, grid))){
            neighbors.push(grid[cX+dX][cY+dY])
        }
        if (blocked(cX, cY, -dX, 0, grid) && !blocked(cX, cY, 0, dY, grid) && !blocked(cX, cY, -dX, dY, grid)){
            neighbors.push(grid[cX-dX][cY+dY])
        }
        if (blocked(cX, cY, 0, -dY, grid) && !blocked(cX, cY, dX, 0, grid) && !blocked(cX, cY, dX, -dY, grid)){
            neighbors.push(grid[cX+dX][cY-dY])
        }
    }
    else{
        if (dX === 0){
            if (!blocked(cX, cY, dX, 0, grid)){
                if (!blocked(cX, cY, 0, dY, grid)){
                    neighbors.push(grid[cX][cY+dY])
                }
                if (blocked(cX, cY, 1, 0, grid) && !blocked(cX, cY, 1, dY, grid)){
                    neighbors.push(grid[cX+1][cY+dY])
                }
                if (blocked(cX, cY, -1, 0, grid) && !blocked(cX, cY, -1, dY, grid)){
                    neighbors.push(grid[cX-1][cY+dY])
                }
            }
        }
        else{
            if (!blocked(cX, cY, dX, 0, grid)){
                if (!blocked(cX, cY, dX, 0, grid) && !blocked(cX, cY, dX, 0, grid)){
                    neighbors.push(grid[cX+dX][cY])
                }
                if (blocked(cX, cY, 0, 1, grid) && !blocked(cX, cY, dX, 1, grid)){
                    neighbors.push(grid[cX+dX][cY+1])
                }
                if (blocked(cX, cY, 0, -1, grid) && !blocked(cX, cY, dX, -1, grid)){
                    neighbors.push(grid[cX+dX][dY-1])
                }
            }
        }
    }
    return neighbors
}
function identifySuccessors(node,grid,finishNode){
    var successors = []
    var neighbors = nodeNeighbors(node,node.previousNode,grid)
    for (var i = 0; i<neighbors.length;i++){
        var neighbor = neighbors[i]
        if (neighbor){
            // console.log(neighbor)
            var dX = neighbor.row - node.row
            var dY = neighbor.col - node.col
            var jumpPoint = jump(node.row,node.col,dX,dY,grid,finishNode)
            if (jumpPoint){
                successors.push(jumpPoint)
            }
        }
    }
    return successors
}
function length(curr,jumpPoint,h){
    return heurestics(curr,jumpPoint,h)
}
function jump(cX,cY,dX,dY,grid,finishNode,h){
    var nX = cX + dX; var nY = cY + dY
    if (blocked(nX, nY, 0, 0, grid)){
        return
    }
    if (grid[nX][nY] === finishNode){
        return finishNode;
    }
    var oX = nX ; var oY = nY
    if (dX !== 0 && dY !== 0){
        while (true){
            if ((!blocked(oX, oY, -dX, dY, grid) && blocked(oX, oY, -dX, 0, grid)) || (!blocked(oX, oY, dX, -dY, grid) && blocked(oX, oY, 0, -dY, grid))){
                return grid[oX][oY]
            }
            if (jump(oX, oY, dX, 0, grid, finishNode) || jump(oX, oY, 0, dY, grid, finishNode)){
                return grid[oX][oY]
            }
            oX = oX + dX;
            oY = oY + dY;
            if (blocked(oX, oY, 0, 0, grid)){
                return
            }
            if (dblock(oX, oY, dX, dY, grid)){
                return 
            }
            if (grid[oX][oY] === finishNode){
                return finishNode
            }
        }
    }
    else{
        if (dX !== 0){
            while (true){
                if ((!blocked(oX, nY, dX, 1, grid) && blocked(oX, nY, 0, 1, grid)) || (!blocked(oX, nY, dX, -1, grid) && blocked(oX, nY, 0, -1, grid))){
                    return grid[oX][nY]
                }
                oX = oX + dX
                if (blocked(oX, nY, 0, 0, grid)){
                    return
                }
                if (grid[oX][nY] === finishNode){
                    return finishNode
                }
            }
        }
        else{
            while (true){
                if ((!blocked(nX, oY, 1, dY, grid) && blocked(nX, oY, 1, 0, grid)) || (!blocked(nX, oY, -1, dY, grid) && blocked(nX, oY, -1, 0, grid))){
                    return grid[nX][oY]
                }
                oY = oY + dY
                if (blocked(nX, oY, 0, 0, grid)){
                    return
                }
                if (grid[nX][oY] === finishNode){
                    return finishNode
                }

            }
        }
    }
    return jump(nX, nY, dX, dY, grid, finishNode)
}
export function orthJPS(grid,startNode,finishNode,h){
    var openList = new Heap(function(nodeA, nodeB) {return nodeA.fscore - nodeB.fscore})
    startNode.gscore = 0 ;
    startNode.fscore = 0 ; 
    openList.push(startNode);
    startNode.inopen = true;
    const visitedNodesInOrder = [];
    while (!openList.empty()){
        var node = openList.pop();
        node.inclosed = true;
        visitedNodesInOrder.push(node)
        if (node === finishNode){
            console.log("We have successfully found a path")
            return visitedNodesInOrder;
        }
        var successors = identifySuccessors(node,grid,finishNode);
        for (var i = 0 ;i < successors.length;i++){
            var successor = successors[i];
            if (!successor.inclosed){
                var val = node.gscore + length(node,successor,h)
                if (!successor.inopen || val < successor.gscore){
                    successor.gscore = val;
                    successor.hscore = heurestics(successor,finishNode,h)
                    successor.fscore = successor.gscore + successor.hscore*successor.wallweight
                    successor.previousNode = node
                    if (!successor.inopen){
                        openList.push(successor)
                        successor.inopen = true
                    }
                    else{
                        openList.updateItem(successor)
                    }
                }
            }
        }
    }
    return visitedNodesInOrder
}
export function orthogonalans(finishNode,grid){
    var curr = finishNode
    const nodesInShortestPathOrder = [];
    while (curr !== null){
        if (curr.previousNode){
            var parent = curr.previousNode
            var direc = direction(curr,parent)
            var dX = direc[0] ; var dY = direc[1]
            if ((dX === 0 && dY !== 0)|| (dY === 0 && dX !== 0)){
                if (dY === 1){
                    if (parent.col < curr.col){
                        for (var a = parent.col + 1 ; a<curr.col ; a++){
                            nodesInShortestPathOrder.push(grid[curr.row][a])
                        }
                    }
                    else if (parent.col > curr.col){
                        for (var b = parent.col ; b > curr.col ; b--){
                            nodesInShortestPathOrder.push(grid[curr.row][b])
                        }
                    }
                }
                else{
                    if (parent.row < curr.row){
                        for (var c = parent.row + 1 ; c<curr.row ; c++){
                            nodesInShortestPathOrder.push(grid[c][curr.col])
                        }
                    }
                    else if (parent.row > curr.row){
                        for (var d = parent.row  ; d > curr.row ; d--){
                            nodesInShortestPathOrder.push(grid[d][curr.col])
                        }
                    }
                }
                nodesInShortestPathOrder.push(curr);
                curr = curr.previousNode;
            }
            else{
                var xcord = curr.row ; var ycord = parent.col;
                if (parent.row < curr.row){
                    for (var j = parent.row+1 ; j < xcord+1;j++){
                        nodesInShortestPathOrder.push(grid[j][ycord]);
                    }
                }
                else if (parent.row > curr.row){
                    for (var k = parent.row-1 ; k>xcord +1;k--){
                        nodesInShortestPathOrder.push(grid[k][ycord])
                    }
                }
                if (parent.col < curr.col){
                    for (var l = parent.col+1;l < curr.col ; l++){
                        nodesInShortestPathOrder.push(grid[xcord][l])
                    }
                }
                else if (parent.col > curr.col){
                    for (var m = parent.col-1; m> curr.col ;m--){
                        nodesInShortestPathOrder.push(grid[xcord][m])
                    }
                }
                nodesInShortestPathOrder.push(curr);
                curr = curr.previousNode;
            }
        }
        else{
            nodesInShortestPathOrder.push(curr)
            curr = curr.previousNode
        }
    }
    return nodesInShortestPathOrder

}
