function changeWordCounter() {
    let titleInputWordCounter = document.getElementById("titleWordCounter");
    let titleInput = document.getElementById("input-title");
    titleInput.addEventListener('keyup', function() {
        let titleWords = titleInput.value;
        let titleLetterCount = titleWords.replace(/\s+/g, '').length;
        titleInputWordCounter.textContent = titleLetterCount + "/70";
    });

    let textInputWordCounter = document.getElementById("textWordCounter");
    let textInput = document.getElementById("input-text");
    textInput.addEventListener('keyup', function() {
        let textWords = textInput.value;
        let textLetterCount = textWords.replace(/\s+/g, '').length;
        textInputWordCounter.textContent = textLetterCount + "/300";
    });

    let submitButton = document.getElementById("submit-button");
    submitButton.addEventListener('click', function() {
        createNote();
        titleInputWordCounter.textContent = "0/70"
        textInputWordCounter.textContent = "0/300";
    })
}

changeWordCounter();