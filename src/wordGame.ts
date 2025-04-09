import { dictionary } from './dictionary';
import { getRandomWord } from './utils';

export interface WordEntry {
  word: string;
  player: 'ai' | 'human';
}

export class WordGame {
  private wordHistory: WordEntry[] = [];
  private usedWords: Set<string> = new Set();
  private currentLetter: string = '';
  private gameOver: boolean = false;
  private gameStarted: boolean = false;
  private message: string = '';
  private messageType: 'error' | 'success' | 'info' = 'info';
  private score: number = 0;
  private bestScore: number = 0;
  private timeLeft: number = 15;
  private timerInterval: number | null = null;

  constructor() {
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('wordSnakeBestScore');
    if (savedBestScore) {
      this.bestScore = parseInt(savedBestScore, 10);
    }
  }

  public initialize(): void {
    this.setupInitialState();
    this.setupEventListeners();
  }

  private setupInitialState(): void {
    this.wordHistory = [];
    this.usedWords = new Set();
    this.gameOver = false;
    this.gameStarted = false;
    this.message = '';
    this.messageType = 'info';
    this.score = 0;
    this.timeLeft = 15;
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    this.setMessage('Press Play to start the game!', 'info');
    this.updateUI();
  }

  private resetGame(): void {
    this.setupInitialState();
  }

  private startGame(): void {
    if (this.gameStarted || this.gameOver) return;
    
    this.gameStarted = true;
    this.setMessage('Game started! Enter your first word.', 'info');
    
    // AI starts with a random word
    const aiWord = getRandomWord(dictionary, 4, 7);
    this.addWord(aiWord, 'ai');
    
    this.updateUI();
    this.startTimer();
    
    // Hide play button, show game controls
    const playButton = document.getElementById('play-game');
    const gameControls = document.getElementById('game-controls');
    
    if (playButton) playButton.style.display = 'none';
    if (gameControls) gameControls.style.display = 'flex';
    
    // Focus on input field
    const wordInput = document.getElementById('word-input') as HTMLInputElement;
    if (wordInput) wordInput.focus();
  }

