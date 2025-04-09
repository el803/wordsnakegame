import './style.css';
import { WordGame } from './wordGame';
import { renderGameUI } from './ui';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderGameUI();

// Initialize the game
const game = new WordGame();
game.initialize();
