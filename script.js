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
            } else if (linkText === 'YouTube Tools') {
                sections.forEach(section => {
                    section.style.display = section.classList.contains('tools') ? 'block' : 'none';
                });
            } else if (linkText === 'Games') {
                sections.forEach(section => {
                    section.style.display = section.classList.contains('games') ? 'block' : 'none';
                });
            } else if (linkText === 'Extras') {
                sections.forEach(section => {
                    section.style.display = section.classList.contains('extras') ? 'block' : 'none';
                });
            }
        });
    });
    
    // Add functionality to "Explore Now" button
    const exploreButton = document.querySelector('.btn');
    exploreButton.addEventListener('click', function(e) {
        e.preventDefault();
        sections.forEach(section => section.style.display = 'block');
        
        // Smooth scroll to tools section
        document.querySelector('.tools').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Add YouTube video duration calculator to YouTube Tools section
    const toolsSection = document.querySelector('.tools');
    const durationCalculator = document.createElement('div');
    durationCalculator.className = 'tool-card';
    durationCalculator.innerHTML = `
        <h3>Video Duration Calculator</h3>
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
            <button id="calculate-btn">Calculate</button>
            <div id="duration-result">Your video is 0 seconds long</div>
        </div>
    `;
    toolsSection.appendChild(durationCalculator);
    
    // Add functionality to the calculator
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', function() {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        const resultElement = document.getElementById('duration-result');
        resultElement.textContent = `Your video is ${totalSeconds} seconds long (${hours}h ${minutes}m ${seconds}s)`;
    });
    
    // Add a simple game to the Games section
    const gamesSection = document.querySelector('.games');
    const game = document.createElement('div');
    game.className = 'game-card';
    game.innerHTML = `
        <h3>Color Guessing Game</h3>
        <div class="color-game">
            <div id="color-display"></div>
            <div class="color-options">
                <button class="color-option"></button>
                <button class="color-option"></button>
                <button class="color-option"></button>
            </div>
            <div id="game-result">Select the matching color!</div>
            <button id="new-game-btn">New Colors</button>
        </div>
    `;
    gamesSection.appendChild(game);
    
    // Add functionality to the color game
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
            
            option.addEventListener('click', function() {
                const resultElement = document.getElementById('game-result');
                
                if (colors[index] === targetColor) {
                    resultElement.textContent = 'Correct! You win!';
                    resultElement.style.color = '#4CAF50';
                } else {
                    resultElement.textContent = 'Wrong! Try again!';
                    resultElement.style.color = '#f44336';
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
        newGameBtn.addEventListener('click', startColorGame);
        // Start the game when page loads
        startColorGame();
    }
    
    // Add extras section
    const mainElement = document.querySelector('main');
    const extrasSection = document.createElement('section');
    extrasSection.className = 'extras';
    extrasSection.innerHTML = `
        <h2>⭐ Extras</h2>
        <div class="countdown-timer">
            <h3>Stream Countdown Timer</h3>
            <div class="timer-controls">
                <label for="timer-minutes">Minutes:</label>
                <input type="number" id="timer-minutes" min="1" max="60" value="5">
                <button id="start-timer">Start Timer</button>
                <button id="reset-timer">Reset</button>
            </div>
            <div id="timer-display">05:00</div>
        </div>
    `;
    mainElement.appendChild(extrasSection);
    
    // Add functionality to the countdown timer
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
        
        timerInterval = setInterval(function() {
            timeRemaining--;
            
            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                document.getElementById('timer-display').textContent = "TIME'S UP!";
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
    });
    
    // Initially hide extras section
    document.querySelector('.extras').style.display = 'none';
});
