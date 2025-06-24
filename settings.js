const toggleBtn = document.getElementById('toggleSettings');
const settingsArea = document.getElementById('settingsArea');
const saveBtn = document.getElementById('saveSettings');
const keyInput = document.getElementById('keyInput');
const keyCountInput = document.getElementById('keyCountInput');
const keyInputLabel = document.getElementById('keyInputLabel');       // 新增：紅字標示 span
const keyCountLabel = document.getElementById('keyCountLabel');     // 新增：紅字標示 span
const mapInput = document.getElementById('mapInput');
function flashWarning(elements, labels = []) {
  labels.forEach(label => label.style.display = 'inline');  // 顯示紅字標示
  elements.forEach(el => {
    el.style.transition = 'background-color 0.3s ease';
    el.style.backgroundColor = 'yellow';
  });

  setTimeout(() => {
    elements.forEach(el => {
      el.style.backgroundColor = '';
    });
    labels.forEach(label => label.style.display = 'none');  // 隱藏紅字標示
  }, 1200);
}

toggleBtn.addEventListener('click', () => {
  const game = document.getElementById('gameArea');
  if (game.style.display !== 'none') {
    game.style.display = 'none';
    settingsArea.style.display = 'block';
    toggleBtn.textContent = '返回遊戲區';
  } else {
    game.style.display = 'flex';
    settingsArea.style.display = 'none';
    toggleBtn.textContent = '進入設定區';
  }
});

saveBtn.addEventListener('click', () => {
  const input = keyInput.value.trim();
  const count = Number(keyCountInput.value);

  if (!Number.isInteger(count) || count < 1) {
    alert('請輸入有效的欄位數（1以上整數）');
    flashWarning([keyCountInput], [keyCountLabel]);
    return;
  }

  if (input.length !== count) {
    alert(`按鍵數 (${input.length}) 與欄位數 (${count}) 不符，請重新輸入`);
    flashWarning([keyInput, keyCountInput], [keyInputLabel, keyCountLabel]);
    return;
  }

  const newKeyMap = {};
  input.split('').forEach((k, i) => {
    newKeyMap[k] = i;
  });

  if (typeof setKeyMap === 'function') setKeyPosition(newKeyMap);
  if (typeof setKeyCount === 'function') setKeyCount(count);

  alert(`鍵位已更新為：${input}\n欄位數設定為：${count}`);

  settingsArea.style.display = 'none';
  document.getElementById('gameArea').style.display = 'flex';
  toggleBtn.textContent = '進入設定區';
  
    resetGame();
});
