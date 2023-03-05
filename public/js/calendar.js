let date = new Date();
/**
 * Current month displayed as a number.
 */
let currentMonths = date.getMonth();
/**
 * Current year displayed as a number.
*/
let currentYear = date.getFullYear();

/**Function that showing the month and render the calendar */
function initCalendar() {
    showMonths();
    renderCalendar();
}
/**Render calender with current year, month and calendarbody */
function renderCalendar() {
    let date = new Date(currentYear, currentMonths);
    renderCurrentMonth(date);
    renderCurrentYear(date);
    renderCalendarBody(date);
}

/**Array of months */
const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
/**
 * 
 * @param {number} date 
 */
function renderCurrentMonth(date) {
    let currentMonth = months[date.getMonth()];
    currentMonths = date.getMonth();
    document.getElementById("current-month").innerHTML = currentMonth;
}

/**
 * Get current month frome date object
 * @param {number} date 
 */
function renderCurrentYear(date) {
    currentYear = date.getFullYear();
    document.getElementById("current-year").innerHTML = currentYear;
}

/**
 * Get current year from date object
 * @param {number} date 
 */
function renderCalendarBody(date) {
    const calendarBody = document.querySelector("#calendar-dates-container");
    calendarBody.innerHTML = "";

   const year = date.getFullYear();
   const month = date.getMonth();

   /**Get number of days in curreent month */
    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
    /**Get weekday of first day in month */
    let weekdayOfFirstDayInMonth = new Date(year, month, 1).getDay() - 1;
    /**If the day is 0 (Sunday), set it to 7 to match the layout of calendar and current day*/
    if (weekdayOfFirstDayInMonth < 0) {
        weekdayOfFirstDayInMonth += 7;
    }
    /**Add empty div elements to calendar body for the weekday before the first day of the month*/
    for (let i = 0; i < weekdayOfFirstDayInMonth; i++) {
        const week = document.createElement('div');
        calendarBody.append(week);
    }

    /**Loop for create div elements for each day in month */
    for (let i = 0; i < numberOfDaysInMonth; i++) {
        const day = i + 1;
        const dayDiv = document.createElement('div');
        const holidaySpan = document.createElement('span');
        const dailyTodoParagraph = document.createElement('p');
        dayDiv.innerText = day;
        let todosOnCurrentDay = 0;
        let helgDag = "";
        
        /**Check if current day is a holiday and add holiday to span element */
        for (const highDay of holidays) {
            const occasion = highDay.helg;
            const occasionDay = new Date(highDay.dag).getDate();
            const occasionMonth = new Date(highDay.dag).getMonth();
            if (occasionDay == day && occasionMonth == month) {
                helgDag = occasion;
                holidaySpan.innerText = helgDag;
            };
        };

        /**Check if any todos on current day and update todosOnCurrentDay if there is*/
        for (const todo of toDoList) {
            const todoDay = new Date(todo.date).getDate();
            const todoMonth = new Date(todo.date).getMonth();
            const todoYear = new Date(todo.date).getFullYear();
            if (todoDay == day && todoMonth == month && todoYear == year) {
                todosOnCurrentDay++;
                dailyTodoParagraph.innerText = todosOnCurrentDay;
                dayDiv.addEventListener('click', function () {
                    selectedDate = new Date(year, month, day).toLocaleString().slice(0, 10);
                    dayDiv.addEventListener('click', function() {
                        selectedDate = undefined;
                        renderTodoList();
                        renderCalendar();
                    })
                    renderTodoList();
                });
            }
        }

        dayDiv.append(dailyTodoParagraph, holidaySpan);
        calendarBody.append(dayDiv);
    }
    /**get div elements for the days in calendar body */
    const daysDivs = calendarBody.getElementsByTagName('div');
    numDivs = daysDivs.length;
    /**If there are less than 35 div elements(days) add empty div elements to fill the calendar body*/
    if (numDivs < 35) {
        for (let i = numDivs; i < 35; i++) {
            const newDiv = document.createElement('div');
            calendarBody.append(newDiv);
        }
    }
}

/**
 * Adds click events to the < and > buttons in the calendar (so the user can 
 * navigate between previous and next month through the nextMonth function below)
 */
function showMonths() {
    let changeMonth = 0;

    const prevButton = document.getElementById('prev-month-button');
    prevButton.addEventListener('click', function () {
        changeMonth--;
        nextMonth(changeMonth);
    });

    const nextButton = document.getElementById('next-month-button');
    nextButton.addEventListener('click', function () {
        changeMonth++;
        nextMonth(changeMonth);
    });
};

/**
 * Makes it possible to navigate between next and previous months and years in 
 * the calendar, depending on which month is currently viewed/rendered
 * @param {number} changeMonth is the current month viewed in the calendar
 */
function nextMonth(changeMonth) {
    let date = new Date();
    date.setMonth(date.getMonth() + changeMonth);

    renderCurrentMonth(date);
    renderCalendarBody(date);
    renderCurrentYear(date);
    waitForLoad();
};

