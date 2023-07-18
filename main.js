/*----- constants -----*/
const startingCells = ["", "", "", "", "", "", "", "", ""]
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,4,8], [2,4,6]
// const rowWinningCombos
]
const currentBoard = ["", "", "", "", "", "", "", "", ""]
/*----- state variables -----*/
let xScore;
let oScore;
let winner;
let turn;
let hasWinner;

/*----- cached elements  -----*/
const gameBoardEl = document.querySelector("#gameboard");
const infoEl = document.querySelector("#info");
const allCellEls = document.querySelectorAll(".cell");
const buttonEl = document.querySelector("button");
// const allOEls = document.querySelectorAll(".O");
// const allXEls = document.querySelectorAll(".X");

/*----- event listeners -----*/
// function selectO(evt) {
//     console.log(evt.target);
//     const selectDisplay = document.createElement("div"); 
//     selectDisplay.classList.add("Os");
//     selectDisplay.innerText = "O";
//     evt.target.append(selectDisplay);
//     render()
// }

function select(evt) {
    console.log(evt.target);
    evt.target.classList.add(turn);
    evt.target.innerText = turn
    currentBoard[evt.target.id] = turn
    evt.target.removeEventListener("click", select)
    console.log(currentBoard)
    turn = turn === "O"? "X" : "O";
    renderInfo();
    checkWinner();


}

buttonEl.addEventListener("click", reset);

/*----- functions -----*/
function init() {
    turn = "O";
    winner = "";
    startingCells.forEach(function(cell, index) {
        let cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.setAttribute("id", index);
        cellEl.addEventListener("click", select);
        gameBoardEl.append(cellEl);
    })
    renderInfo();
}
init();

// function render() {
//     allOEls.forEach(function(el) {
//         el.innerText = turn
//     });
//     allXEls.forEach(function(el) {
//         el.innerText = turn
//     })
// }
function renderInfo () {
    infoEl.innerText = `it is now ${turn}'s turn`
}
function checkWinner() {
    checkDiagonal()
    // checkRows()
    // checkColumns()
    if (winner !== "") {alert(`congratulations player ${winner}!`)}
}

function checkDiagonal() {
    let diag1 = (currentBoard[0] === currentBoard[4]) && (currentBoard[4] === currentBoard[8]);
    let diag2 = (currentBoard[2] === currentBoard[4]) && (currentBoard[4] === currentBoard[6]);
    if (diag1 || diag2) {  
        winner = currentBoard[4]
    }
}
function checkRows() {

}

function reset() {
    clearGameBoard();
    // gameBoardEl.innerHTML = "";
    init();
}

function clearGameBoard () {
    // gameBoardEl = document.querySelector("#gameboard")
    while (gameBoardEl.lastElementChild) {
        gameBoardEl.removeChild(gameBoardEl.lastElementChild);
    }
    currentBoard.forEach(function(index) {
        index = "";
    });
    console.log(currentBoard)
}