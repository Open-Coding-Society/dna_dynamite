// import here
import BaseMoving from './BaseMoving.js'

export default class DragDrop {
    // Define the GameSetup object literal
    static assets = {  
        bases: {
            a: { src: "/images/dna-dynamite/DNAbaseA.png" }
        },
    }

    // defining "game level"
    static objects = [
        { name: 'base', id: 'a', class: BaseMoving, data: DragDrop.assets.bases.a, xPercentage: 0.5, yPercentage: 0.5 },
        // Add more game objects here as needed
    ];

    // Canvas drawing logic
    static canvas = document.getElementById('gameCanvas');
    static ctx = DragDrop.canvas.getContext('2d');

    // Load image for base asset
    static baseImage = new Image();

    static loadAssets() {
        // Set the image source after class initialization
        DragDrop.baseImage.src = DragDrop.assets.bases.a.src;

        DragDrop.baseImage.onload = function() {
            // Draw image at position (50, 50)
            DragDrop.ctx.drawImage(DragDrop.baseImage, 50, 50);
        };
    }
}

// You need to call this method to load the image after the class is ready
DragDrop.loadAssets();
