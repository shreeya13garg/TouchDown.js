export function IDAstar(grid, startNode, finishNode,heuristic) 
{
    var string="Manhattan";
    var string2="Diagonal";
    var string3="Euclidean";
    var threshold;
    if(heuristic.localeCompare(string)==0)
    {
        threshold=Math.abs(startNode.row-finishNode.row)+Math.abs(startNode.col-finishNode.col);
        //console.log(threshold);
    }
    else if(heuristic.localeCompare(string2)==0)
    {
        threshold=Math.max(Math.abs(startNode.row-finishNode.row),Math.abs(startNode.col-finishNode.col));
        //console.log(threshold);
    }
    else if(heuristic.localeCompare(string3)==0)
    {
        threshold=Math.sqrt(Math.pow((startNode.row-finishNode.row),2)+Math.pow((startNode.col-finishNode.col),2));
        //console.log(threshold);
    }
    while(1)
    {
        const visitedNodesInOrder = [];
        var ansarray;
        //var depth;
        //console.log(grid);
        visitedNodesInOrder.push(startNode);
        console.log(visitedNodesInOrder);
        ansarray=Find_depth(startNode,0,threshold,finishNode,heuristic,grid,visitedNodesInOrder);
        console.log(ansarray);
        if(Array.isArray(ansarray))
        {
          return ansarray;
        } 
        else
        {
          console.log("update");
          threshold=ansarray;     
        }
    }
} 

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    //console.log(node);
    //console.log(grid);
    const col=node.col;
    const row=node.row;
    //console.log(row);
    //console.log(col);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function Find_depth(node, g, threshold,finishNode,heuristic,grid,visitedNodesInOrder)              
{
    var string="Manhattan";
    var string2="Diagonal";
    var string3="Euclidean";
    var value;
    if(heuristic.localeCompare(string)==0)
    {
        value=Math.abs(node.row-finishNode.row)+Math.abs(node.col-finishNode.col);
        //console.log(value);
    }
    else if(heuristic.localeCompare(string2)==0)
    {
        value=Math.max(Math.abs(node.row-finishNode.row),Math.abs(node.col-finishNode.col));
        //console.log(value);
    }
    else if(heuristic.localeCompare(string3)==0)
    {
        value=Math.sqrt(Math.pow((node.row-finishNode.row),2)+Math.pow((node.col-finishNode.col),2));
        //console.log(value);
    }
    var f=g+value;
    if(f>threshold)
    {              //greater f encountered
        return f;
    }               //Goal node found
    if(finishNode.row==node.row && finishNode.col==node.col)
    {
      return visitedNodesInOrder;
    }
    var min=Infinity;
    const unvisitedNeighbors=getUnvisitedNeighbors(node, grid);
    //console.log(visitedNodesInOrder);
    for (const tempnode of unvisitedNeighbors) 
    {

        //console.log("Hello");
        //sconsole.log(visitedNodesInOrder);
        if(threshold==24)
        {
          console.log(visitedNodesInOrder);
        }
        visitedNodesInOrder.push(tempnode);
        if(tempnode.row==finishNode.row && tempnode.col==finishNode.col)
        {
          return visitedNodesInOrder;
        }
        var num=Math.sqrt(Math.pow((node.row-tempnode.row),2)+Math.pow((node.col-tempnode.col),2));
        var temp=Find_depth(tempnode,g+num,threshold,finishNode,heuristic,grid,visitedNodesInOrder);   //find the minimum of all ‘f’ greater than threshold encountered                                min=temp;
        if(temp<min) 
            min=temp
    }
    
    return min;
     //return the minimum ‘f’ encountered greater than threshold

}
function Search(visitedNodesInOrder,startNode,g,threshold,finishNode,heuristic,grid)
{
        
    const unvisitedNeighbors=getUnvisitedNeighbors(startNode, grid)
    for (const tempnode of unvisitedNeighbors) 
        {

            //recursive call with next node as current node for depth search  //find the minimum of all ‘f’ greater than threshold encountered                                min=temp;
            //console.log(tempnode);
            visitedNodesInOrder.push(tempnode);
            //console.log(visitedNodesInOrder);
            var num=Math.sqrt(Math.pow((startNode.row-tempnode.row),2)+Math.pow((startNode.col-tempnode.col),2));
            if(tempnode.row==finishNode.row && tempnode.col==finishNode.col)
            {
                //console.log("Hurray");
                //console.log(visitedNodesInOrder);
                return visitedNodesInOrder;

            }
            visitedNodesInOrder=Search(visitedNodesInOrder,tempnode,g+num,threshold,finishNode,heuristic,grid); 
            return visitedNodesInOrder;
        }
    
}
