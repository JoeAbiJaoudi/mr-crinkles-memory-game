// Game variables
const images = [
    'CrinklePhotos/crinkles1.png', 'CrinklePhotos/crinkles1.png',
    'CrinklePhotos/crinkles2.png', 'CrinklePhotos/crinkles2.png',
    'CrinklePhotos/crinkles3.png', 'CrinklePhotos/crinkles3.png',
    'CrinklePhotos/crinkles4.png', 'CrinklePhotos/crinkles4.png',
    'CrinklePhotos/crinkles5.png', 'CrinklePhotos/crinkles5.png',
    'CrinklePhotos/crinkles6.png', 'CrinklePhotos/crinkles6.png',
    'CrinklePhotos/crinkles7.png', 'CrinklePhotos/crinkles7.png',
    'CrinklePhotos/crinkles8.png', 'CrinklePhotos/crinkles8.png',
    'CrinklePhotos/crinkles9.png', 'CrinklePhotos/crinkles9.png',
    'CrinklePhotos/crinkles10.png', 'CrinklePhotos/crinkles10.png'
]; // List of pairs of images

let flippedCards = [];
let matchedPairs = 0;
let points = 0;
const totalPairs = images.length / 2; // Total number of pairs in the game

// Shuffle the images array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updatePoints() {
    points += 10; // Add 10 points for each match
    document.getElementById('points').textContent = points;
}

// Initialize the game board
function initializeGameBoard() {
    shuffle(images); // Shuffle the images
    const gameBoard = document.getElementById('game-board');

    // Create card elements
    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = `${image}`;
        console.log(`image src`, img.src);
        img.alt = `Mr. Crinkles ${index}`;

        // Add error handling for image loading
        img.onerror = function () {
        console.error(`Failed to load image: ${img.src}`);
        document.getElementById('message').textContent = `Error: Could not load image for card ${index}. Check the file path and try again.`;
        };

        card.appendChild(img);

        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

// Handle card click event
function handleCardClick(event) {
    const clickedCard = event.currentTarget;
    const cardIndex = clickedCard.dataset.index;

    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        matchedPairs++;
        document.getElementById('message').textContent = "It's a match! Keep going!";

        updatePoints();

        setTimeout(() => {
            card1.style.display = 'none';
            card2.style.display = 'none';
        }, 500);


        // Check if all pairs have been matched
        if (matchedPairs === totalPairs) {
            document.getElementById('message').textContent = "Congratulations! You've matched all the pairs!";
            
        }
        
        flippedCards = [];
    } else {
        // Delay flipping back the unmatched cards
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 500);
    }
}


// Initialize the game
initializeGameBoard();
