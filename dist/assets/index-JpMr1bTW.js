var c=Object.defineProperty;var m=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var s=(o,e,t)=>m(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const l=["apple","banana","cat","dog","elephant","fox","giraffe","house","igloo","jacket","kangaroo","lion","monkey","nest","orange","penguin","queen","rabbit","snake","tiger","umbrella","violin","whale","xylophone","yellow","zebra","ant","bear","cow","duck","eagle","frog","goat","horse","insect","jaguar","koala","leopard","mouse","newt","owl","pig","quail","rat","sheep","turtle","unicorn","vulture","wolf","yak","airplane","boat","car","desk","elevator","fan","guitar","hat","ice","jar","kite","lamp","map","notebook","ocean","pencil","quilt","radio","sun","table","umbrella","vase","window","xylophone","yard","zipper","actor","baker","chef","dancer","engineer","farmer","gardener","hunter","inventor","judge","king","lawyer","musician","nurse","officer","pilot","queen","runner","singer","teacher","umpire","vet","writer","youth","zero","autumn","beach","cloud","desert","earth","forest","garden","hill","island","jungle","kitchen","lake","mountain","night","ocean","park","quiet","river","sea","tree","universe","valley","water","yard","zone","art","book","cake","door","egg","fish","game","hand","ink","juice","key","love","milk","name","oil","paper","queen","road","salt","time","unit","voice","wood","year","zoo","air","box","cup","day","eye","food","gas","hat","ice","jam","kid","leg","man","net","oak","pen","quiz","red","sky","tea","use","van","web","yes","zip","age","bed","car","dog","ear","fun","gun","hat","ink","joy","key","lip","map","now","old","pet","run","sun","top","use","van","win","yes","zoo","abstract","balance","cabinet","damage","economy","fabric","gallery","habitat","imagine","journey","kitchen","language","machine","navigate","observe","package","quality","rainbow","science","texture","unique","valuable","weather","xerox","yogurt","zealous","academy","battery","calendar","database","eclipse","factory","gravity","harmony","industry","justice","kingdom","liberty","magazine","natural","organic","paradise","quantity","resource","strategy","treasure","universe","victory","warranty","yesterday","ability","balance","capable","delicate","elegant","flexible","generous","helpful","important","joyful","kindness","logical","magical","necessary","obvious","peaceful","qualified","reliable","sensitive","talented","useful","valuable","wonderful","excited","youthful","zealous","active","brave","clever","dynamic","eager","famous","gentle","honest","innocent","jolly","kind","lively","modern","noble","open","patient","quick","rich","smart","tough","unique","vivid","wise","young","account","building","computer","document","electric","furniture","graphic","hardware","internet","jewelry","keyboard","library","monitor","network","office","printer","question","router","software","telephone","update","video","website","xray","youtube","zoom","address","business","company","director","employee","finance","government","hospital","insurance","justice","knowledge","leadership","management","newspaper","operation","president","quality","restaurant","security","technology","university","vacation","warehouse","yacht","adventure","birthday","chocolate","diamond","emerald","festival","graduation","holiday","invitation","jewelry","knowledge","laughter","marriage","nutrition","occasion","party","question","relaxation","surprise","tradition","understanding","vacation","wedding","xylophone","yesterday","zucchini","alligator","butterfly","crocodile","dinosaur","elephant","flamingo","gorilla","hippopotamus","iguana","jellyfish","kangaroo","leopard","mosquito","nightingale","octopus","panther","quokka","rhinoceros","scorpion","tarantula","unicorn","vulture","walrus","xenops","basketball","cricket","football","golf","hockey","judo","karate","lacrosse","marathon","netball","olympics","polo","quidditch","rugby","soccer","tennis","ultimate","volleyball","wrestling","yoga","astronomy","biology","chemistry","dinosaur","ecology","forensics","geology","horticulture","immunology","journalism","kinesiology","linguistics","meteorology","neurology","oceanography","psychology","quantum","robotics","sociology","technology","archaeology","botany","cardiology","dentistry","engineering","forestry","genetics","hematology","immunology","jurisprudence","kinesiology","laboratory","medicine","neurology","oncology","pathology","quantum","radiology","surgery","therapy","aluminum","bronze","copper","diamond","emerald","fluorite","gold","hydrogen","iron","jade","krypton","lithium","magnesium","neon","oxygen","platinum","quartz","ruby","silver","titanium","uranium","vanadium","wolfram","xenon","yttrium","zinc","aquamarine","beryl","crystal","diamond","emerald","fluorite","garnet","hematite","ivory","jasper","kunzite","lapis","malachite","nephrite","onyx","pearl","quartz","ruby","sapphire","topaz","turquoise","uranium","vermeil","wulfenite"];function h(o,e=3,t=8){const i=o.filter(r=>r.length>=e&&r.length<=t);return i[Math.floor(Math.random()*i.length)]}class g{constructor(){s(this,"wordHistory",[]);s(this,"usedWords",new Set);s(this,"currentLetter","");s(this,"gameOver",!1);s(this,"gameStarted",!1);s(this,"message","");s(this,"messageType","info");s(this,"score",0);s(this,"bestScore",0);s(this,"timeLeft",15);s(this,"timerInterval",null);const e=localStorage.getItem("wordSnakeBestScore");e&&(this.bestScore=parseInt(e,10))}initialize(){this.setupInitialState(),this.setupEventListeners()}setupInitialState(){this.wordHistory=[],this.usedWords=new Set,this.gameOver=!1,this.gameStarted=!1,this.message="",this.messageType="info",this.score=0,this.timeLeft=15,this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.setMessage("Press Play to start the game!","info"),this.updateUI()}resetGame(){this.setupInitialState()}startGame(){if(this.gameStarted||this.gameOver)return;this.gameStarted=!0,this.setMessage("Game started! Enter your first word.","info");const e=h(l,4,7);this.addWord(e,"ai"),this.updateUI(),this.startTimer();const t=document.getElementById("play-game"),i=document.getElementById("game-controls");t&&(t.style.display="none"),i&&(i.style.display="flex");const r=document.getElementById("word-input");r&&r.focus()}setupEventListeners(){const e=document.getElementById("submit-word"),t=document.getElementById("word-input"),i=document.getElementById("restart-game"),r=document.getElementById("play-game");e&&e.addEventListener("click",()=>this.handleWordSubmission()),t&&t.addEventListener("keypress",a=>{a.key==="Enter"&&this.handleWordSubmission()}),i&&i.addEventListener("click",()=>{this.resetGame();const a=document.getElementById("play-game"),n=document.getElementById("game-controls");a&&(a.style.display="block"),n&&(n.style.display="none")}),r&&r.addEventListener("click",()=>this.startGame())}startTimer(){this.timerInterval&&clearInterval(this.timerInterval),this.timeLeft=15,this.updateTimerDisplay(),this.timerInterval=setInterval(()=>{this.timeLeft--,this.updateTimerDisplay(),this.timeLeft<=0&&(clearInterval(this.timerInterval),this.timerInterval=null,this.endGame("Time's up! Game over."))},1e3)}updateTimerDisplay(){const e=document.getElementById("timer");e&&(e.textContent=`${this.timeLeft}s`,this.timeLeft<=5?e.classList.add("low-time"):e.classList.remove("low-time"))}handleWordSubmission(){if(this.gameOver||!this.gameStarted)return;const e=document.getElementById("word-input"),t=e.value.trim().toLowerCase();this.validatePlayerWord(t)&&(this.addWord(t,"human"),e.value="",this.score+=10,this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),setTimeout(()=>{this.gameOver||(this.aiTurn(),this.startTimer())},1e3)),this.updateUI()}validatePlayerWord(e){return e?e[0]!==this.currentLetter?(this.setMessage(`Word must start with the letter "${this.currentLetter}"`,"error"),!1):this.usedWords.has(e)?(this.setMessage("This word has already been used","error"),!1):l.includes(e)?(this.setMessage("Good word!","success"),!0):(this.setMessage("Not a valid word in our dictionary","error"),!1):(this.setMessage("Please enter a word","error"),!1)}aiTurn(){const e=this.getLastLetter(),t=l.filter(r=>r[0]===e&&!this.usedWords.has(r));if(t.length===0){this.endGame("AI couldn't find a word. You win!");return}const i=t[Math.floor(Math.random()*t.length)];this.addWord(i,"ai"),this.updateUI()}addWord(e,t){this.wordHistory.push({word:e,player:t}),this.usedWords.add(e),this.currentLetter=this.getLastLetter()}getLastLetter(){if(this.wordHistory.length===0)return"";const e=this.wordHistory[this.wordHistory.length-1].word;return e[e.length-1]}endGame(e){this.gameOver=!0,this.gameStarted=!1,this.setMessage(e,"info"),this.score>this.bestScore&&(this.bestScore=this.score,localStorage.setItem("wordSnakeBestScore",this.bestScore.toString())),this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null);const t=document.createElement("div");t.className="game-over",t.textContent=e;const i=document.querySelector(".game-area"),r=document.querySelector(".game-over");r?r.textContent=e:i&&i.appendChild(t);const a=document.getElementById("play-game");a&&(a.style.display="block"),this.updateUI()}setMessage(e,t){this.message=e,this.messageType=t}updateUI(){const e=document.getElementById("word-history"),t=document.getElementById("current-letter"),i=document.getElementById("message"),r=document.getElementById("word-input"),a=document.getElementById("submit-word"),n=document.getElementById("score"),u=document.getElementById("best-score"),d=document.getElementById("timer");e&&(e.innerHTML=this.renderWordHistory(),e.scrollTop=e.scrollHeight),t&&(t.textContent=this.currentLetter?this.currentLetter.toUpperCase():"-"),i&&(i.textContent=this.message,i.className=`message ${this.messageType}`),n&&(n.textContent=`Score: ${this.score}`),u&&(u.textContent=`Best: ${this.bestScore}`),d&&!this.gameStarted&&(d.textContent="15s",d.classList.remove("low-time")),r&&a&&(this.gameOver||!this.gameStarted?(r.disabled=!0,a.disabled=!0):(r.disabled=!1,a.disabled=!1,r.focus()))}renderWordHistory(){return this.wordHistory.length===0?"<p>Press Play to start the game!</p>":this.wordHistory.map((e,t)=>{const i=e.player==="ai"?"ai-word":"player-word";return`
        <div class="word-entry">
          <span>${t+1}.</span>
          <span class="${i}">${e.word}</span>
          <span>${e.player==="ai"?"AI":"You"}</span>
        </div>
      `}).join("")}checkPlayerLost(){const e=this.getLastLetter();return l.filter(i=>i[0]===e&&!this.usedWords.has(i)).length===0}}function y(){return`
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
  `}document.querySelector("#app").innerHTML=y();const p=new g;p.initialize();
