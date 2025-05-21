export function closeHighScorePopup() {
    const overlay = document.getElementById("highScoreOverlay");
    const popup = document.getElementById("highScorePopup");

    if (overlay && popup) {
      overlay.style.display = "none";
      popup.style.display = "none";
    }
}