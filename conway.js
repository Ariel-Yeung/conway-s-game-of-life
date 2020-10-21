// Man Yi (Ariel) Yeung
// 10/1/2020
// CS375 Wk2 Assignment

function stepBoard(array2d) {
    // check for empty array
    if (array2d.length < 1) {
        return array2d;
    }

    //check for nested 2d empty array
    if (array2d[0].length < 1) {
        return array2d;
    }

    let rowCount = array2d.length;
    let colCount = array2d[0].length;

    // Count valid living neighbors
    function livingNeighborCounter(currentRowIndex, currentColIndex) {
        let liveNeighborCount = 0;
        let isCell = function(row, col) {
            return row >= 0 & row < rowCount & col >= 0 & col < colCount
        };
        
        let neighborsStep = [[0,1], [1,0],[-1, 0], [0, -1], [1,1], [-1,-1], [1, -1], [-1, 1]];
        for (step of neighborsStep) {
            let neighborRow = currentRowIndex + step[0];
            let neighborCol = currentColIndex + step[1];

            if (isCell(neighborRow, neighborCol)) {
                if (array2d[neighborRow][neighborCol]) {
                    liveNeighborCount ++;
                }
            }
        }
        return liveNeighborCount;
    }

    // identify and store which cells needs to be changed for next round
    let changes = []
    for (i=0; i<rowCount; i++) {
        for (j=0; j<colCount; j++) {
            liveNeighbors = livingNeighborCounter(i,j);
            if (array2d[i][j] & liveNeighbors != 2 & liveNeighbors != 3) {
                changes.push([i,j,false]);
            } else if (!array2d[i][j] & liveNeighbors === 3) {
                changes.push([i,j,true]);
            }
        }
    }

    // make the changes
    for (change of changes){
        array2d[change[0]][change[1]] = change[2];
    }
    
    return array2d;
}