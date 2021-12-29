const container = document.getElementById("note-container");

function createNote() {
    let titleInput = document.getElementById("input-title");
    let textInput = document.getElementById("input-text");

    if(titleInput.value.trim() || textInput.value.trim()) {
        let title = titleInput.value;
        let text = textInput.value;
    
        var note = document.createElement("div");

        var attr = document.createAttribute("class");
        attr.value = "note";
    
        note.setAttributeNode(attr);

        let newButton = document.createElement("button");
        newButton.setAttribute("id", "delete-button");
        newButton.textContent = "x";

        // TODO: Simply fix the opacity
        newButton.onclick = function () {
            var el = newButton.parentElement;
            let style = getComputedStyle(el);
            var opacity = parseFloat(style.opacity);
            for(var i = 1; i < 99; i++) {
                opacity -= 0.01;
                el.setAttribute('style', 'opacity: ' + opacity);
            }

            el.remove();
        };
    
        note.appendChild(newButton);
    
        var titleNode = document.createElement("h2");
        titleNode.textContent = title;
        note.appendChild(titleNode);
    
        var textNode = document.createElement("div");
        textNode.textContent = text;
        note.appendChild(textNode);
    
        container.append(note);
    }
    titleInput.value = "";
    textInput.value = "";
}

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