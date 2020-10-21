// initialize array2d
let startingArray2d = [];
let live = true;
for (let i=0; i<25; i++) {
    let row = [];
    for (let j=0; j<25; j++) {
        row.push(live);
        live = !live;
    }
    startingArray2d.push(row);
}

// clone a 2d array
function array2dClone(array2d) {
    cloneArray = array2d.slice(0);
    for (i=0; i<array2d.length; i++) {
        cloneArray[i] = array2d[i].slice(0);
    }
    return cloneArray;
}

let currentBoard = array2dClone(startingArray2d);
let autoStart = false;

// add all button actions
stepButton.addEventListener("click", step);
resetButton.addEventListener("click", resetBoard);
goButton.addEventListener("click", automaticStart);
pauseButton.addEventListener("click", pause);
randomButton.addEventListener("click", randomBoardGenerator);

function updateBoard(array2d) {
    for (i=0; i<25; i++) {
        let row = board.childNodes[i];
        for (j=0; j<25; j++) {
            let cell = row.childNodes[j];
            if (cell.classList[0] === "dead" & array2d[i][j]) {
                cell.classList = "live";
            } else if (cell.classList[0] === "live" & !array2d[i][j]) {
                cell.classList = "dead";
            }
        }
    }
}

function proceedOneStep() {
    currentBoard = stepBoard(currentBoard);
    updateBoard(currentBoard);

}

function step(){
    if (autoStart) {
        autoStart = false;
        clearInterval(goID);
    }
    proceedOneStep();
}

function automaticStart() {
    if (!autoStart) {
        goID = setInterval(proceedOneStep, 100);
        autoStart = true;
    };
}

function pause() {
    autoStart = false;
    clearInterval(goID);
}

function resetBoard() {
    if (autoStart) {
        autoStart = false;
        clearInterval(goID);
    }
    updateBoard(startingArray2d);
    currentBoard = array2dClone(startingArray2d);
}

function randomBoardGenerator() {
    if (autoStart) {
        autoStart = false;
        clearInterval(goID);
    }
    randomBoard = [];
    for (let i=0; i<25; i++) {
        let row = [];
        for (let j=0; j<25; j++) {
            // add boolean randomly with equal probability
            row.push(Math.random() >= 0.5);
        }
        randomBoard.push(row);
    }

    updateBoard(randomBoard);
    currentBoard = randomBoard;
}