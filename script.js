// Game variables
const allImages = [
    'CrinklePhotos/crinkles1.png', 'CrinklePhotos/crinkles1.png',
    'CrinklePhotos/crinkles2.png', 'CrinklePhotos/crinkles2.png',
    'CrinklePhotos/crinkles3.png', 'CrinklePhotos/crinkles3.png',
    'CrinklePhotos/crinkles4.png', 'CrinklePhotos/crinkles4.png',
    'CrinklePhotos/crinkles5.png', 'CrinklePhotos/crinkles5.png',
    'CrinklePhotos/crinkles6.png', 'CrinklePhotos/crinkles6.png',
    'CrinklePhotos/crinkles7.png', 'CrinklePhotos/crinkles7.png',
    'CrinklePhotos/crinkles8.png', 'CrinklePhotos/crinkles8.png',
    'CrinklePhotos/crinkles9.png', 'CrinklePhotos/crinkles9.png',
    'CrinklePhotos/crinkles10.png', 'CrinklePhotos/crinkles10.png',
    'CrinklePhotos/crinkles11.png', 'CrinklePhotos/crinkles11.png'
]; // All available pairs

let flippedCards = [];
let matchedPairs = 0;
let points = 0;
let totalPairs;
let selectedImages = [];
let timerInterval;

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

// Initialize the game board based on difficulty
function initializeGameBoard(difficulty) {
    matchedPairs = 0;
    points = 0;
    document.getElementById('points').textContent = points;
    document.getElementById('game-board').innerHTML = ''; // Clear the game board
    document.getElementById('game-board').style.display = 'grid'; // Show the game board
    document.getElementById('start-game-container').style.display = 'none'; // Hide start game
    document.getElementById('winning-message').style.display = "none";

    // Set the number of pairs based on the difficulty
    if (difficulty === 'easy') {
        selectedImages = allImages.slice(0, 12); // 6 pairs (12 cards)
    } else if (difficulty === 'medium') {
        selectedImages = allImages.slice(0, 24); // 12 pairs (24 cards)
    } else if (difficulty === 'hard') {
        selectedImages = allImages.slice(0); // 20 pairs (40 cards)
    }

    totalPairs = selectedImages.length / 2; // Set total pairs
    shuffle(selectedImages); // Shuffle the images

    const gameBoard = document.getElementById('game-board');

    // Create card elements based on the selected difficulty
    selectedImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = `${image}`;
        img.alt = `Mr. Crinkles ${index}`;

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
        setTimeout(() => {
            document.getElementById('message').textContent = " ";
        }, 2000);
        updatePoints();

        // Keep the cards face up without hiding them
        card1.classList.add('matched');
        card2.classList.add('matched');

        // Check if all pairs have been matched
        if (matchedPairs === totalPairs) {
            document.getElementById('winning-message').textContent = "Congratulations! You've matched all the pairs!";
            document.getElementById('winning-message').style.display = "block";
            document.getElementById('start-game-container').style.display = 'flex'; 
            clearInterval(timerInterval); // Stop the timer on win
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 500);
    }
}

// Start the timer and handle timeout
function startTimer(duration) {
    var sec = duration; // Set the timer duration
    document.getElementById('timer').innerHTML = '00:' + sec;

    timerInterval = setInterval(function() {
        document.getElementById('timer').innerHTML = '00:' + (sec < 10 ? '0' + sec : sec);
        sec--;

        if (sec < 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "Time's up!";
            document.getElementById('start-game-container').style.display = 'flex'; 
            showTimeUpScreen(); // Show the "time up" screen
        }
    }, 1000); // 1 second interval
}

// Show time-up image and "Try Again" button
function showTimeUpScreen() {
    document.getElementById('game-board').style.display = 'none'; // Hide the game board
    document.getElementById('crinkles_head').style.display = 'block'; //Show crinkles
    document.getElementById('winning-message').textContent = "Time ran out! Select start game to try again!";
    document.getElementById('winning-message').style.display = "block";
    document.getElementById('winning-message').style.color = "red";
}

// Start the game when the player selects a difficulty
document.getElementById('start-game').addEventListener('click', function() {
    const difficulty = document.getElementById('difficulty-select').value;
    initializeGameBoard(difficulty);
    // Set the timer dynamically based on difficulty
    if (difficulty === 'easy') {
        startTimer(60);
    } else if (difficulty === 'medium') {
        startTimer(90);
    } else if (difficulty === 'hard') {
        startTimer(120);
    }
});
