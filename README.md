# Mr. Crinkles Memory Game

### Video Demo
[Watch the Demo on YouTube](https://youtu.be/SeH1uGlo9ms)

### Live Site
[Play the Game Live](https://joeabijaoudi.github.io/mr-crinkles-memory-game)

## Overview
Mr. Crinkles Memory Game is an engaging browser-based memory game designed for users of all ages. The goal of the game is to find and match pairs of cards featuring different images of Mr. Crinkles within a limited time. This game challenges both memory and time management skills, as players must race against the clock to complete the board. The game offers three difficulty levels—Easy, Medium, and Hard—each with an increasing number of card pairs and an extended timer. The game is responsive, meaning it works seamlessly across a wide range of devices, from desktop computers to mobile phones.

This project was built using HTML, CSS, and JavaScript. It focuses on DOM manipulation, event handling, and the use of responsive web design principles to ensure a smooth experience across various screen sizes.

### Key Features
1. **Multiple Difficulty Levels**:
   - Easy: 6 pairs of cards and a 60-second timer.
   - Medium: 12 pairs of cards and a 90-second timer.
   - Hard: 20 pairs of cards and a 120-second timer.

2. **Responsive Layout**: The design adapts fluidly across different devices, ensuring a playable and enjoyable experience whether the user is on a large desktop screen or a small mobile device.

3. **Points System**: Players earn points for each successful match, with each pair matched earning 10 points. The final score is displayed at the end of the game when all pairs have been matched.

4. **Persistent Cards**: Matched pairs stay flipped face-up, giving players a visual cue to track their progress throughout the game.

5. **Winning and Time-Out Messages**: The game provides clear feedback, congratulating players when they successfully match all pairs or showing a "time's up" message if they fail to complete the board before the timer runs out.

### Files and Code Explanation

1. **index.html**:
   The `index.html` file serves as the skeleton of the application. It contains the HTML structure, such as the game board, dropdown for difficulty selection, and buttons for starting the game. The layout of the page is built with semantic HTML tags, ensuring accessibility and proper structure. This file links to `style.css` for the presentation layer and `script.js` for the game’s logic and interactions.

2. **style.css**:
   This file contains all of the styling for the game. It uses modern CSS features like Flexbox and CSS Grid to ensure that the layout is responsive. Each component, such as the game board, difficulty selection, and start game button, has been styled to look visually appealing and work well on devices of various screen sizes. Additionally, media queries have been used to ensure the game adapts to smaller screens, such as tablets and mobile phones, by adjusting font sizes, button sizes, and the arrangement of elements. The use of shadows, hover effects on buttons, and subtle background colors enhances the user experience by giving the page a more interactive feel.

3. **script.js**:
   This is the most critical file in the project, as it handles the game’s logic and functionality. It is divided into several key functions:

   - **shuffle(array)**: Randomizes the order of the card images for every new game. This ensures that each game session is different, adding replayability.

   - **initializeGameBoard(difficulty)**: Responsible for setting up the game board based on the selected difficulty level. It generates the appropriate number of card pairs, arranges them on the board, and initializes the timer and scoring system.

   - **handleCardClick(event)**: Manages what happens when a player clicks on a card. It checks whether the card can be flipped, stores the clicked card, and calls the matching function if two cards have been flipped.

   - **checkForMatch()**: Compares the two flipped cards to see if they match. If they do, they remain face-up. If they don’t, they flip back after a short delay. The function also tracks the number of matched pairs and, if all pairs have been matched, triggers the win condition.

   - **startTimer(duration)**: Starts a countdown timer based on the selected difficulty level. When time runs out, the game ends, and a message is displayed.

   - **showTimeUpScreen()**: Displays a message when the player runs out of time, providing feedback and the option to restart the game.

   The code is designed to be modular and maintainable. Each function is kept relatively small, with a single responsibility, making the code easier to debug and extend in the future.

4. **CrinklePhotos Folder**:
   This folder contains all the images used for the cards in the game. Each image is of Mr. Crinkles, ensuring that the game has a consistent and light-hearted theme. The images are loaded dynamically through the `script.js` file and are displayed randomly during each game session.

### Design Choices
Several design choices were debated and ultimately shaped the current version of the game. One significant decision was how to handle the cards once they were matched. Initially, matched cards were removed from the board, but it was later decided to leave the cards flipped face-up instead. This choice helps users visually track their progress and makes the game more engaging, as seeing their progress can motivate players to complete the game.

The difficulty levels were also carefully calibrated. In the early stages of development, the timer for each difficulty level was more lenient, allowing players more time to match cards. After playtesting, it became clear that reducing the timer made the game more exciting and provided a better challenge without being too frustrating.

Another choice was the card flipping animation. While it was considered to add more complex animations for flipping cards, the simplicity of a quick flip was prioritized to maintain the game's snappy, responsive feel, especially for mobile devices where performance could be a concern.

### Future Enhancements
Several potential improvements and features have been considered for future versions of Mr. Crinkles Memory Game:

- **Leaderboard**: A scoring leaderboard could be implemented to store the best times and scores, allowing players to compete against themselves or others.
- **Sound Effects**: Adding audio cues for flipping cards, matching pairs, and timeouts could improve the user experience and make the game more immersive.
- **Card Animations**: Implementing smoother or more elaborate animations when flipping cards and showing matches could enhance the overall aesthetic.
- **Multiple Themes**: Different sets of images could be offered as themes, allowing players to choose from different versions of the game (e.g., animal images, cartoon characters, etc.).

### Conclusion
Mr. Crinkles Memory Game is a simple yet challenging game that is fun for all ages. With a clear design, responsive layout, and engaging gameplay, it offers players a chance to test their memory and quick thinking. The project showcases the use of modern web technologies, including HTML, CSS, and JavaScript, to create an interactive, browser-based game. There are many opportunities for extending the game with new features, and the project serves as a strong foundation for future development.



