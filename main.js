/*----- constants -----*/
const startingCells = ["", "", "", "", "", "", "", "", ""]
// const winningCombos = [
//     [0,1,2], [3,4,5], [6,7,8],
//     [0,4,8], [2,4,6]
// const rowWinningCombos
// ]
// const currentBoard = ["", "", "", "", "", "", "", "", ""]
/*----- state variables -----*/
let currentBoard;
let score = {
    O: 0,
    X: 0
}
let winner;
let turn;
// let allOEls = document.querySelectorAll(".O");
// let allXEls = document.querySelectorAll(".X");

/*----- cached elements  -----*/
const gameBoardEl = document.querySelector("#gameboard");
const infoEl = document.querySelector("#info");
const allCellEls = document.querySelectorAll(".cell");
const buttonEl = document.querySelector("button");

/*----- event listeners -----*/
function select(evt) {
    console.log(evt.target);
    evt.target.classList.add(turn);
    evt.target.innerText = turn
    currentBoard[evt.target.id] = turn
    evt.target.removeEventListener("click", select)
    console.log(currentBoard)
    turn = turn === "O"? "X" : "O";
    checkWinner();
    render();
}

buttonEl.addEventListener("click", reset);

/*----- functions -----*/
function init() {
    turn = "O";
    winner = "";
    currentBoard = ["", "", "", "", "", "", "", "", ""]
    startingCells.forEach(function(cell, index) {
        let cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.setAttribute("id", index);
        cellEl.addEventListener("click", select);
        gameBoardEl.append(cellEl);
    })
    render();
}
function renderScore() {
    let oScoreEl = document.querySelector("#o-score");
    let xScoreEl = document.querySelector("#x-score");
    oScoreEl.innerText = `O Score: ${score.O}`
    xScoreEl.innerText = `X Score: ${score.X}`
    
}
function render() {
    renderInfo();
    renderScore();
}
function renderInfo () {
    if (winner === "") {
        infoEl.innerText = `It is now ${turn}'s turn`
    } else infoEl.innerText = "Click restart to play again!"
}
function checkWinner() {
    allOEls = document.querySelectorAll(".O");
    // let arrayOfOs = [...allOEls]
    // console.log(arrayOfOs)
    allXEls = document.querySelectorAll(".X");
    checkDiagonal()
    checkRows()
    // checkColumns()
    if (winner !== "") {
        alert(`congratulations player ${winner}!`)
        score[winner] += 1
    }

}

function checkDiagonal() {
    let diag1 = (currentBoard[0] === currentBoard[4]) && (currentBoard[4] === currentBoard[8]);
    let diag2 = (currentBoard[2] === currentBoard[4]) && (currentBoard[4] === currentBoard[6]);
    if (diag1 || diag2) {  
        winner = currentBoard[4]
    }
}
function checkRows() {
    let row1 = (currentBoard[0] === currentBoard[1]) && (currentBoard[1] === currentBoard[2]);
    let row2 = (currentBoard[3] === currentBoard[4]) && (currentBoard[4] === currentBoard[5]);
    let row3 = (currentBoard[6] === currentBoard[7]) && (currentBoard[7] === currentBoard[8]);
    if (row1) {winner = currentBoard[0]};
    if (row2) {winner = currentBoard[3]};
    if (row3) {winner = currentBoard[6]};
}

function reset() {
    clearGameBoard();
    // gameBoardEl.innerHTML = "";
    init();
    console.log(currentBoard)
    
}

function clearGameBoard () {
    // gameBoardEl = document.querySelector("#gameboard")
    while (gameBoardEl.lastElementChild) {
        gameBoardEl.removeChild(gameBoardEl.lastElementChild);
    }
    // for (let i = 0; i < currentBoard.length; i++) {
        //     currentBoard[i] = "";
        // }
        // currentBoard.forEach(function(string) {
            //     string = "";
            // })
}
    
init();