/**
 * I'll be using a 3*3 array to represent the board and each
 * click that happens will be applied to the board AND html
 * very simple not too hard lmao lets dooooo thisssssssss
 *
 * 1 will be X
 * 0 will be Y
 * -1 will be an empty slot
 *
 * At the end of each turn check to see if three in a row
 * At the end of each turn check to see if board is full
 * if either of those true popup saying 'game over winner or draw'
 * otherwise keep moving
 */

var currentTurn = true; //if true put down x (1), if false put down y (0)
var currentChar = "X"; //start w X rotate as moves go ^
var turnNum = 0;

var boardArray = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

let htmlBoardArray = document.querySelectorAll(".XnO");
let resetButton = document.getElementById("reset");

htmlBoardArray.forEach(function (elem) {
  elem.addEventListener("click", () => {
    if (elem.innerText.length == 0) {
      //checks if slot isnt taken
      boardArray[parseInt(elem.id.toString().charAt(0))][
        parseInt(elem.id.toString().charAt(1))
      ] = +currentTurn; //sets board to 0 & 1 based on currentTurn bool
      turnNum++;
      if (boardCheck(boardArray, +currentTurn) || middleBox(boardArray)) {
        //check if game won
        window.alert(`Game Over ${currentChar} is the winner`);
        turnNum = 0;
      }
      if (turnNum == 9) {
        //check if draw
        window.alert("Game Over! It's a Draw");
        turnNum = 0;
      }
      if (currentTurn == true) {
        //checks if x
        elem.innerText = currentChar;
        currentChar = "O";
        currentTurn = false;
      } else {
        //checks if O
        elem.innerText = currentChar;
        currentChar = "X";
        currentTurn = true;
      }
    }
    if (turnNum == 0) {
      resetGame(boardArray, htmlBoardArray);
      currentTurn = true;
      currentChar = "X";
    }
    console.log(boardCheck(boardArray, !+currentTurn));
    console.log(boardArray);
  });
});

resetButton.addEventListener("click", () => {
  resetGame(boardArray, htmlBoardArray);
  currentTurn = true;
  currentChar = "X";
  turnNum = 0;
});

function resetGame(array, html) {
  //resets array
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      array[i][j] = -1;
    }
  }
  html.forEach(function (elem) {
    elem.innerText = "";
  });
}

function middleBox(array) {
  if (
    ((array[1][1] == array[0][0] && array[1][1] == array[2][2]) ||
      (array[1][1] == array[0][02] && array[1][1] == array[2][0])) &&
    array[1][1] != -1
  ) {
    return true;
  }
  return false;
}

function boardCheck(array, play) {
  var counter = 0;
  for (i = 0; i < 3; i++) {
    counter = 0;
    for (j = 0; j < 3; j++) {
      if (array[i][j] == play) {
        counter++;
      }
      if (counter == 3) {
        return true;
      }
    }
  }
  //col check
  counter = 0;
  for (i = 0; i < 3; i++) {
    counter = 0;
    for (j = 0; j < 3; j++) {
      if (array[j][i] == play) {
        counter++;
      }
      if (counter == 3) {
        return true;
      }
    }
  }
  return false;
}
