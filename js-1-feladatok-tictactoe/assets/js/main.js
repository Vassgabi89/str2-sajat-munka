//KÖSZÖNÖM A T360 CSAPATÁNAK, HOGY AZ ALKALMAZÁS VÁZÁT A RENDELKEZÉSEMRE BOCSÁTOTTÁK, EZZEL JELENTŐSEN LECSÖKKENTVE A FEJLESZTÉSI IDŐT

const matrix = [];
let stepCount = 0;
const rows = 3;
const cols = 3;
let mark = "O";
const cells = document.querySelectorAll(".cell");
let winnermark;
let wincolor;
const music = document.getElementById("relax");
music.volume = 0.1;

const initState = () => {
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = null;
        }
    }
}

const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const deleteSigns = () => {
    for (let i = 0; i < cells.length; i += 1) {
        cells[i].innerHTML = "";
    }
}

const increaseCounter = () => {
    stepCount++;
}

const modifyCell = (element) => {
    //element.textContent = "<span style='color: red;'>" + mark + "</span>";
    element.textContent = mark;
    element.removeEventListener('click', handleClick);
}

const setMark = () => {
    if (mark == "X") {
        mark = "O"
    } else {
        mark = "X"
    }
}

const handleClick = (event) => {
    increaseCounter();
    setMark();
    modifyCell(event.target);
    changeMatrixValue(event.target);
    checkWinner();
    if (winnermark == '-') {
        mark === 'X' ? setMessage2('Player O is coming:') : setMessage2('Player X is coming:');
    } else {
        setMessage2('');
    }
}

const addClickListener = () => {
    for (let i = 0; i < cells.length; i += 1) {
        cells[i].addEventListener('click', handleClick);
    }
}

const removeAllClickListeners = () => {
    for (let i = 0; i < cells.length; i += 1) {
        cells[i].removeEventListener('click', handleClick);
    }
}

const checkValues = (array) => array.map(row => {
    let wincheck = false;
    if (
        (row[0] == "X" && row[1] == "X" && row[2] == "X") ||
        (row[0] == "O" && row[1] == "O" && row[2] == "O")
    ) {
        wincheck = true;
    }
    return wincheck;
}).indexOf(true) !== -1;

const checkColumnValues = () =>
    checkValues(matrix.map((array, i) =>
        array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
    checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])
    ]);

const checkWinner = () => {
    console.log(checkColumnValues());
    console.log(checkDiagonalValues());
    if (checkValues(matrix) == true || checkColumnValues() == true || checkDiagonalValues() == true) {
        endGame();
    }
}

const setMessage = (message) => {
    const messageDiv = document.querySelector(".message");
    messageDiv.innerHTML = message;
}

const setMessage2 = (message2) => {
    const messageDiv2 = document.querySelector(".message2");
    messageDiv2.innerHTML = message2;
}

const startGame = () => {
    winnermark = '-';
    wincolor = '';
    initState();
    addClickListener();
    newGame();
}

const endGame = () => {
    setMessage2(' ');
    winnermark = mark === 'X' ? 'X' : 'O';
    wincolor = winnermark === 'X' ? 'indianred' : 'seagreen';
    setMessage('The winner is Player <span style = "color:' + wincolor + ';">' + winnermark + '</span>.');
    removeAllClickListeners();
}

const newGame = () => {
    const newGameBtn = document.querySelector("#newGameBtn");
    newGameBtn.addEventListener('click', function () {
        winnermark = '-';
        wincolor = '';
        initState();
        addClickListener();
        deleteSigns();
        setMessage('Playing...');
        setMessage2('');
        mark = "O";
    });
}

startGame();
setMessage2('');