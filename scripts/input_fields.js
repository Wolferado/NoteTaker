let embedInputDelete = document.getElementById("delete-embed");

/**
 * Function to activate letter counters for the inputs..
 */
function activateLetterCounter() {
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
}

/**
 * Function to change how input buttons behave, especially on Enter Key press.
 */
function changeInputBehaviour () {
    let inputForm = document.getElementById("input-form");
    let titleInputWordCounter = document.getElementById("titleWordCounter");
    let textInput = document.getElementById("input-text");
    let textInputWordCounter = document.getElementById("textWordCounter");
    let submitButton = document.getElementById("submit-button");
    let embedInput = document.getElementById("embed-button");
    let embedInputLabel = document.getElementById("embed-label");

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

    embedInputDelete.onclick = function() {
        embedInput.value = "";
        embedInputLabel.textContent = "Choose a File...";
        embedInputLabel.style.cursor = "pointer";
        embedInput.disabled = false;
        embedInputDelete.style.display = "none";
    }

    inputForm.addEventListener('submit', e => {
        e.preventDefault();
    });

    textInput.addEventListener('keydown', function(event) {
        if(event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            submitButton.click();
            textInput.value.trim();
            textInput.value.trim();
        }
    });

    // Fix warning to reset text contents of counters.
    submitButton.addEventListener('click', function() {
        createNote();
        titleInputWordCounter.textContent = "0/70"
        textInputWordCounter.textContent = "0/300";
        embedInputDelete.click();
    })
}

activateLetterCounter();
changeInputBehaviour();