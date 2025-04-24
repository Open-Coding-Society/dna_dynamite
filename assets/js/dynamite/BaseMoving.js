import GameObject from './GameObject.js';  // Assuming GameObject.js is in the same directory as BaseMoving.js
import GameEnv from './GameEnv.js';  // Correct the path to point to the "dynamite" folder


export class BaseMoving extends GameObject {
    constructor(canvas, image, data, xPercentage, yPercentage) {
        super(canvas, image, data);
        this.x = xPercentage * GameEnv.innerWidth;
        this.y = yPercentage * GameEnv.innerHeight;
        this.initDraggable();
    }

    initDraggable() {
        this.canvas.setAttribute("draggable", "true");

        this.canvas.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", this.canvas.id);
        });

        this.canvas.addEventListener("dragover", (event) => {
            event.preventDefault(); // Allows the drop event
        });

        this.canvas.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedId = event.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(draggedId);
            if (draggedElement) {
                draggedElement.style.left = `${event.clientX - draggedElement.offsetWidth / 2}px`;
                draggedElement.style.top = `${event.clientY - draggedElement.offsetHeight / 2}px`;
            }
        });
    }

    draw() {
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    size() {
        this.canvas.style.width = "100px"; 
        this.canvas.style.height = "100px"; 
        this.canvas.style.position = "absolute";
        this.canvas.style.left = `${this.x}px`;
        this.canvas.style.top = `${this.y}px`;
    }
}

export default BaseMoving;