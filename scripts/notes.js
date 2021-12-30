const container = document.getElementById("note-container");

function createNote() {
    let titleInput = document.getElementById("input-title");
    let textInput = document.getElementById("input-text");
    
    // TO DO: Create a text that notify to fill all fields (as well as to edit)
    if(titleInput.value.trim() && textInput.value.trim()) {
        let title = titleInput.value;
        let text = textInput.value;
    
        let note = document.createElement("div");

        let attr = document.createAttribute("class");
        attr.value = "note";
    
        note.setAttributeNode(attr);

        let buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "note-button-container");
        
        note.appendChild(buttonContainer);

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-button");
        deleteButton.textContent = "Delete Note";

        let editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-button");
        editButton.textContent = "Edit Note";

        // TODO: Simply fix the opacity
        deleteButton.onclick = function () {
            var el = buttonContainer.parentElement;
            var opacity = parseFloat(el.style.opacity);
            for(var i = 1; i < 99; i++) {
                opacity -= 0.01;
                el.setAttribute('style', 'opacity: ' + opacity);
            }

            el.remove();
        };

        editButton.onclick = function() {
            let oldTitle = titleNode.textContent;
            let oldText = textNode.textContent;

            let newTitleInput = document.createElement("input");
            newTitleInput.setAttribute("class", "new-input-title");
            newTitleInput.setAttribute("maxlength", "70");

            let newTextInput = document.createElement("textarea");
            newTextInput.setAttribute("class", "new-input-text");
            newTextInput.setAttribute("maxlength", "300");

            note.replaceChild(newTitleInput, titleNode);
            note.replaceChild(newTextInput, textNode);
            newTitleInput.value = oldTitle;
            newTextInput.value = oldText;

            editButton.style.display = "none";
            deleteButton.style.display = "none";

            let changeButtonContainer = document.createElement("div");
            changeButtonContainer.setAttribute("class", "change-button-container");
            note.appendChild(changeButtonContainer);

            let cancelButton = document.createElement("button");
            cancelButton.setAttribute("class", "cancel-button");
            cancelButton.textContent = "Cancel Changes";
            changeButtonContainer.appendChild(cancelButton);

            let saveButton = document.createElement("button");
            saveButton.setAttribute("class", "save-button");
            saveButton.textContent = "Save Changes";
            changeButtonContainer.appendChild(saveButton);

            cancelButton.onclick = function() {
                note.replaceChild(titleNode, newTitleInput);
                note.replaceChild(textNode, newTextInput);
                newTitleInput.remove();
                newTextInput.remove();
                changeButtonContainer.remove();
                editButton.style.display = "flex";
                deleteButton.style.display = "flex"; 
            }  

            saveButton.onclick = function() {
                if(newTitleInput.value.trim() && newTextInput.value.trim()) {
                    note.replaceChild(titleNode, newTitleInput);
                    note.replaceChild(textNode, newTextInput);
                    titleNode.textContent = newTitleInput.value;
                    textNode.textContent = newTextInput.value;
                    newTitleInput.remove();
                    newTextInput.remove();
                    changeButtonContainer.remove();
                    editButton.style.display = "flex";
                    deleteButton.style.display = "flex"; 
                }
                else {
                    console.log("Can't save empty fields.");
                }
            }
        };      
    
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
    
        var titleNode = document.createElement("h2");
        titleNode.textContent = title;
        note.appendChild(titleNode);
    
        var textNode = document.createElement("div");
        textNode.textContent = text;
        note.appendChild(textNode);
    
        container.append(note);

        titleInput.value = "";
        textInput.value = "";
    }
}