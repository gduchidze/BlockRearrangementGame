/*
 ეს ფრაგმენტი იზრდება, როდესაც HTML დოკუმენტის ჩატვირთვა და დაპარსვა დასრულდება
 . ის არის ღილაკის მოძიების და დამატების დასაწყისი.
*/

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

/* 

ეს ფუნქცია იძახება, როდესაც ღილაკზე დაჭერა ხდება. ის ამუშავებს ბლოკების შერევას, მათზე დაჭერის ფუნქციის
სათავეში უშვებს shuffleArray და removeAdjacentDuplicates ფუნქციებს და შემდეგ მათ ხელახლა დაამატებს გრიდში.

*/

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

/* 
 ეს ფუნქცია შერევს ბლოკებს მასივში შემთხვევით წყვეტის გზით

*/

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('Blocks shuffled');
}

/* 

ფუნქცია აშორებს მიმდებარე დუპლიკატებს ბლოკებში.

*/

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

/*


ამ ფუნქციამ ხდება ბლოკების შემცირება 50%-ით, გრიდში
მხოლოდ პირველი ნახევარის დატოვებით, და მერე ხელახლა ამუშავებს ბლოკებს, სანამ არ დარჩება ერთი ბლოკი.

*/

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
