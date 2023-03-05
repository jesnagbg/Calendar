/**
 * Calls the 'startClock' function that renders time and date in the welcome segment
 */
function renderTodayView() {
    startClock();
}

/**
 * Creates a date object
 * Calls renderTime and renderDate
 * Passes the date object as an argument to these two functions
 */
function tick() {
    const now = new Date();
    renderTime(now);
    renderDate(now);
}

/** 
 * Creates a repeating interval that calls the 'tick' function every second
 */
function startClock() {
    setInterval(tick, 1000);
}

/**
 * Renders the current weekday, date, month and year
 */
function renderDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}; 
    document.getElementById("current-date").innerHTML = currentDate.toLocaleDateString('sv-SE', options);

    // Capitalizes the string thats shows weekday, date, month and year
    const capitalizeCurrentDate = document.querySelector('#current-date'); // Selects the element with the id "current-date"
    const capitalizeCurrentDateText = capitalizeCurrentDate.textContent; // Gets the text content of the id "current-date"
    const capitalizedText = capitalizeCurrentDateText.charAt(0).toUpperCase() + capitalizeCurrentDateText.slice(1); // Capitalizes the first letter in the string
    capitalizeCurrentDate.textContent = capitalizedText; // Sets the capitalized text as the new text content of the id "current-date"
}

/**
 * Renders the current time in hours, minutes and seconds
 * @param {toString} date - converts date to string
 */
function renderTime(date) {
    const time = date.toTimeString().split(" ")[0]; //Splits the string at the first space
    document.getElementById("current-time").innerHTML = time
}

