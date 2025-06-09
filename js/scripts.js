let currentCenterGame = 1;
let currentCenterMovie = 1;
const totalBlocks = 5;

function mod(n, m) {
    return ((n - 1 + m) % m) + 1;
}

function updateBlocksGame() {
    for (let i = 1; i <= totalBlocks; i++) {
        const block = document.getElementById(`block${i}`);
        block.className = 'blockGame'; // reset classes

        if (i === currentCenterGame) {
            block.classList.add('center');
        } else if (i === mod(currentCenterGame + 1, totalBlocks)) {
            block.classList.add('right1');
        } else if (i === mod(currentCenterGame + 2, totalBlocks)) {
            block.classList.add('right2');
        } else if (i === mod(currentCenterGame - 1, totalBlocks)) {
            block.classList.add('left1');
        } else if (i === mod(currentCenterGame - 2, totalBlocks)) {
            block.classList.add('left2');
        } else {
            block.classList.add('hidden');
        }
    }
}

function updateBlocksMovie() {
    for (let i = 1; i <= totalBlocks; i++) {
        const block = document.getElementById(`block${i+5}`);
        block.className = 'blockMovie'; // reset classes

        if (i === currentCenterMovie) {
            block.classList.add('center');
        } else if (i === mod(currentCenterMovie + 1, totalBlocks)) {
            block.classList.add('right1');
        } else if (i === mod(currentCenterMovie + 2, totalBlocks)) {
            block.classList.add('right2');
        } else if (i === mod(currentCenterMovie - 1, totalBlocks)) {
            block.classList.add('left1');
        } else if (i === mod(currentCenterMovie - 2, totalBlocks)) {
            block.classList.add('left2');
        } else {
            block.classList.add('hidden');
        }
    }
}

function blockNumberAddGame() {
    currentCenterGame = currentCenterGame < totalBlocks ? currentCenterGame + 1 : 1;
    updateBlocksGame();
}

function blockNumberMinusGame() {
    currentCenterGame = currentCenterGame > 1 ? currentCenterGame - 1 : totalBlocks;
    updateBlocksGame();
}
function blockNumberAddMovie() {
    currentCenterMovie = currentCenterMovie < totalBlocks ? currentCenterMovie + 1 : 1;
    updateBlocksMovie();
}

function blockNumberMinusMovie() {
    currentCenterMovie = currentCenterMovie > 1 ? currentCenterMovie - 1 : totalBlocks;
    updateBlocksMovie();
}

document.addEventListener('DOMContentLoaded', () => {
    updateBlocksGame();
    updateBlocksMovie();
});