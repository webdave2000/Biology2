let selectedCards = [];
let matches = 0;
let timer;
let startTime;
let gameCards = []; // Global variable for the cards used in the game

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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(cardText, cardId, cardType) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerText = cardText; // Set initial text to "Click me" or similar
    cardElement.setAttribute('data-id', cardId);
    cardElement.setAttribute('data-type', cardType); // Set the type attribute (term or definition)
    cardElement.addEventListener('click', function() {
        handleCardClick(this, cardId, cardType);
    });
    return cardElement;
}

function handleCardClick(cardElement, cardId, cardType) {
    if (selectedCards.length < 2 && !cardElement.classList.contains('matched')) {
        const cardData = gameCards.find(card => card.id === cardId && card.type === cardType);
        cardElement.innerText = cardData.text;
        selectedCards.push({ element: cardElement, data: cardData });

        if (selectedCards.length === 2) {
            setTimeout(() => {
                const firstCardData = selectedCards[0].data;
                const secondCardData = selectedCards[1].data;

                if (firstCardData.id === secondCardData.id && firstCardData.type !== secondCardData.type) {
                    selectedCards.forEach(cardObj => cardObj.element.classList.add('matched'));
                    matches++;
                } else {
                    selectedCards.forEach(cardObj => cardObj.element.innerText = 'Click me');
                }

                if (matches === gameCards.length / 2) {
                    alert('Congratulations! You matched all the cards!');
                    stopChronometer();
                }

                selectedCards = [];
            }, 500);
        }
    }
}


function startChronometer() {
    startTime = new Date();
    timer = setInterval(updateChronometer, 1000);
}

function updateChronometer() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    let hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
    let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    document.getElementById('chronometer').innerText = `${hours}:${minutes}:${seconds}`;
}

function stopChronometer() {
    clearInterval(timer);
}

function chooseDifficulty() {
    shuffle(words); // Shuffle the entire words array for randomness
    let difficulty = prompt("Choose a difficulty: Easy, Medium, Hard").toLowerCase();
    switch (difficulty) {
        case 'easy':
            return words.slice(0, 6);
        case 'medium':
            return words.slice(0, 9);
        default:
            return words; // Hard or default to all words
    }
}

function initializeGame() {
    let selectedWords = chooseDifficulty();
    gameCards = selectedWords.flatMap((word, index) => [
        { id: index, text: word.term, type: 'term' },
        { id: index, text: word.definition, type: 'definition' }
    ]);

    shuffle(gameCards); // Shuffle the game cards

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    gameCards.forEach(card => {
        const cardElement = createCardElement('Click me', card.id, card.type);
        gameBoard.appendChild(cardElement);
    });

    selectedCards = [];
    matches = 0; // Reset matches
    startChronometer(); // Start the chronometer
}
initializeGame();
