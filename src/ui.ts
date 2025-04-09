export function renderGameUI(): string {
  return `
    <div class="game-container">
      <div class="score-container">
        <div id="score" class="score">Score: 0</div>
        <div id="best-score" class="best-score">Best: 0</div>
      </div>
      
      <h1 class="title">Word Snake</h1>
      <p class="subtitle">Chain words where each new word starts with the last letter of the previous word</p>
      
      <div class="game-area">
        <div class="word-history" id="word-history">
          <p>Press Play to start the game!</p>
        </div>
        
        <div class="game-info">
          <div class="letter-container">
            <p>Next word must start with:</p>
            <div class="current-letter" id="current-letter">-</div>
          </div>
          
          <div class="timer-container">
            <p>Time left:</p>
            <div id="timer" class="timer">15s</div>
          </div>
        </div>
        
        <button id="play-game" class="play-button">Play</button>
        
        <div id="game-controls" class="input-area" style="display: none;">
          <input 
            type="text" 
            id="word-input" 
            placeholder="Enter your word..." 
            autocomplete="off"
            disabled
          />
          <button id="submit-word" disabled>Submit</button>
        </div>
        
        <div id="message" class="message"></div>
      </div>
      
      <button id="restart-game" class="restart-button">Restart Game</button>
      
      <div class="rules">
        <h3>Game Rules:</h3>
        <ul>
          <li>Press <span class="highlight">Play</span> to start the game</li>
          <li>The AI starts with a random word</li>
          <li>Your word must start with the <span class="highlight">last letter</span> of the previous word</li>
          <li>Words cannot be repeated</li>
          <li>You have <span class="highlight">15 seconds</span> to enter each word</li>
          <li>Each correct word gives you <span class="highlight">10 points</span></li>
          <li>The game ends when you run out of time or can't find a valid word</li>
        </ul>
      </div>
    </div>
  `;
}
