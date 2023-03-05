/**
 * Waits for the Swedish holidays to be fetched and then renders the calendar.
 *
 * @returns {Promise} A promise that resolves when the calendar has been rendered.
 */
async function waitForLoad() {
   const dates = await fetchSwedishHolidays(currentYear, currentMonths);
}

/**
 * Fetches the Swedish holidays for a given year and month.
 * Takes out the dates and names of the holidays, makes a new object out of them and ads that object into the array holidays.
 *
 * @param {number} year - The year for which to fetch the holidays.
 * @param {number} month - The month for which to fetch the holidays.
 *
 * @returns {Promise} A promise that resolves with the fetched holidays.
 */
async function fetchSwedishHolidays(year, month) {
    const url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month + 1}`;
    const response = await fetch(url);
    const result = await response.json();

    for(const day of result.dagar){
        if(day.helgdag !== undefined) {
            let helgdag = {
                //the date of the holiday
                dag: day.datum,
                // the name of the holiday
                helg: day.helgdag,};
            holidays.push(helgdag);
        }
    }

    renderCalendar();
}