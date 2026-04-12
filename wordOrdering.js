class WordList {
    #words;

    constructor(wordsArray) {
        this.#words = wordsArray;
    }

    sortAlphabetical() {
        this.#words.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }

    sortReverseAlphabetical() {
        this.sortAlphabetical();
        this.#words.reverse();
    }

    sortRandom() {
        for (let i = this.#words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#words[i], this.#words[j]] = [this.#words[j], this.#words[i]];
        }
    }

    getWords() {
        return this.#words.join(" ");
    }
}

function processWords(type) {
    const input = document.getElementById("wordInput");
    const message = document.getElementById("message");
    const rawValue = input.value.trim();

    // 1. Check if empty
    if (rawValue === "") {
        message.textContent = "The word list box is empty. You must enter words in it.";
        return;
    }

    // 2. Split and Validate characters (only letters allowed)
    const wordsArray = rawValue.split(/\s+/);
    const isValid = wordsArray.every(word => /^[A-Za-z]+$/.test(word));

    if (!isValid) {
        message.textContent = "The input is invalid. You must enter valid words in the word list box.";
        return;
    }

    // 3. Process with WordList class
    const myWordList = new WordList(wordsArray);
    message.textContent = ""; // Clear errors

    if (type === 'alpha') {
        myWordList.sortAlphabetical();
    } else if (type === 'reverse') {
        myWordList.sortReverseAlphabetical();
    } else if (type === 'random') {
        myWordList.sortRandom();
    }

    // Update the input field with the reordered words
    input.value = myWordList.getWords();
}
