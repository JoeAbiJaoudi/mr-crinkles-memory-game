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
];

let flippedCards = [];
let matchedPairs = 0;
let points = 0;
let totalPairs;
let selectedImages = [];
let timerInterval;

/**
 * Shuffles an array in place.
 * @param {Array} array - The array to shuffle.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //ChatGPT
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Updates the points displayed on the screen.
 */
function updatePoints() {
    points += 10;
    document.getElementById('points').textContent = points;
}

/**
 * Initializes the game board based on the selected difficulty level.
 * @param {string} difficulty - The selected difficulty level (easy, medium, hard).
 */
function initializeGameBoard(difficulty) {
    matchedPairs = 0;
    points = 0;
    document.getElementById('points').textContent = points;
    document.getElementById('game-board').innerHTML = '';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('start-game-container').style.display = 'none';
    document.getElementById('winning-message').style.display = "none";
    document.getElementById('crinkles_head').style.display = 'none';

    //CHATGPT
    if (difficulty === 'easy') {
        selectedImages = allImages.slice(0, 12);
    } else if (difficulty === 'medium') {
        selectedImages = allImages.slice(0, 24);
    } else if (difficulty === 'hard') {
        selectedImages = allImages.slice(0);
    }

    totalPairs = selectedImages.length / 2;
    shuffle(selectedImages);

    const gameBoard = document.getElementById('game-board');

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

/**
 * Handles the card click event. Flips the card and checks for a match.
 * @param {Event} event - The click event on the card.
 */
function handleCardClick(event) {
    const clickedCard = event.currentTarget;
  

    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

/**
 * Checks if the two flipped cards are a match.
 */
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

        card1.classList.add('matched');
        card2.classList.add('matched');

        if (matchedPairs === totalPairs) {
            document.getElementById('winning-message').textContent = "Congratulations! You've matched all the pairs!";
            document.getElementById('winning-message').style.display = "block";
            document.getElementById('start-game-container').style.display = 'flex'; 
            clearInterval(timerInterval);
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

/**
 * Starts the timer for the game and handles timeout.
 * @param {number} duration - The duration of the timer in seconds.
 */
function startTimer(duration) {
    var sec = duration;
    document.getElementById('timer').innerHTML = '00:' + sec;

    timerInterval = setInterval(function() {
        document.getElementById('timer').innerHTML = '00:' + (sec < 10 ? '0' + sec : sec);
        sec--;

        if (sec < 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "Time's up!";
            document.getElementById('start-game-container').style.display = 'flex'; 
            showTimeUpScreen();
        }
    }, 1000);
}

/**
 * Displays the time-up screen.
 */
function showTimeUpScreen() {
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('crinkles_head').style.display = 'flex';
    document.getElementById('winning-message').textContent = "Time ran out! Select start game to try again!";
    document.getElementById('winning-message').style.display = "block";
    document.getElementById('winning-message').style.color = "red";
}

/**
 * Starts the game when the player selects a difficulty level.
 */
document.getElementById('start-game').addEventListener('click', function() {
    const difficulty = document.getElementById('difficulty-select').value;
    initializeGameBoard(difficulty);
    
    if (difficulty === 'easy') {
        startTimer(60);
    } else if (difficulty === 'medium') {
        startTimer(90);
    } else if (difficulty === 'hard') {
        startTimer(120);
    }
});