  private setupEventListeners(): void {
    const submitButton = document.getElementById('submit-word') as HTMLButtonElement;
    const wordInput = document.getElementById('word-input') as HTMLInputElement;
    const restartButton = document.getElementById('restart-game') as HTMLButtonElement;
    const playButton = document.getElementById('play-game') as HTMLButtonElement;

    if (submitButton) {
      submitButton.addEventListener('click', () => this.handleWordSubmission());
    }
    
    if (wordInput) {
      wordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.handleWordSubmission();
        }
      });
    }

    if (restartButton) {
      restartButton.addEventListener('click', () => {
        this.resetGame();
        
        // Show play button again, hide game controls
        const playButton = document.getElementById('play-game');
        const gameControls = document.getElementById('game-controls');
        
        if (playButton) playButton.style.display = 'block';
        if (gameControls) gameControls.style.display = 'none';
      });
    }
    
    if (playButton) {
      playButton.addEventListener('click', () => this.startGame());
    }
  }

  private startTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.timeLeft = 15;
    this.updateTimerDisplay();
    
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval as number);
        this.timerInterval = null;
        this.endGame('Time\'s up! Game over.');
      }
    }, 1000) as unknown as number;
  }

  private updateTimerDisplay(): void {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.textContent = `${this.timeLeft}s`;
      
      // Add visual indication when time is running low
      if (this.timeLeft <= 5) {
        timerElement.classList.add('low-time');
      } else {
        timerElement.classList.remove('low-time');
      }
    }
  }

  private handleWordSubmission(): void {
    if (this.gameOver || !this.gameStarted) return;

    const wordInput = document.getElementById('word-input') as HTMLInputElement;
    const playerWord = wordInput.value.trim().toLowerCase();
    
    if (this.validatePlayerWord(playerWord)) {
      this.addWord(playerWord, 'human');
      wordInput.value = '';
      
      // Increase score
      this.score += 10;
      
      // Reset timer for AI's turn
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      
      // AI's turn
      setTimeout(() => {
        if (!this.gameOver) {
          this.aiTurn();
          // Start timer again for player's turn
          this.startTimer();
        }
      }, 1000);
    }
    
    this.updateUI();
  }

  private validatePlayerWord(word: string): boolean {
    // Check if the word is empty
    if (!word) {
      this.setMessage('Please enter a word', 'error');
      return false;
    }

    // Check if the word starts with the current letter
    if (word[0] !== this.currentLetter) {
      this.setMessage(`Word must start with the letter "${this.currentLetter}"`, 'error');
      return false;
    }

    // Check if the word has been used before
    if (this.usedWords.has(word)) {
      this.setMessage('This word has already been used', 'error');
      return false;
    }

    // Check if the word is in the dictionary
    if (!dictionary.includes(word)) {
      this.setMessage('Not a valid word in our dictionary', 'error');
      return false;
    }

    this.setMessage('Good word!', 'success');
    return true;
  }

  private aiTurn(): void {
    const lastLetter = this.getLastLetter();
    const possibleWords = dictionary.filter(word => 
      word[0] === lastLetter && !this.usedWords.has(word)
    );

    if (possibleWords.length === 0) {
      this.endGame('AI couldn\'t find a word. You win!');
      return;
    }

    // Choose a random word from possible words
    const aiWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    this.addWord(aiWord, 'ai');
    this.updateUI();
  }

  private addWord(word: string, player: 'ai' | 'human'): void {
    this.wordHistory.push({ word, player });
    this.usedWords.add(word);
    this.currentLetter = this.getLastLetter();
  }

  private getLastLetter(): string {
    if (this.wordHistory.length === 0) return '';
    const lastWord = this.wordHistory[this.wordHistory.length - 1].word;
    return lastWord[lastWord.length - 1];
  }

  private endGame(message: string): void {
    this.gameOver = true;
    this.gameStarted = false;
    this.setMessage(message, 'info');
    
    // Check if current score is better than best score
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('wordSnakeBestScore', this.bestScore.toString());
    }
    
    // Clear timer if it's still running
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    const gameOverElement = document.createElement('div');
    gameOverElement.className = 'game-over';
    gameOverElement.textContent = message;
    
    const gameArea = document.querySelector('.game-area');
    const existingGameOver = document.querySelector('.game-over');
    
    if (existingGameOver) {
      existingGameOver.textContent = message;
    } else if (gameArea) {
      gameArea.appendChild(gameOverElement);
    }
    
    // Show play button again
    const playButton = document.getElementById('play-game');
    if (playButton) playButton.style.display = 'block';
    
    this.updateUI();
  }

  private setMessage(message: string, type: 'error' | 'success' | 'info'): void {
    this.message = message;
    this.messageType = type;
  }

  private updateUI(): void {
    const wordHistoryElement = document.getElementById('word-history');
    const currentLetterElement = document.getElementById('current-letter');
    const messageElement = document.getElementById('message');
    const wordInput = document.getElementById('word-input') as HTMLInputElement;
    const submitButton = document.getElementById('submit-word') as HTMLButtonElement;
    const scoreElement = document.getElementById('score');
    const bestScoreElement = document.getElementById('best-score');
    const timerElement = document.getElementById('timer');

    if (wordHistoryElement) {
      wordHistoryElement.innerHTML = this.renderWordHistory();
      wordHistoryElement.scrollTop = wordHistoryElement.scrollHeight;
    }

    if (currentLetterElement) {
      currentLetterElement.textContent = this.currentLetter ? this.currentLetter.toUpperCase() : '-';
    }

    if (messageElement) {
      messageElement.textContent = this.message;
      messageElement.className = `message ${this.messageType}`;
    }

    if (scoreElement) {
      scoreElement.textContent = `Score: ${this.score}`;
    }

    if (bestScoreElement) {
      bestScoreElement.textContent = `Best: ${this.bestScore}`;
    }

    if (timerElement && !this.gameStarted) {
      timerElement.textContent = '15s';
      timerElement.classList.remove('low-time');
    }

    if (wordInput && submitButton) {
      if (this.gameOver || !this.gameStarted) {
        wordInput.disabled = true;
        submitButton.disabled = true;
      } else {
        wordInput.disabled = false;
        submitButton.disabled = false;
        wordInput.focus();
      }
    }
  }

  private renderWordHistory(): string {
    if (this.wordHistory.length === 0) {
      return '<p>Press Play to start the game!</p>';
    }

    return this.wordHistory.map((entry, index) => {
      const playerClass = entry.player === 'ai' ? 'ai-word' : 'player-word';
      return `
        <div class="word-entry">
          <span>${index + 1}.</span>
          <span class="${playerClass}">${entry.word}</span>
          <span>${entry.player === 'ai' ? 'AI' : 'You'}</span>
        </div>
      `;
    }).join('');
  }

  public checkPlayerLost(): boolean {
    const lastLetter = this.getLastLetter();
    const possibleWords = dictionary.filter(word => 
      word[0] === lastLetter && !this.usedWords.has(word)
    );
    return possibleWords.length === 0;
  }
}
