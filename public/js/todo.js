/**
 * Create a new object based on user input (title and date) and assign it an id.
 * Push the object into an array and store it in local storage.
 * @param {Event} event The event that triggered the function call.
 */
function createNewToDo(event) {
    event.preventDefault();

    let toDoObject = {
        id: Date.now(),
        title: document.getElementById('input-new-todo-text').value,
        date: document.getElementById('input-new-todo-date').value,
    }

    toDoList.push(toDoObject);
    toDoList.sort(sortArrayAfterDates);
    saveToLS();
    renderTodoList();
    renderCalendar();
}

/**
 * Saves the array toDoList to local storage.
 */
function saveToLS() {
    localStorage.setItem('toDoListStored', JSON.stringify(toDoList));
}

/**
 * Loads the local storage list into the array toDoList.
 */
function loadLSToArray() {
    toDoList = JSON.parse(localStorage.getItem('toDoListStored') || "[]");
}

/**
 * Removes the array saved in local storage, and then runs the function saveToLS.
 */
function reloadLS() {
    localStorage.removeItem('toDoListStored');
    saveToLS();
}

/**
 * Renders the to-do list on the page.
 * It creates a delete and an edit button for each todo.
 *
 * @param {Array} toDoList - An array of objects representing the to-dos to be rendered.
 * @param {string} selectedDate - The selected date for filtering the to-do list. If defined, only to-dos with this date will be displayed.
 */
function renderTodoList() {
    const ul = document.getElementById('todo-global-list');
    ul.innerHTML = "";
    const dailyTodoList = toDoList.filter(todo => todo.date === selectedDate);
    let storedList = JSON.parse(localStorage.getItem('toDoListStored') || "[]");

    //Checks if a date has been clicked or not.
    if (selectedDate !== undefined) {
        storedList = dailyTodoList;
    }

    //Creates a li for each object in the array storedList.
    for (let i = 0; i < storedList.length; i++) {
        const toDo = storedList[i];

        const id = toDo.id;
        const title = toDo.title;
        const date = toDo.date;

        const li = document.createElement('li');
        li.setAttribute('id', id);
        const titleSpan = document.createElement('span');
        const dateSpan = document.createElement('span');

        //Creates an edit button for each li item.
        const editButton = document.createElement('button');
        editButton.setAttribute("data-cy", "edit-todo-button");
        editButton.addEventListener('click', function () {
            document.getElementById('input-new-todo-text').value = title;
            document.getElementById('input-new-todo-date').value = date;
            li.classList.add('edit-border');

            document.getElementById('create-todo').removeEventListener('click', createNewToDo);
            document.getElementById('create-todo').addEventListener('click', function (event) {
                event.preventDefault();

                let newToDoObject = {
                    id: Date.now(),
                    title: document.getElementById('input-new-todo-text').value,
                    date: document.getElementById('input-new-todo-date').value,
                };

                li.classList.remove('edit-border');
                toDoList[i] = newToDoObject;
                toDoList.sort(sortArrayAfterDates);
                saveToLS();
                renderTodoList();
                renderCalendar();
                addEventListeners();

            });
        });

        const editIcon = document.createElement('i');
        editIcon.className = "fa-solid fa-pen";

        //Creates an edit button for each li item.
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("data-cy", "delete-todo-button");
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault();

            toDoList.splice(i, 1);
            reloadLS();
            renderTodoList();
            renderCalendar();
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = "fa-solid fa-trash";

        titleSpan.textContent = title;
        titleSpan.textContent += " " + date;

        li.append(titleSpan, dateSpan, editButton, deleteButton);
        editButton.append(editIcon);
        deleteButton.append(deleteIcon);
        ul.append(li);
    }

}

/**
 * Take two objects from an array and sort the array based on the date set inside the object.
 * @param {Object} a An object with a date property.
 * @param {Object} b An object with a date property.
 * @returns {number} 
 */
function sortArrayAfterDates(a, b) {

    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;

}