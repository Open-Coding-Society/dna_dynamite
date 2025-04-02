import { TopStrand, BottomStrand } from './DNAStrand.js';

// Define the objects for the game setup
const objects = [
  // Other objects in your game (platforms, enemies, etc.)
  
  { 
    name: 'topStrand', 
    id: 'topStrand', 
    class: DNAStrand, 
    data: TopStrand, 
    xPercentage: 0.3, 
    yPercentage: 0.5 
  },
  { 
    name: 'bottomStrand', 
    id: 'bottomStrand', 
    class: DNAStrand, 
    data: BottomStrand, 
    xPercentage: 0.7, 
    yPercentage: 0.5 
  },
  // More objects like obstacles, platforms, etc.
];

// GameSetup object containing assets and objects
const assets = {
  // Asset definitions...
};

const GameSetup = {
  tag: 'DNA Game',
  assets: assets,
  objects: objects,
};

export default GameSetup;
