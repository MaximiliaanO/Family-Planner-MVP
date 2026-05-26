import { currentDate, firstDateCurrentYear, minYear, maxYear } from "../constants/dateConstants"
import { getYear, getMonth, getDate } from "date-fns"

function getWeekNumber() {
  const days = Math.floor((currentDate.getTime() - firstDateCurrentYear.getTime()) / (24 * 60 * 60 * 1000))
  return Math.ceil((days + firstDateCurrentYear.getDay()) / 7)
}

function createYearArray() {
  let yearArr = []
  for (let step = minYear; step <= maxYear; step++) {yearArr.push(step)}
  return yearArr
}

function createWeekArray() {
  let weekArr = []
  for (let step = 1; step <= 52; step++) {weekArr.push(step)}
  return weekArr
}

type DayObject = {
    date: Date;
    day: string;
}

function createDateArray(startDate: Date, endDate: Date): DayObject[] {
    let dayArray = []
    for (let date = new Date(startDate); date <=endDate; date.setDate(date.getDate() +1))
    {
        const dayNumber = date.getDay()
        let dayAbb
        switch(dayNumber) 
        {
            case 0: 
                dayAbb = "Zondag";
                break;
            case 1: 
                dayAbb = "Maandag";
                break;
            case 2: 
                dayAbb = "Dinsdag";
                break;
            case 3: 
                dayAbb = "Woensdag";
                break;
            case 4: 
                dayAbb = "Donderdag";
                break;
            case 5: 
                dayAbb = "Vrijdag";
                break;
            case 6: 
                dayAbb = "Zaterdag";
                break;
            default: 
                dayAbb = "Error"
        }
        const date_obj = {
            date: new Date(date),
            day: dayAbb
        }
        dayArray.push(date_obj)
    }
    return dayArray
}

function convertDateStringtoDate (datestring : string) {
    const datestr = Date.parse(datestring)
    const year = getYear(datestr).toString()
    const month = (getMonth(datestr) + 1).toString().padStart(2, "0")
    const date = getDate(datestr).toString().padStart(2, "0")
    return `${year}-${month}-${date}`
}

function monthName(monthNumber: number): string {
    switch (monthNumber) {
        case 0: return "januari";
        case 1: return "februari";
        case 2: return "maart";
        case 3: return "april";
        case 4: return "mei";
        case 5: return "juni";
        case 6: return "juli";
        case 7: return "augustus";
        case 8: return "september";
        case 9: return "oktober";
        case 10: return "november";
        case 11: return "december";
        default: throw new Error(`Ongeldig maandnummer: ${monthNumber}`);
    }
}

function convertToDateString(inputDate: Date) : string {
    const pad = (n: number) => String(n).padStart(2, "0")
    const result = `${inputDate.getFullYear()}-${pad(inputDate.getMonth() + 1)}-${pad(inputDate.getDate())}`
    return result
}

export {
    getWeekNumber,
    createYearArray,
    createWeekArray,
    createDateArray,
    convertToDateString,
    monthName,
    type DayObject,
    convertDateStringtoDate
}
