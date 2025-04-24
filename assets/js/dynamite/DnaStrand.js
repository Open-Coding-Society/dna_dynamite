// Define the random bases
const bases = ['A', 'T', 'C', 'G'];

// Helper function to generate a random base
function getRandomBase() {
  return bases[Math.floor(Math.random() * bases.length)];
}

// Helper function to create a randomized sequence of bases for the strands
function generateRandomSequence(length) {
  let sequence = '';
  for (let i = 0; i < length; i++) {
    sequence += getRandomBase();
  }
  return sequence;
}

// Helper function to create missing base pairs
function createMissingPairs(sequence) {
  const missingPairs = [];
  for (let i = 0; i < sequence.length; i++) {
    if (Math.random() > 0.8) { // Random chance to leave a base pair missing
      missingPairs.push(i);
    }
  }
  return missingPairs;
}

// Define the TopStrand and BottomStrand objects
export const TopStrand = {
  id: 'topStrand',
  sequence: generateRandomSequence(50), // Length of the strand
  missingPairs: createMissingPairs(generateRandomSequence(50)),
  position: { x: 0, y: 0 }, // Initial position on page
};

export const BottomStrand = {
  id: 'bottomStrand',
  sequence: generateRandomSequence(50),
  missingPairs: createMissingPairs(generateRandomSequence(50)),
  position: { x: 0, y: 0 },
};

// To animate them moving apart
function moveStrandsApart() {
  TopStrand.position.x = window.innerWidth / 2 - 150; // Example: top strand moves to left
  BottomStrand.position.x = window.innerWidth / 2 + 150; // Bottom strand moves to right
}
