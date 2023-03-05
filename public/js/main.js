window.addEventListener('DOMContentLoaded', main);
/**Array to store todo list*/
let toDoList = [];

/**Array to store holiday and date. */
let holidays = [];

/**Variable to stor selected date */
let selectedDate;

/**Get element for the save button */
const saveButtonContainer = document.getElementById('todo-button-container');

/**Main function to start page load */
function main() {
    loadLSToArray();
    renderTodoList();   
    initCalendar(); 
    renderTodayView();
    addEventListeners();    
    waitForLoad();
}

function addEventListeners() {
    /**Creates new todo*/
    document.getElementById('create-todo').addEventListener('click', createNewToDo);
}


