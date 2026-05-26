import type { SetStateAction } from "react"
import type { Appointment, FamilyMember } from "../utils/getData"

export default function AppointmentCard({ appointment, member, aptCardClickHandler }: { appointment: Appointment, member: FamilyMember, aptCardClickHandler: React.Dispatch<SetStateAction<string>> }) {

    return (
        <div
            key={appointment.apt_id}
            className={`rounded p-2 text-sm shadow ${member.bgColor} cursor-pointer shadow-md`}
            onClick={() => aptCardClickHandler(appointment.apt_id)}
        >
            <p className={`font-semibold ${member.fontColor}`}>{appointment.title}</p>
            <p className="text-xs text-gray-700">{(appointment.appointment_start_time).slice(0, 5)}-{(appointment.appointment_end_time).slice(0, 5)}</p>
        </div>
    )
}