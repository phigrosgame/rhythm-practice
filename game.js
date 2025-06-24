const game = document.getElementById('gameArea');
const root = document.documentElement;
const style = getComputedStyle(root);
const visibleRowsStr = style.getPropertyValue('--visible-rows').trim();
const visibleRows = Number(visibleRowsStr);

// 新增可變欄位數，預設4
let keyCount = 4;
let mapIndex = 0;
// 動態 keyMap，預設值保留
let keyPosition = { 'd': 0, 'f': 1, 'j': 2, 'k': 3 };

const stack = [];

function setKeyPosition(newPosition) {
  keyPosition = newPosition;
}

// 新增 setKeyCount 用來調整 keyCount
function setKeyCount(newCount) {
  if (typeof newCount === 'number' && newCount > 0) {
    keyCount = newCount;
  }
}

function createRandomRow() {
  const row = new Array(keyCount).fill(false);
  const laneTrueIndex = Math.floor(Math.random() * keyCount);
  row[laneTrueIndex] = true;
  return row;
}
function createStackFromMap() {
  if (mapInput.value.trim() !== '') {
    const map = mapInput.value.trim().split('').map(ch => {
      if (ch >= 'a' && ch <= 'z') {
        return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
      } else {
        return ch;
      }
    });

    const newStack = [];
      const row = new Array(keyCount).fill(false);
      const laneTrueIndex = map[mapIndex]
      row[laneTrueIndex] = true;
      newStack.push(row);
      mapIndex = (mapIndex+1)%map.length;
      return row;
    }
  }

 
function createRow() {
   if (mapInput.value.trim()!=='') {return createStackFromMap();
}

   return createRandomRow()}
function resetGame() {
  stack.length = 0;
  for (let i = 0; i < visibleRows; i++) {
    stack.unshift(createRow());
  }
  renderNotes();
}

function renderNotes() {
  game.innerHTML = '';
  for (let i = 0; i < stack.length; i++) {
    const row = stack[i];
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    // 動態產生 keyCount 個 cell
    for (let lane = 0; lane < keyCount; lane++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('note-cell');
      if (row[lane]) cellDiv.classList.add('active');
      rowDiv.appendChild(cellDiv);
    }
    game.appendChild(rowDiv);
  }
}

function fallDown() {
  stack.unshift(createRow());
  stack.pop();
}

document.addEventListener('keydown', e => {
  if (game.style.display === 'none') return;

  const lane = keyPosition[e.key];
  if (lane === undefined) return;
  if (stack.length === 0) return;

  const currentRow = stack[stack.length - 1];
  if (currentRow[lane]) {
    currentRow[lane] = false;
    renderNotes();
    fallDown();
    renderNotes();
  }
});

// 初始啟動
resetGame();
