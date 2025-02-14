document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        kanaOverlay: document.querySelector('.kana-overlay'),
        answer: document.querySelector('.answer'),
        series: document.querySelector('.series'),
        kanji: document.querySelector('.kanji'),
        romaji: document.querySelector('.romaji'),
        image: document.querySelector('.image-container img'),
        imageContainer: document.querySelector('.image-container'), // Add this line
        button: document.querySelector('.next-button')
    };

    // Get a random character and their data
    function getRandomCharacter() {
        const chars = Object.entries(characters);
        const [key, data] = chars[Math.floor(Math.random() * chars.length)];
        return { key, ...data };
    }

    // Update the DOM with a new character's data
    function loadNewCharacter() {
        const character = getRandomCharacter();
        const randomKana = character.kana[Math.floor(Math.random() * character.kana.length)];

        // Update inner HTMLs
        elements.kanaOverlay.textContent = randomKana;
        elements.answer.textContent = character.answer;
        elements.series.textContent = `(${character.series})`;
        elements.kanji.textContent = character.kanji;
        elements.romaji.textContent = `(${character.romaji})`;

        // Set the image source
        elements.image.src = `../files/kana/${character.key}.jpg`;
        elements.image.alt = character.answer; // Add alt text for accessibility
    }

    // Toggle visibility of answer elements and button text
    function toggleAnswerVisibility() {
        // Toggle .hidden class for answer, series, kanji, romaji, and image container
        elements.answer.classList.toggle('hidden');
        elements.series.classList.toggle('hidden');
        elements.kanji.classList.toggle('hidden');
        elements.romaji.classList.toggle('hidden');
        elements.imageContainer.classList.toggle('hidden'); // Add this line

        // Toggle .hidden-bg class for kana-overlay
        elements.kanaOverlay.classList.toggle('hidden-bg');

        // Toggle button text between "Resposta" and "Next"
        elements.button.textContent = elements.button.textContent === 'Answer' ? 'Next' : 'Answer';
    }

    // Handle button click
    function handleButtonClick() {
        if (elements.button.textContent === 'Answer') {
            // First click: Show answer
            toggleAnswerVisibility();
        } else {
            // Second click: Load new character and reset to front card
            loadNewCharacter();
            toggleAnswerVisibility();
        }
    }

    // Initial load
    loadNewCharacter();

    // Add event listener to the button
    elements.button.addEventListener('click', handleButtonClick);
});