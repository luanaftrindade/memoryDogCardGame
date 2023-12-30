const internals = {
    selectors: {
        gameContainer: document.querySelector('.game'),
        boardContainer: document.querySelector('.board-container'),
        board: document.querySelector('.board'),
        moves: document.querySelector('.moves-two'),
        timer: document.querySelector('.timer-two'),
        play: document.querySelector('.play'),
        start: document.querySelector('.start-two'),
        win: document.querySelector('.win'),
        dimensions: null

    },
    state: {
        gameStarted: false,
        flippedCards: 0,
        totalFlips: 0,
        totalTime: 0,
        loop: null
    }
};

const externals = {};

internals.levelTwoHtml = function () {
    return `
  
    <div class="stats">
        <button class="start-two">Start</button>
                <div class="moves-two">0 moves</div>
                <div class="timer-two">time: 0 sec</div>
            </div>
        </div>
        <div class="board-container">
            <div class="board" data-dimension="4"></div>
            <div class="win">Congrats! You won </div>`;
}

internals.shuffleItems = function (array) {
    const clonedArray = [...array];
    console.log("Array's length = " + clonedArray.length);

    for (let index = clonedArray.length - 1; index > 0; index--) {
        console.log("Initial index of the suffle algorithm = " + index);
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const original = clonedArray[index];

        clonedArray[index] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
};


internals.pickRandomImages = function (array, items) {
    const clonedArray = [...array];
    const randomPicks = [];

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray[randomIndex]);
        // not necessary 
        clonedArray.splice(randomIndex, 1);
    }

    return randomPicks;
};


internals.generateMemoryGame = function (images) {

    setTimeout(() => {


        // Change the selector to target the .board element in .board-container
        // const dimensions = internals.selectors.board.getAttribute('data-dimension');

        internals.selectors.board = document.querySelector('.board');

        const dimensions = internals.selectors.board.getAttribute('data-dimension');
        const imagesUrls = images.map(image => image.url);

        console.log("Images URL array: " + imagesUrls);

        if (dimensions % 2 !== 0) {
            throw new Error("The dimension of the board must be an even number.");
        };


        const picks = internals.pickRandomImages(imagesUrls, (dimensions * dimensions) / 2);
        console.log("Pick a random Image method: " + picks);
        const items = internals.shuffleItems([...picks, ...picks]);
        console.log("Suffle item method: " + items);

        const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
        ${items.map(url => `
            <div class="card">
                <div class="card-front"></div>
                <div class="card-back" style="background-image: url('${url}')"></div>
            </div>
        `).join('')}
        </div>
        `;

        const parser = new DOMParser().parseFromString(cards, 'text/html');

        internals.selectors.board.replaceWith(parser.querySelector('.board'));

    }, 1000);
};

internals.startGame = function () {

    internals.selectors.moves = document.querySelector('.moves-two');
    internals.selectors.timer = document.querySelector('.timer-two');
    internals.selectors.start = document.querySelector('.start-two');
    // Check if the necessary elements are present
    if (internals.selectors.moves && internals.selectors.timer) {
        internals.state.gameStarted = true;
        internals.selectors.start.classList.add('disabled');

        internals.state.loop = setInterval(() => {
            internals.state.totalTime++;

            internals.selectors.moves.innerText = `${internals.state.totalFlips} moves`;
            internals.selectors.timer.innerText = `time: ${internals.state.totalTime} sec`;
        }, 1000);
    } else {
        console.log("Could not find necessary elements for startGame.");
    }
};

internals.flipBackCards = function () {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    })

    internals.state.flippedCards = 0;
};


internals.flipCard = function (card) {
    internals.selectors.win = document.querySelector('.win');
    internals.selectors.boardContainer = document.querySelector('.board-container');


    internals.state.flippedCards++;
    internals.state.totalFlips++;

    if (!internals.state.gameStarted) {
        internals.startGame();
    }

    if (internals.state.flippedCards <= 2) {
        card.classList.add('flipped');
    }

    if (internals.state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');

        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            internals.flipBackCards();
        }, 1000);
    }

    // Check if the necessary elements are present
    if (internals.selectors.boardContainer && internals.selectors.win) {
        // If there are no more cards that we can flip, we won the game
        if (!document.querySelectorAll('.card:not(.flipped)').length) {
            setTimeout(() => {
                internals.selectors.boardContainer.classList.add('flipped');
                internals.selectors.win.innerHTML = `
                    <span class="win-text">
                        You won!<br />
                        with <span class="highlight">${internals.state.totalFlips}</span> moves<br/>
                        under <span class="highlight">${internals.state.totalTime}</span> seconds
                    </span>                           
                    <button class="levelTwo">Play Again</button>


                `;
                clearInterval(internals.state.loop);
            }, 1000);
        }
    } else {
        console.log("Could not find necessary elements for flipCard.");
    }
};

externals.createLevelTwoHtml = function (images) {
    internals.selectors.gameContainer.innerHTML = internals.levelTwoHtml();
   
};


externals.attachEventListeners = function (images) {
    document.addEventListener('click', event => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            internals.flipCard(eventParent);
        } else if (eventTarget.className.includes('start-two') && !eventTarget.className.includes('disabled')) {
            internals.generateMemoryGame(images);
            internals.startGame();
        }
    })

};

export default externals;