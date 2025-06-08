let currentCenter = 1;
const totalBlocks = 5;

function mod(n, m) {
    return ((n - 1 + m) % m) + 1;
}

function updateBlocks() {
    for (let i = 1; i <= totalBlocks; i++) {
        const block = document.getElementById(`block${i}`);
        block.className = 'block'; // reset classes

        if (i === currentCenter) {
            block.classList.add('center');
        } else if (i === mod(currentCenter + 1, totalBlocks)) {
            block.classList.add('right1');
        } else if (i === mod(currentCenter + 2, totalBlocks)) {
            block.classList.add('right2');
        } else if (i === mod(currentCenter - 1, totalBlocks)) {
            block.classList.add('left1');
        } else if (i === mod(currentCenter - 2, totalBlocks)) {
            block.classList.add('left2');
        } else {
            block.classList.add('hidden');
        }
    }
}

function blockNumberAdd() {
    currentCenter = currentCenter < totalBlocks ? currentCenter + 1 : 1;
    updateBlocks();
}

function blockNumberMinus() {
    currentCenter = currentCenter > 1 ? currentCenter - 1 : totalBlocks;
    updateBlocks();
}

document.addEventListener('DOMContentLoaded', updateBlocks);