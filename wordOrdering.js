class WordList {
    #words;

    constructor(wordsArray) {
        this.#words = wordsArray;
    }

    sortAlphabetical() {
        // Case-insensitive sort
        this.#words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }

    sortReverseAlphabetical() {
        this.sortAlphabetical();
        this.#words.reverse();
    }

    sortRandom() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.#words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#words[i], this.#words[j]] = [this.#words[j], this.#words[i]];
        }
    }

    getWords() {
        return this.#words.join(" ");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("wordInput");
    const message = document.getElementById("message");

    const process = (sortType) => {
        const rawValue = input.value.trim();

        // Check if empty
        if (rawValue === "") {
            message.textContent = "The word list box is empty. You must enter words in it.";
            return;
        }

        // Split by one or more spaces
        const wordsArray = rawValue.split(/\s+/);

        // Validate: ONLY alphabetic characters
        const isValid = wordsArray.every(word => /^[A-Za-z]+$/.test(word));

        if (!isValid) {
            message.textContent = "The input is invalid. You must enter valid words in the word list box.";
            return;
        }

        // Success: Clear message and sort
        message.textContent = "";
        const listManager = new WordList(wordsArray);

        if (sortType === 'alpha') listManager.sortAlphabetical();
        if (sortType === 'reverse') listManager.sortReverseAlphabetical();
        if (sortType === 'random') listManager.sortRandom();

        input.value = listManager.getWords();
    };

    // Event Listeners
    document.getElementById("alphaBtn").onclick = () => process('alpha');
    document.getElementById("reverseBtn").onclick = () => process('reverse');
    document.getElementById("randomBtn").onclick = () => process('random');
});
