import { convertToDateString } from "../utils/dateUtils";
import { type Appointment, type FamilyMember } from "../utils/getData";
import AppointmentCard from "./AppointmentCard";
import TopCalendarGrid from "./TopCalendarGrid";
import type { DayObject } from "../utils/dateUtils";
import PersonCircle from "./personCircle";
import type { SetStateAction } from "react";


type CalendarGridProps = {
    appointments: Appointment[]
    familyMembers: FamilyMember[],
    weekDays: DayObject[],
    aptCardClickHandler: React.Dispatch<SetStateAction<string>>
}

export default function CalendarGrid({ appointments, familyMembers, weekDays, aptCardClickHandler } : CalendarGridProps) {



    //const appointmentData = fetchAppointments(convertToDateString(weekStart), convertToDateString(weekEnd))

    // TODO: Revisit with DB data and extract to utils
    const getAppointmentsForCell = (person: string, date: string) : Appointment[] => {
        return appointments.filter(
            (appointment) => appointment.person === person && appointment.appointment_start_date === date
        );
    };

    return (
        <div className="mt-14 border-2 border-[#ECE4D6] text-center max-w-[90%] mx-auto my-[5.0%] rounded-2xl bg-black/85 overflow-hidden shadow-md">
        <div key="grid" className="grid grid-cols-8 bg-[#FBF7F1] shadow-2xl">
            {/*Top line of the grind cells: name/weekday and monday until firday with dates*/}
            <TopCalendarGrid weekDays={weekDays} />

            {/*Main grid, first column: person next columns days of the week*/}
            {
                familyMembers.flatMap((obj) => {

                    return [
                        <div
                            key={`name:${obj.first_name}`}
                            className={`border-t border-[#ECE4D6] border-r min-h-45 ${obj.bgColor} flex items-center`}
                        >
                            <div className={`w-2 min-h-[80%] rounded-r-2xl ${obj.accentColor}`}></div>
                            <PersonCircle member={obj} />
                            <p className={`m-1 font-bold ${obj.fontColor}`}>{obj.first_name}</p>
                        </div>,

                        //Generate divs for days of the week
                        ...weekDays.map((dateobj) => {

                            const strDate = convertToDateString(dateobj.date)
                            const cellAppointments = getAppointmentsForCell(obj.first_name, strDate);

                            return (
                                <div
                                    key={`${obj.first_name}-${strDate}`}
                                    className={`border-t border-[#ECE4D6] ${dateobj.day === "Sun" ? "" : `border-r`} min-h-32 p-2`} // Same border rule
                                >
                                    <div key={`${obj.first_name}--${strDate}`} className="flex flex-col gap-1">
                                        {/* Appointments rendering */}
                                        {cellAppointments.map((appt) => (
                                            <AppointmentCard appointment={appt} member={obj} key={appt.apt_id} aptCardClickHandler={aptCardClickHandler}/>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ];
                })}
        </div>
        </div>
    )
}