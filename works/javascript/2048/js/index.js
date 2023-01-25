const modal = document.getElementById("modal");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function () {
  modal.style.display = "none";
});

const tabButton = document.getElementById("tab-button");
const tabContent = document.getElementById("tab-content");

tabButton.addEventListener("click", function () {
  if (tabContent.style.display === "block") {
    tabContent.style.maxHeight = "0px";

    console.log(11);
  } else {
    tabContent.style.display = "block";
    tabButton.style.display = "none";
    console.log(12);
    tabContent.style.maxHeight = "1000px";
  }
});

let board = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
let tableID = Array(Array("00", "01", "02", "03"), Array("10", "11", "12", "13"), Array("20", "21", "22", "23"), Array("30", "31", "32", "33"));

console.log(board);
window.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 38: // up
      moveDir(0);
      break;
    case 40: // down
      moveDir(1);
      break;
    case 37: // left
      moveDir(2);
      break;
    case 39: // right
      moveDir(3);
      break;
  }
});

// 초기 설정
init();
function init() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }

  for (let i = 0; i < 2; i++) {
    let randomNum = Math.floor(Math.random() * 16);
    let y = Math.floor(randomNum / 4);
    let x = randomNum % 4;
    if (board[y][x] === 0) board[y][x] = getNewNum();
    else i--;
  }

  update();
}

// 게임 화면 업데이트
function update() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = document.getElementById(tableID[i][j]);
      cell.innerHTML = board[i][j] === 0 ? "" : board[i][j];
      coloring(cell);
    }
  }
}

// 칸 색칠
function coloring(cell) {
  let cellNum = Math.floor(cell.innerHTML);

  switch (cellNum) {
    case 0:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#d4cdc5";
    case 2:
      cell.style.color = "#684A23";
      cell.style.background = "#FBEDDC";
      break;
    case 4:
      cell.style.color = "#684A23";
      cell.style.background = "#F9E2C7";
      break;
    case 8:
      cell.style.color = "#684A23";
      cell.style.background = "#F6D5AB";
      break;
    case 16:
      cell.style.color = "#684A23";
      cell.style.background = "#F2C185";
      break;
    case 32:
      cell.style.color = "#684A23";
      cell.style.background = "#EFB46D";
      break;
    case 64:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#EBA24A";
      break;
    case 128:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E78F24";
      break;
    case 256:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E87032";
      break;
    case 512:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E85532";
      break;
    case 1024:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E84532";
      break;
    case 2048:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E83232";
      break;
    default:
      if (cellNum > 2048) {
        cell.style.color = "#FFFFFF";
        cell.style.background = "#E51A1A";
      } else {
        cell.style.color = "#684A23";
        cell.style.background = "#FBEDDC";
      }
      break;
  }
}

// 보드판 이동 방향에 따른 회전 컨트롤
function moveDir(opt) {
  switch (opt) {
    case 0:
      move();
      break; // ↑ up
    case 1:
      rotate(2);
      move();
      rotate(2);
      break; // ↓ down
    case 2:
      rotate(1);
      move();
      rotate(3);
      break; // ← left
    case 3:
      rotate(3);
      move();
      rotate(1);
      break; // → right
  }

  update();
}

// 보드판 회전
function rotate(n) {
  while (n--) {
    let tempBoard = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        tempBoard[i][j] = board[i][j];
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        board[j][3 - i] = tempBoard[i][j];
      }
    }
  }
}

// 보드판 이동
function move() {
  let isMoved = false;
  let isPlused = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));

  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        continue;
      }

      let tempY = i - 1;

      while (tempY > 0 && board[tempY][j] === 0) {
        tempY--;
      }

      if (board[tempY][j] === 0) {
        board[tempY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } else if (board[tempY][j] != board[i][j]) {
        if (tempY + 1 === i) {
          continue;
        }
        board[tempY + 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } else {
        if (isPlused[tempY][j] === 0) {
          board[tempY][j] *= 2;
          board[i][j] = 0;
          isPlused[tempY][j] = 1;
          isMoved = true;
        } else {
          board[tempY + 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) generate();
  else checkGameOver();
}

// 신규 숫자 생성
function generate() {
  let zeroNum = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        zeroNum++;
      }
    }
  }

  while (true) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          let randomNum = Math.floor(Math.random() * zeroNum);

          if (randomNum === 0) {
            board[i][j] = getNewNum();
            return;
          }
        }
      }
    }
  }
}

// 숫자 생성 확률
function getNewNum() {
  let randomNum = Math.floor(Math.random() * 10);
  if (randomNum === 0) {
    return 4;
  }

  return 2;
}

// 최대 점수 반환
function getMaxNum() {
  let ret = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] > ret) {
        ret = board[i][j];
      }
    }
  }
  return ret;
}

// 게임오버 체크
function checkGameOver() {
  for (let i = 0; i < 4; i++) {
    let colCheck = board[i][0];
    if (colCheck === 0) return;
    for (let j = 1; j < 4; j++) {
      if (board[i][j] === colCheck || board[i][j] === 0) return;
      else colCheck = board[i][j];
    }
  }
  for (let i = 0; i < 4; i++) {
    let rowCheck = board[0][i];
    if (rowCheck === 0) return;
    for (let j = 1; j < 4; j++) {
      if (board[j][i] === rowCheck || board[j][i] === 0) return;
      else rowCheck = board[j][i];
    }
  }
  gameover();
}

// 게임오버 처리
function gameover() {
  alert("[Game Over]\nMax: " + getMaxNum());
  let isTrue = confirm("다시 하시겠습니까?");

  if (isTrue) init();
  else window.close();
}
