/*External imports*/
import { useState, useEffect, type SetStateAction } from 'react'
import { startOfWeek, addWeeks, endOfWeek } from "date-fns";
import { createDateArray } from '../utils/dateUtils';

/*Utils & Constants*/
import { currentWeek, currentYear } from "../constants/dateConstants"
import { fetchAppointments, getFamilyId, type Appointment } from "../utils/getData";
import { fetchFamilyMembers, type FamilyMember } from '../utils/getData'
import { convertToDateString } from '../utils/dateUtils';

/*Components*/
import CalendarGrid from './CalendarGrid'
import CalendarHeader from './Header'
import Toolbar from './Toolbar'
import NewAppointment from './NewAppointment'
import { addColorsToFamilyMembers } from '../utils/calendarUtils';
import EditAppointment from './EditAppointment';

export default function Calendar(
  { setSession, userId }:
    { setSession: React.Dispatch<SetStateAction<boolean>>, userId: string }) {
  const [selectedWeekState, setSelectedWeekState] = useState(currentWeek)
  const [selectedYearState, setSelectedYearState] = useState(currentYear)
  const [editAppointmentCard, setEditAppointmentCard] = useState("")

  console.log(`userid calendar: ${userId}`)

  //State
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [refreshKey, setRefreshKey] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)


  //Effects
  useEffect(() => {
    const getGrid = async () => {
      if (firstLoad) {
        const famId = await getFamilyId(userId)
        const famstr = famId[0].family_id
        let members = await fetchFamilyMembers(famstr)
        members = addColorsToFamilyMembers(members)
        setFamilyMembers(members)
        setFirstLoad(false)
      }

      const data = await fetchAppointments(convertToDateString(weekStart), convertToDateString(weekEnd), "a1a104bf-43a0-4d24-bb12-ff63303b9a98")
      setAppointments(data)
    }
    getGrid()
  }, [selectedWeekState, selectedYearState, refreshKey])

  //Date constants
  const weekToDate = addWeeks(new Date(selectedYearState, 0, 1), selectedWeekState - 1)
  const weekStart = startOfWeek(weekToDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 })
  const weekDays = createDateArray(weekStart, weekEnd)


  return (
    <>
      <CalendarHeader setSession={setSession} />

      <Toolbar
        selectedWeek={selectedWeekState}
        setSelectedWeek={setSelectedWeekState}
        selectedYear={selectedYearState}
        setSelectedYear={setSelectedYearState}
        showNewAppointment={showNewAppointment}
        setShowNewAppt={setShowNewAppointment}
        weekStart={weekStart}
        weekEnd={weekEnd}
      />

      <CalendarGrid
        appointments={appointments}
        familyMembers={familyMembers}
        weekDays={weekDays}
        aptCardClickHandler={setEditAppointmentCard}
      />

      {
        showNewAppointment ?
          <NewAppointment familyMembers={familyMembers} showNewAppointment={showNewAppointment} setShowNewAppointment={setShowNewAppointment} weekDays={weekDays} onSave={() => setRefreshKey(k => k + 1)} />
          : null}

      {
        editAppointmentCard ?
          <EditAppointment familyMembers={familyMembers} editAppointmentCard={editAppointmentCard} setEditAppointmentCard={setEditAppointmentCard} appointments={appointments} onSave={() => setRefreshKey(k => k + 1)} />
          : null
      }

    </>
  )

}