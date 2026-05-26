import { startOfWeek, getWeek } from "date-fns";
import { createWeekArray, createYearArray } from "../utils/dateUtils"

//Current
const currentDate = new Date()
const startCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })

//Year Constants
const minYear = 2022
const maxYear = 2026
const yearList = createYearArray()
const currentYear = currentDate.getFullYear()
const firstDateCurrentYear = new Date(currentYear, 0, 1)

//Month Constants
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//Week Constants
const weekList = createWeekArray()
const currentWeek = getWeek(currentDate) //getWeekNumber()

export {
    currentDate,
    startCurrentWeek,
    minYear,
    maxYear,
    yearList,
    currentYear,
    firstDateCurrentYear,
    monthNames,
    weekList,
    currentWeek
}