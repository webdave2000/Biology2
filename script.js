let selectedCards = [];
let matches = 0;
let timer;
let startTime;

const words = [
    { term: "Glycolysis", definition: "The first stage of cellular respiration, breaking down glucose into pyruvate to produce ATP." },
    { term: "Calvin Cycle", definition: "A series of reactions in photosynthesis that converts CO2, ATP, and NADPH into glucose and other organic molecules." },
    { term: "ATP (Adenosine Triphosphate)", definition: "A molecule that stores and transfers energy within cells, with three phosphate groups." },
    { term: "Electron Transport Chain", definition: "A sequence of protein complexes in cellular respiration that transfers electrons to generate ATP and water." },
    { term: "Photosynthesis", definition: "The process in which plants and other organisms convert sunlight, CO2, and water into glucose and oxygen." },
    { term: "Chemical Products of the Light Reactions", definition: "In photosynthesis, the products include ATP, NADPH, and oxygen, generated in the thylakoid membrane." },
    { term: "Anaerobic Reaction", definition: "A metabolic process occurring without oxygen, such as glycolysis in cellular respiration." },
    { term: "Aerobic", definition: "Processes that require the presence of oxygen, like the citric acid cycle and electron transport chain." },
    { term: "Fermentation", definition: "An anaerobic process converting pyruvate into lactic acid (in animals) or ethanol (in yeast) to regenerate NAD+." },
    { term: "Autotrophs", definition: "Organisms, like plants, that produce their own organic molecules from inorganic substances through photosynthesis." },
    { term: "NADPH (Nicotinamide Adenine Dinucleotide Phosphate)", definition: "A molecule involved in metabolic reactions, acting as a reducing agent by donating electrons and hydrogen ions." },
    { term: "Reactants", definition: "Substances that participate in a chemical reaction, undergoing changes to form products." },
    { term: "Krebs Cycle (Citric Acid Cycle)", definition: "A series of chemical reactions in cellular respiration that generates ATP, NADH, and FADH2." },
    { term: "Chloroplast", definition: "The organelle in plant cells where photosynthesis takes place, containing chlorophyll." },
    { term: "Stroma", definition: "The fluid-filled interior of a chloroplast where the Calvin Cycle of photosynthesis occurs." },
    { term: "FADH2 (Flavin Adenine Dinucleotide)", definition: "A molecule that carries electrons during cellular respiration, contributing to the electron transport chain." },
    { term: "Ribosome", definition: "Cellular structures involved in protein synthesis, where amino acids are assembled into polypeptide chains." },
    { term: "DNA Replication", definition: "The process of making a copy of DNA, ensuring genetic information is preserved and passed on during cell division." }
];

// Creating cards for each word and definition
let cards = [];
words.forEach((word, index) => {
    cards.push({ id: index, text: word.term, type: 'term' });
    cards.push({ id: index, text: word.definition, type: 'definition' });
});

// Shuffle function to randomize the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cards); // Shuffle the cards

function createCardElement(cardText, cardId, cardType) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerText = 'Click me';
    cardElement.setAttribute('data-id', cardId); // Set a data attribute for the card ID
    cardElement.setAttribute('data-type', cardType); // Set a data attribute for the card type
    cardElement.addEventListener('click', function() {
        handleCardClick(this, cardId, cardType);
    });
    return cardElement;
}

function handleCardClick(cardElement, cardId, cardType) {
    if (selectedCards.length < 2 && !cardElement.classList.contains('matched')) {
        cardElement.innerText = cardElement.getAttribute('data-type') === 'term' ? 
                               words[cardId].term : words[cardId].definition;
        selectedCards.push(cardElement);

        if (selectedCards.length === 2) {
            setTimeout(() => {
                const firstCardId = selectedCards[0].getAttribute('data-id');
                const secondCardId = selectedCards[1].getAttribute('data-id');
                const firstCardType = selectedCards[0].getAttribute('data-type');
                const secondCardType = selectedCards[1].getAttribute('data-type');

                if (firstCardId === secondCardId && firstCardType !== secondCardType) {
                    selectedCards.forEach(card => card.classList.add('matched'));
                    matches++;
                    if (matches === words.length) {
                        alert('Congratulations! You matched all the cards!');
                    }
                } else {
                    selectedCards.forEach(card => card.innerText = 'Click me');
                }
                selectedCards = [];
            }, 500);
        }
    }
}

function startChronometer() {
    console.log('Chronometer started');
    startTime = new Date();
    timer = setInterval(updateChronometer, 1000);
}

function updateChronometer() {
    console.log('Chronometer updating');
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    let hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
    let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    document.getElementById('chronometer').innerText = `${hours}:${minutes}:${seconds}`;
}

function stopChronometer() {
    console.log('Chronometer stopped');
    clearInterval(timer);
}

function initializeGame() {
    shuffle(cards); // Shuffle the cards before initializing the game
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    cards.forEach(card => {
        const cardElement = createCardElement('Click me', card.id, card.type);
        gameBoard.appendChild(cardElement);
    });
    matches = 0; // Reset matches
    startChronometer(); // Start the chronometer
}

initializeGame();
