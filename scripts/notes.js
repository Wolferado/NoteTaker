const container = document.getElementById("note-container");
const LOCAL_STORAGE_NOTES_ID_LIST_KEY = "notes.ids.list";
let notesIDs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTES_ID_LIST_KEY)) || [];
var reader = new FileReader();

/**
 * Function to create a note.
 */
function createNote() {
    let titleInput = document.getElementById("input-title");
    let textInput = document.getElementById("input-text");
    let embedInput = document.getElementById("embed-button");
    let warning = document.getElementById("input-warning");
    
    // If both input fields are filled, start creating note.
    if(titleInput.value.trim() && textInput.value.trim()) {
        // Store title and text in a variable.
        let title = titleInput.value;
        let text = textInput.value;
    
        // Create a note and add attribute.
        let note = document.createElement("div");
        let attr = document.createAttribute("class");
        attr.value = "note";
        note.setAttributeNode(attr);

        // Create a note's ID and save it.
        noteId = Date.now().toString();
        note.dataset.id = noteId;

        // Create button container for buttons "Delete" and "Edit".
        let buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "note-button-container");
        
        note.appendChild(buttonContainer);

        // Create "Delete" and "Edit" buttons.
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-button");
        deleteButton.textContent = "Delete Note";

        let editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-button");
        editButton.textContent = "Edit Note";

        // Create functions to trigger on click.
        deleteButton.onclick = function () {
            // Select parent element (note).
            var el = buttonContainer.parentElement;

            // Scroll to the selected note to delete.
            el.scrollIntoView({
                behavior: "smooth"
            });

            // Create an animtation for smooth disappear and delete note.
            let opacity = 1;
            var interval = setInterval(noteDelete, 5);
            function noteDelete() {
                if (opacity <= 0){
                    clearInterval(interval);
                    el.remove();
                    scroll(el)
                    return;
                }
                opacity -= 0.01;
                el.style.opacity = opacity;
            }

            // Select deleted note from Local Storage and delete it along all linked infomration.
            let noteIndex = notesIDs.indexOf(noteId)
            notesIDs.splice(noteIndex, 1);
            localStorage.setItem(LOCAL_STORAGE_NOTES_ID_LIST_KEY, JSON.stringify(notesIDs));
            localStorage.removeItem(noteId + "_title");
            localStorage.removeItem(noteId + "_text");
            localStorage.removeItem(noteId + "_image");
        };

        editButton.onclick = function() {
            // Save previous text and title.
            let oldTitle = titleNode.textContent;
            let oldText = textNode.textContent;

            // Create input to change title.
            let newTitleInput = document.createElement("input");
            newTitleInput.setAttribute("class", "new-input-title");
            newTitleInput.setAttribute("maxlength", "70");

            // Create input to change text.
            let newTextInput = document.createElement("textarea");
            newTextInput.setAttribute("class", "new-input-text");
            newTextInput.setAttribute("maxlength", "300");

            // Position new inputs on title and text positions.
            note.replaceChild(newTitleInput, titleNode);
            note.replaceChild(newTextInput, textNode);
            newTitleInput.value = oldTitle;
            newTextInput.value = oldText;

            // Hide "Delete" and "Edit" buttons.
            editButton.style.display = "none";
            deleteButton.style.display = "none";

            // Create button container for "Save" and "Cancel" buttons.
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

            // Create a function to cancel changes.
            cancelButton.onclick = function() {
                // Replace new inputs with old text and title.
                note.replaceChild(titleNode, newTitleInput);
                note.replaceChild(textNode, newTextInput);

                // Remove new inputs and button container for "Save" and "Cancel" buttons.
                newTitleInput.remove();
                newTextInput.remove();
                changeButtonContainer.remove();

                // Show "Delete" and "Edit" buttons.
                editButton.style.display = "flex";
                deleteButton.style.display = "flex"; 
            }  

            // Create a function to save changes.
            saveButton.onclick = function() {
                // If both input fields are filled out, save new text and title.
                if(newTitleInput.value.trim() && newTextInput.value.trim()) {
                    // Replace new inputs with text and title.
                    note.replaceChild(titleNode, newTitleInput);
                    note.replaceChild(textNode, newTextInput);

                    // Assign new values to text and title.
                    titleNode.textContent = newTitleInput.value;
                    textNode.textContent = newTextInput.value;

                    // Remove new inputs and button container for "Save" and "Cancel".
                    newTitleInput.remove();
                    newTextInput.remove();
                    changeButtonContainer.remove();

                    // Show "Delete" and "Edit" buttons.
                    editButton.style.display = "flex";
                    deleteButton.style.display = "flex"; 

                    // Change text and title in Local Storage.
                    localStorage.setItem(noteId + "_title", titleNode.textContent);
                    localStorage.setItem(noteId + "_text", textNode.textContent);
                }
                else {
                    console.log("Can't save empty fields.");
                }
            }
        };      
    
        // Append "Edit" and "Delete" buttons to their container.
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
    
        // Create a title for a note and append it.
        var titleNode = document.createElement("h2");
        titleNode.textContent = title;
        note.appendChild(titleNode);
    
        // Create a text for a note and append it.
        var textNode = document.createElement("div");
        textNode.textContent = text;
        note.appendChild(textNode);

        // Save note's info to Local Storage.
        localStorage.setItem(noteId + "_title", titleNode.textContent);
        localStorage.setItem(noteId + "_text", textNode.textContent);

        // If there is an embed file, then display it.
        if (embedInput.files[0] != null) {
            // Read the file.
            reader.readAsDataURL(embedInput.files[0]);
            
            // Create image and append it to the note.
            var embedNode = document.createElement("img");
            reader.onloadend = function() {
                embedNode.src = reader.result;   
                
                // Save note's info about image to Local Storage.
                localStorage.setItem(noteId + "_image", embedNode.src);
            }
            note.appendChild(embedNode);
        }

        // Append created note to the container of output notes.
        container.append(note);

        // Push and save note's id to Local Storage.
        notesIDs.push(noteId);
        localStorage.setItem(LOCAL_STORAGE_NOTES_ID_LIST_KEY, JSON.stringify(notesIDs));

        // Reset inputs, hide warnings and select Title input.
        titleInput.value = "";
        textInput.value = "";
        embedInput.value = "";
        warning.style.opacity = 0;
        titleInput.select();
    }
    // Else show warning to fill out both fields.
    else {
        // Create an animation to fade in the warning.
        warning.style.opacity = 0;
        let opacity = 0;
        var interval = setInterval(warningMessageAppear, 5);
        function warningMessageAppear() {
            if (opacity >= 1){
                clearInterval(interval);
                return;
            }
            opacity += 0.01;
            warning.style.opacity = opacity;
        }

        // If specific field is empty, notify about it.
        if(textInput.value.trim()) {
            warning.textContent = "Please, fill out the Title field.";
        }
        else if(titleInput.value.trim()) {
            warning.textContent = "Please, fill out the Text field.";
        }
        else {
            warning.textContent = "Please, fill out both fields.";
        }
    }
}