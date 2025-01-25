# Memory Game - Big Brain Time

## Description
Big Brain Time is a fun and interactive memory game built with React. The goal is to match pairs of cards as quickly and efficiently as possible. The game features customizable settings, including the number of cards, background colors, and a game history to track past performances.

## Features
- **Customizable Gameplay:**
  - Choose the number of cards (4, 16, or 32).
  - Select your preferred background color from a variety of options.
- **Game History:**
  - Track your past games, including the number of turns, cards, and time taken.
  - Reset game history at any time.
- **Interactive Timer:**
  - Measure how long it takes to complete the game.
- **Dynamic Feedback:**
  - Celebrate your victories with animated feedback when you complete a game.

## How to Play
1. Start by selecting the number of cards and background color in the settings menu.
2. Click "Start Game" to shuffle the cards and begin.
3. Flip two cards at a time to find matching pairs.
4. Match all pairs to win the game.
5. Check your stats in the game history or reset the game to play again.

## Installation
Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/med-khadiri/memory-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd memory-game
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Structure
```
memory-game/
├── public/
│   ├── img/               # Images for card faces
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── SingleCard/    # Component for individual card
│   ├── App.css            # Styles for the app
│   ├── App.js             # Main application logic
│   ├── index.js           # Entry point
├── package.json           # Project metadata and dependencies
```

## Technologies Used
- **React**: Frontend framework for building the UI.
- **CSS**: For styling and animations.
- **LocalStorage**: To persist game history across sessions.


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to all open-source contributors and libraries that made this project possible.
- Inspired by classic memory games.

