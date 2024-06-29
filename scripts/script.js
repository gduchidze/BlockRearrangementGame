document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const button = document.getElementById('shuffleButton');
    if (button) {
        console.log('Button found, adding event listener');
        button.addEventListener('click', processBlocks);
    } else {
        console.error('Button not found');
    }
});

function processBlocks() {
    console.log('Button clicked, processing blocks');
    let blocks = document.querySelectorAll('.block');
    blocks = Array.from(blocks);
    
    shuffleArray(blocks);
    
    removeAdjacentDuplicates(blocks);
    
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    blocks.forEach(block => grid.appendChild(block));
    
    if (blocks.length > 1) {
        setTimeout(reduceBlocks, 1000); 
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('Blocks shuffled');
}

function removeAdjacentDuplicates(blocks) {
    for (let i = 0; i < blocks.length - 1; i++) {
        if (blocks[i].textContent === blocks[i + 1].textContent) {
            const j = i + 2 < blocks.length ? i + 2 : i - 1;
            if (j >= 0 && j < blocks.length) {
                [blocks[i + 1], blocks[j]] = [blocks[j], blocks[i + 1]];
            }
        }
    }
    console.log('Adjacent duplicates removed');
}

function reduceBlocks() {
    let blocks = document.querySelectorAll('.block');
    blocks = Array.from(blocks);
    
    const halfLength = Math.ceil(blocks.length / 2);
    blocks = blocks.slice(0, halfLength);
    
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    blocks.forEach(block => grid.appendChild(block));
    
    if (blocks.length > 1) {
        setTimeout(processBlocks, 1000); 
    } else {
        alert('Winner: ' + blocks[0].textContent);
    }
    console.log('Blocks reduced');
}