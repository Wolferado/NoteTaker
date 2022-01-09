let embedInputDelete = document.getElementById("delete-embed");

/**
 * Function to activate letter counters for the inputs..
 */
function activateLetterCounter() {
    let titleInputWordCounter = document.getElementById("titleWordCounter");
    let titleInput = document.getElementById("input-title");

    // Add event listener for Title Input to link it to word counter.
    titleInput.addEventListener('keyup', function() {
        let titleWords = titleInput.value;
        let titleLetterCount = titleWords.replace(/\s+/g, '').length;
        titleInputWordCounter.textContent = titleLetterCount + "/70";
    });

    let textInputWordCounter = document.getElementById("textWordCounter");
    let textInput = document.getElementById("input-text");

    // Add event listener for Text Input to link it to word counter.
    textInput.addEventListener('keyup', function() {
        let textWords = textInput.value;
        let textLetterCount = textWords.replace(/\s+/g, '').length;
        textInputWordCounter.textContent = textLetterCount + "/300";
    });
}

/**
 * Function to change how input buttons behave, especially on Enter Key press.
 */
function changeInputBehaviour () {
    let inputForm = document.getElementById("input-form");
    let titleInput = document.getElementById("input-title");
    let titleInputWordCounter = document.getElementById("titleWordCounter");
    let textInput = document.getElementById("input-text");
    let textInputWordCounter = document.getElementById("textWordCounter");
    let submitButton = document.getElementById("submit-button");
    let embedInput = document.getElementById("embed-button");
    let embedInputLabel = document.getElementById("embed-label");

    // Add event listener for Embed Input to change its text if it contains file.
    embedInput.addEventListener('change', function() {
        if(embedInput.value != null) {
            embedInputLabel.textContent = "File Selected";
            embedInputLabel.style.cursor = "default";
            embedInput.disabled = true;
            embedInputDelete.style.display = "flex";
        }
        else {
            embedInputLabel.textContent = "Choose a File...";
            embedInputLabel.style.cursor = "pointer";
            embedInput.disabled = false;
            embedInputDelete.style.display = "none";
        }
    });

    // Add event listener for Delete Embed File to change Embed Input text.
    embedInputDelete.onclick = function() {
        embedInput.value = "";
        embedInputLabel.textContent = "Choose a File...";
        embedInputLabel.style.cursor = "pointer";
        embedInput.disabled = false;
        embedInputDelete.style.display = "none";
    }

    // Add event listener to prevent default actions for the form and make submit button clickable on its text.
    inputForm.addEventListener('submit', e => {
        e.preventDefault();
        submitButton.textContent = "Take a Note";
    });

    // Add event listener to submit note once Shift key pressed in Text Input.
    textInput.addEventListener('keydown', function(event) {
        if(event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            submitButton.click();
            titleInput.value.trim();
            textInput.value.trim();
        }
    });

    // Add event listener for Submit Button to submit note.
    submitButton.addEventListener('click', function() {
        // If all input fields are filled out, create note and clear inputs.
        if(titleInput.value.trim() && textInput.value.trim()) {
            createNote();
            embedInputDelete.click();
            titleInputWordCounter.textContent = "0/70";
            textInputWordCounter.textContent = "0/300";
        }
        // Else call createNote function which will result in a warning's pop-up.
        else {
            createNote();
        }
    });
}

activateLetterCounter();
changeInputBehaviour();