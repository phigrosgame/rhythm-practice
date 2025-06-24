const helpBtn = document.getElementById('helpBtn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeBtn');
const img1= document.getElementById('img1');
  // 按下說明按鈕顯示彈窗
  helpBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    img1.style.display = 'flex';
  });

  // 按下X關閉彈窗
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    img1.style.display = 'none';
  });

  // 點擊遮罩空白處也關閉（可選）
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      img1.style.display = 'none';
    }
  });