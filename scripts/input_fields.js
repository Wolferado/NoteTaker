/**
 * Function to modify, count and display letter count near input field.
 */
function changeLetterCounter() {
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

    let embedButton = document.getElementById("embed-button");
    embedButton.setAttribute("type", "file");
    embedButton.setAttribute("name", "filename");

    let submitButton = document.getElementById("submit-button");
    submitButton.addEventListener('click', function() {
        createNote();
        titleInputWordCounter.textContent = "0/70"
        textInputWordCounter.textContent = "0/300";
    })
}

/**
 * Function to change how input buttons behave, especially on Enter Key press.
 */
function changeInputBehaviour () {
    let inputForm = document.getElementById("input-form");
    let textInput = document.getElementById("input-text");
    let submitButton = document.getElementById("submit-button");
    inputForm.addEventListener('submit', e => {
        e.preventDefault();
        submitButton.click();
        
    });

    textInput.addEventListener('keydown', function(event) {
        if(event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            submitButton.click();
            textInput.value.trim();
            textInput.value = "";
        }
    });
}

changeLetterCounter();
changeInputBehaviour();