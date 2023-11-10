const cards = [
    { word: "Glycolysis", definition: "The first stage of cellular respiration, breaking down glucose into pyruvate to produce ATP." },
    // ... Add all other pairs here
    { word: "DNA Replication", definition: "The process of making a copy of DNA, ensuring genetic information is preserved and passed on during cell division." }
];

let selectedCard = null;
let matches = 0;

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.word = card.word;
    cardElement.dataset.definition = card.definition;
    cardElement.textContent = card.word;

    cardElement.addEventListener('click', () => {
        if (selectedCard) {
            if (selectedCard.dataset.definition === cardElement.dataset.definition) {
                matches++;
                selectedCard.classList.add('hidden');
                cardElement.classList.add('hidden');
                selectedCard = null;
                if (matches === cards.length / 2) {
                    alert('Congratulations, you won!');
                }
            } else {
                selectedCard.textContent = selectedCard.dataset.word;
                selectedCard = null;
            }
        } else {
            selectedCard = cardElement;
            cardElement.textContent = cardElement.dataset.definition;
        }
    });

    return cardElement;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    const gameContainer = document.getElementById('game');
    shuffleArray(cards);
    cards.forEach(card => {
        gameContainer.appendChild(createCard(card));
    });
}

initializeGame();
