/*----- constants -----*/
const startingCells = ["", "", "", "", "", "", "", "", ""]
/*----- state variables -----*/
let xScore;
let oScore;
let winner;
let turn;
/*----- cached elements  -----*/
const gameBoardEl = document.querySelector("#gameboard");
const infoEl = document.querySelector("#info");
const allCellEls = document.querySelectorAll(".cell");
const buttonEl = document.querySelector("button");
const allOEls = document.querySelectorAll(".Os");
const allXEls = document.querySelectorAll(".Xs");

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
    evt.target.removeEventListener("click", select)
    turn = turn === "O"? "X" : "O";
    renderInfo();


}

buttonEl.addEventListener("click", reset);
/*----- functions -----*/
function init() {
    startingCells.forEach(function(cell, index) {
        let cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.setAttribute("id", index);
        cellEl.addEventListener("click", select);
        gameBoardEl.append(cellEl);
        turn = "O"
        renderInfo()
    })
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

function reset() {
    gameBoardEl.innerHTML = "";
    init();
}
