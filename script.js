document.addEventListener("DOMContentLoaded", function() {
    console.log("Website loaded successfully!");
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main > section');
    
    // Initially hide all sections except intro
    sections.forEach(section => {
        if (!section.classList.contains('intro')) {
            section.style.display = 'none';
        }
    });
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the text content of the link without the icon
            const linkText = this.textContent.trim().replace(/^\S+\s+/, '');
            
            // Show/hide appropriate sections based on navigation
            if (linkText === 'Home') {
                sections.forEach(section => section.style.display = 'block');
                showMessage("Welcome to the Home page! Here you can see all our available tools and features.");
            } else if (linkText === 'YouTube Tools') {
                sections.forEach(section => {
                    section.style.display = section.classList.contains('tools') ? 'block' : 'none';
                });
                showMessage("YouTube Tools section loaded! Here you'll find everything you need for content creation.");
            } else if (linkText === 'Games') {
                sections.forEach(section => {
                    section.style.display = section.classList.contains('games') ? 'block' : 'none';
                });
                showMessage("Games section loaded! Take a break and have some fun with these mini-games.");
            } else if (linkText === 'Extras') {
                sections.forEach(section => {
                    section.style.display = section.classList.contains('extras') ? 'block' : 'none';
                });
                showMessage("Extras section loaded! Check out these additional tools for streamers and content creators.");
            }
        });
    });
    
    // Function to show message toast
    function showMessage(message) {
        // Create or get toast element
        let toast = document.getElementById('toast-message');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-message';
            document.body.appendChild(toast);
        }
        
        // Set message and show toast
        toast.textContent = message;
        toast.className = 'show';
        
        // Hide after 3 seconds
        setTimeout(function() {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }
    
    // Add functionality to "Explore Now" button
    const exploreButton = document.querySelector('.btn');
    exploreButton.addEventListener('click', function(e) {
        e.preventDefault();
        sections.forEach(section => section.style.display = 'block');
        showMessage("Exploring all tools and features! Scroll down to see everything we offer.");
        
        // Smooth scroll to tools section
        document.querySelector('.tools').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Add YouTube video duration calculator to YouTube Tools section
    const toolsSection = document.querySelector('.tools');
    
    // Add YouTube downloader tool
    const youtubeDownloader = document.createElement('div');
    youtubeDownloader.className = 'tool-card';
    youtubeDownloader.innerHTML = `
        <h3>YouTube Video Downloader</h3>
        <div class="tool-description">Download YouTube videos for offline viewing</div>
        <div class="tool-input">
            <input type="text" id="video-url" placeholder="Enter YouTube URL">
            <select id="video-quality">
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
            </select>
            <button id="download-btn" class="action-btn">Download</button>
        </div>
        <div id="download-result" class="result-message"></div>
    `;
    toolsSection.appendChild(youtubeDownloader);
    
    // Add video duration calculator
    const durationCalculator = document.createElement('div');
    durationCalculator.className = 'tool-card';
    durationCalculator.innerHTML = `
        <h3>Video Duration Calculator</h3>
        <div class="tool-description">Calculate total length of your videos</div>
        <div class="calculator">
            <div class="input-group">
                <label for="hours">Hours:</label>
                <input type="number" id="hours" min="0" value="0">
            </div>
            <div class="input-group">
                <label for="minutes">Minutes:</label>
                <input type="number" id="minutes" min="0" max="59" value="0">
            </div>
            <div class="input-group">
                <label for="seconds">Seconds:</label>
                <input type="number" id="seconds" min="0" max="59" value="0">
            </div>
            <button id="calculate-btn" class="action-btn">Calculate</button>
            <div id="duration-result" class="result-message">Your video is 0 seconds long</div>
        </div>
    `;
    toolsSection.appendChild(durationCalculator);
    
    // Add thumbnail creator
    const thumbnailCreator = document.createElement('div');
    thumbnailCreator.className = 'tool-card';
    thumbnailCreator.innerHTML = `
        <h3>Thumbnail Creator</h3>
        <div class="tool-description">Create eye-catching thumbnails for your videos</div>
        <div class="thumbnail-creator">
            <div class="thumbnail-options">
                <select id="thumbnail-template">
                    <option value="gaming">Gaming Template</option>
                    <option value="vlog">Vlog Template</option>
                    <option value="tutorial">Tutorial Template</option>
                </select>
                <input type="text" id="thumbnail-title" placeholder="Enter thumbnail title">
                <div class="color-picker">
                    <label for="text-color">Text Color:</label>
                    <input type="color" id="text-color" value="#ffffff">
                </div>
            </div>
            <button id="generate-thumbnail" class="action-btn">Generate Thumbnail</button>
            <div id="thumbnail-preview" class="thumbnail-preview">Thumbnail Preview</div>
        </div>
    `;
    toolsSection.appendChild(thumbnailCreator);
    
    // Add a simple game to the Games section
    const gamesSection = document.querySelector('.games');
    
    // Add color guessing game
    const colorGame = document.createElement('div');
    colorGame.className = 'game-card';
    colorGame.innerHTML = `
        <h3>Color Guessing Game</h3>
        <div class="game-description">Test your color recognition skills</div>
        <div class="color-game">
            <div id="color-display"></div>
            <div class="color-options">
                <button class="color-option"></button>
                <button class="color-option"></button>
                <button class="color-option"></button>
            </div>
            <div id="game-result" class="result-message">Select the matching color!</div>
            <button id="new-game-btn" class="action-btn">New Colors</button>
        </div>
    `;
    gamesSection.appendChild(colorGame);
    
    // Add rock paper scissors game
    const rpsGame = document.createElement('div');
    rpsGame.className = 'game-card';
    rpsGame.innerHTML = `
        <h3>Rock Paper Scissors</h3>
        <div class="game-description">Play the classic game against the computer</div>
        <div class="rps-game">
            <div class="rps-score">
                <span>You: <span id="player-score">0</span></span>
                <span>Computer: <span id="computer-score">0</span></span>
            </div>
            <div class="rps-options">
                <button id="rock" class="rps-button">✊ Rock</button>
                <button id="paper" class="rps-button">✋ Paper</button>
                <button id="scissors" class="rps-button">✌️ Scissors</button>
            </div>
            <div id="rps-result" class="result-message">Choose your move!</div>
            <button id="reset-rps" class="action-btn">Reset Score</button>
        </div>
    `;
    gamesSection.appendChild(rpsGame);
    
    // Add memory game
    const memoryGame = document.createElement('div');
    memoryGame.className = 'game-card';
    memoryGame.innerHTML = `
        <h3>Memory Game</h3>
        <div class="game-description">Test your memory by matching pairs</div>
        <button id="start-memory" class="action-btn">Start Memory Game</button>
        <div id="memory-game" class="memory-board"></div>
        <div id="memory-result" class="result-message"></div>
    `;
    gamesSection.appendChild(memoryGame);
    
    // Add extras section
    const mainElement = document.querySelector('main');
    const extrasSection = document.createElement('section');
    extrasSection.className = 'extras';
    extrasSection.innerHTML = `
        <h2>⭐ Extras</h2>
        <p>Additional tools for streamers and content creators</p>
    `;
    mainElement.appendChild(extrasSection);
    
    // Add countdown timer to extras
    const countdownTimer = document.createElement('div');
    countdownTimer.className = 'tool-card';
    countdownTimer.innerHTML = `
        <h3>Stream Countdown Timer</h3>
        <div class="tool-description">Create a countdown for your streams</div>
        <div class="countdown-timer">
            <div class="timer-controls">
                <label for="timer-minutes">Minutes:</label>
                <input type="number" id="timer-minutes" min="1" max="60" value="5">
                <button id="start-timer" class="action-btn">Start Timer</button>
                <button id="reset-timer" class="action-btn">Reset</button>
            </div>
            <div id="timer-display">05:00</div>
        </div>
    `;
    extrasSection.appendChild(countdownTimer);
    
    // Add overlays generator
    const overlaysGenerator = document.createElement('div');
    overlaysGenerator.className = 'tool-card';
    overlaysGenerator.innerHTML = `
        <h3>Stream Overlay Generator</h3>
        <div class="tool-description">Create custom overlays for your streams</div>
        <div class="overlay-generator">
            <div class="overlay-options">
                <select id="overlay-type">
                    <option value="gaming">Gaming Overlay</option>
                    <option value="irl">IRL Stream Overlay</option>
                    <option value="minimal">Minimal Overlay</option>
                </select>
                <div class="color-picker">
                    <label for="overlay-color">Main Color:</label>
                    <input type="color" id="overlay-color" value="#00bcd4">
                </div>
                <input type="text" id="channel-name" placeholder="Your channel name">
            </div>
            <button id="generate-overlay" class="action-btn">Generate Overlay</button>
            <div id="overlay-preview" class="overlay-preview">Overlay Preview</div>
        </div>
    `;
    extrasSection.appendChild(overlaysGenerator);
    
    // Button event listeners
    
    // YouTube Downloader
    document.getElementById('download-btn').addEventListener('click', function() {
        const url = document.getElementById('video-url').value;
        const quality = document.getElementById('video-quality').value;
        const resultElement = document.getElementById('download-result');
        
        if (!url) {
            resultElement.textContent = "Please enter a valid YouTube URL";
            resultElement.style.color = "#f44336";
            return;
        }
        
        resultElement.textContent = `Downloading video in ${quality} quality...`;
        resultElement.style.color = "#4CAF50";
        
        setTimeout(() => {
            resultElement.textContent = `This is a demo. In a real app, the video would download now. Selected quality: ${quality}`;
            showMessage("Download feature clicked! This is a demonstration.");
        }, 1500);
    });
    
    // Duration Calculator
    document.getElementById('calculate-btn').addEventListener('click', function() {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        const resultElement = document.getElementById('duration-result');
        resultElement.textContent = `Your video is ${totalSeconds} seconds long (${hours}h ${minutes}m ${seconds}s)`;
        showMessage("Duration calculated! Check the result below.");
    });
    
    // Thumbnail Generator
    document.getElementById('generate-thumbnail').addEventListener('click', function() {
        const template = document.getElementById('thumbnail-template').value;
        const title = document.getElementById('thumbnail-title').value || "Example Title";
        const color = document.getElementById('text-color').value;
        
        const previewElement = document.getElementById('thumbnail-preview');
        previewElement.style.backgroundColor = template === 'gaming' ? '#222' : 
                                              template === 'vlog' ? '#f5f5f5' : '#3f51b5';
        previewElement.style.color = color;
        previewElement.innerHTML = `<div class="thumbnail-text">${title}</div>`;
        previewElement.className = `thumbnail-preview ${template}-template`;
        
        showMessage("Thumbnail generated! Check the preview below.");
    });
    
    // Color Game
    function startColorGame() {
        const colors = [
            generateRandomColor(),
            generateRandomColor(),
            generateRandomColor()
        ];
        
        const targetColorIndex = Math.floor(Math.random() * 3);
        const targetColor = colors[targetColorIndex];
        
        const colorDisplay = document.getElementById('color-display');
        colorDisplay.style.backgroundColor = targetColor;
        
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach((option, index) => {
            option.style.backgroundColor = colors[index];
            
            // Remove previous event listeners
            option.replaceWith(option.cloneNode(true));
        });
        
        // Add new event listeners to the cloned nodes
        document.querySelectorAll('.color-option').forEach((option, index) => {
            option.addEventListener('click', function() {
                const resultElement = document.getElementById('game-result');
                
                if (colors[index] === targetColor) {
                    resultElement.textContent = 'Correct! You win!';
                    resultElement.style.color = '#4CAF50';
                    showMessage("Well done! You guessed the right color!");
                } else {
                    resultElement.textContent = 'Wrong! Try again!';
                    resultElement.style.color = '#f44336';
                    showMessage("Oops! That's not the right color. Try again!");
                }
            });
        });
    }
    
    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
        newGameBtn.addEventListener('click', function() {
            startColorGame();
            showMessage("New colors generated! Which one matches the display?");
        });
        // Start the game when page loads
        startColorGame();
    }
    
    // Rock Paper Scissors Game
    let playerScore = 0;
    let computerScore = 0;
    
    const rockBtn = document.getElementById('rock');
    const paperBtn = document.getElementById('paper');
    const scissorsBtn = document.getElementById('scissors');
    const resetRpsBtn = document.getElementById('reset-rps');
    
    if (rockBtn && paperBtn && scissorsBtn) {
        [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
            btn.addEventListener('click', function() {
                playRps(this.id);
            });
        });
        
        resetRpsBtn.addEventListener('click', function() {
            playerScore = 0;
            computerScore = 0;
            document.getElementById('player-score').textContent = '0';
            document.getElementById('computer-score').textContent = '0';
            document.getElementById('rps-result').textContent = 'Choose your move!';
            showMessage("Rock Paper Scissors score has been reset!");
        });
    }
    
    function playRps(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        const resultElement = document.getElementById('rps-result');
        
        // Convert emoji for display
        const emojiMap = {
            'rock': '✊',
            'paper': '✋',
            'scissors': '✌️'
        };
        
        if (playerChoice === computerChoice) {
            resultElement.textContent = `Tie! ${emojiMap[playerChoice]} vs ${emojiMap[computerChoice]}`;
            showMessage("It's a tie! Try again!");
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            playerScore++;
            document.getElementById('player-score').textContent = playerScore;
            resultElement.textContent = `You win! ${emojiMap[playerChoice]} beats ${emojiMap[computerChoice]}`;
            showMessage("You won this round! Well played!");
        } else {
            computerScore++;
            document.getElementById('computer-score').textContent = computerScore;
            resultElement.textContent = `Computer wins! ${emojiMap[computerChoice]} beats ${emojiMap[playerChoice]}`;
            showMessage("Computer won this round! Try again!");
        }
    }
    
    // Memory Game
    const startMemoryBtn = document.getElementById('start-memory');
    if (startMemoryBtn) {
        startMemoryBtn.addEventListener('click', function() {
            startMemoryGame();
            showMessage("Memory Game started! Find all matching pairs!");
        });
    }
    
    function startMemoryGame() {
        const memoryBoard = document.getElementById('memory-game');
        const resultElement = document.getElementById('memory-result');
        
        // Clear previous game
        memoryBoard.innerHTML = '';
        resultElement.textContent = '';
        
        // Create cards
        const emojis = ['🎮', '🎬', '🎥', '📱', '💻', '🎧', '🔊', '📷'];
        // Double the emojis to create pairs
        const gameEmojis = [...emojis, ...emojis];
        
        // Shuffle
        for (let i = gameEmojis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gameEmojis[i], gameEmojis[j]] = [gameEmojis[j], gameEmojis[i]];
        }
        
        // Create the board
        gameEmojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.value = emoji;
            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">?</div>
                    <div class="memory-card-back">${emoji}</div>
                </div>
            `;
            memoryBoard.appendChild(card);
            
            card.addEventListener('click', function() {
                // Don't allow clicking already matched or flipped cards
                if (card.classList.contains('flipped') || card.classList.contains('matched')) {
                    return;
                }
                
                // Flip the card
                card.classList.add('flipped');
                
                // Check for matches
                const flippedCards = document.querySelectorAll('.memory-card.flipped:not(.matched)');
                
                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;
                    
                    if (card1.dataset.value === card2.dataset.value) {
                        // Match found
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        
                        // Check if all cards are matched
                        setTimeout(() => {
                            const allMatched = document.querySelectorAll('.memory-card.matched').length === gameEmojis.length;
                            if (allMatched) {
                                resultElement.textContent = 'Congratulations! You found all matches!';
                                resultElement.style.color = '#4CAF50';
                                showMessage("Congratulations! You've completed the Memory Game!");
                            }
                        }, 500);
                    } else {
                        // No match, flip back
                        setTimeout(() => {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                        }, 1000);
                    }
                }
            });
        });
    }
    
    // Countdown Timer
    let timerInterval;
    let timeRemaining = 300; // 5 minutes in seconds
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = formattedTime;
    }
    
    document.getElementById('start-timer').addEventListener('click', function() {
        // Clear any existing interval
        clearInterval(timerInterval);
        
        // Get minutes from input
        const minutes = parseInt(document.getElementById('timer-minutes').value) || 5;
        timeRemaining = minutes * 60;
        
        updateTimerDisplay();
        showMessage(`Timer started for ${minutes} minutes!`);
        
        timerInterval = setInterval(function() {
            timeRemaining--;
            
            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                document.getElementById('timer-display').textContent = "TIME'S UP!";
                showMessage("Time's up! Your countdown has finished.");
                return;
            }
            
            updateTimerDisplay();
        }, 1000);
    });
    
    document.getElementById('reset-timer').addEventListener('click', function() {
        clearInterval(timerInterval);
        const minutes = parseInt(document.getElementById('timer-minutes').value) || 5;
        timeRemaining = minutes * 60;
        updateTimerDisplay();
        showMessage("Timer has been reset!");
    });
    
    // Overlay Generator
    document.getElementById('generate-overlay').addEventListener('click', function() {
        const type = document.getElementById('overlay-type').value;
        const color = document.getElementById('overlay-color').value;
        const name = document.getElementById('channel-name').value || "Your Channel";
        
        const previewElement = document.getElementById('overlay-preview');
        previewElement.style.backgroundColor = '#333';
        previewElement.style.color = color;
        
        if (type === 'gaming') {
            previewElement.innerHTML = `
                <div class="overlay-item stream-title">${name} Stream</div>
                <div class="overlay-item webcam-frame" style="border-color: ${color}"></div>
                <div class="overlay-item alert-box" style="background-color: ${color}30">Latest Follower: ExampleUser123</div>
            `;
        } else if (type === 'irl') {
            previewElement.innerHTML = `
                <div class="overlay-header" style="background-color: ${color}50">${name}</div>
                <div class="overlay-footer" style="background-color: ${color}50">
                    <div class="social-icons">
                        <span class="social-icon">🐦</span>
                        <span class="social-icon">📷</span>
                        <span class="social-icon">🎮</span>
                    </div>
                </div>
            `;
        } else {
            previewElement.innerHTML = `
                <div class="minimal-overlay">
                    <div class="channel-name" style="color: ${color}">${name}</div>
                    <div class="minimal-stats">
                        <span>Views: 128</span>
                        <span>📊</span>
                    </div>
                </div>
            `;
        }
        
        showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} overlay generated!`);
    });
    
    // Initially hide extras section
    document.querySelector('.extras').style.display = 'none';
});
