// utils/Popups.js
export function showHighScorePopup() {
  const overlay = document.getElementById("highScoreOverlay");
  const popup = document.getElementById("highScorePopup");

  if (overlay && popup) {
    overlay.style.display = "block";
    popup.style.display = "block";
  }
}