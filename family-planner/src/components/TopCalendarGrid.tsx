import type { DayObject } from "../utils/dateUtils"
import AptPar from "./AppointmentParagraph"

export default function TopCalendarGrid({ weekDays } : {weekDays : DayObject[]}) {

    return (
        <>
            {/*Top line of the grind cells: name/weekday and monday until firday with dates*/}
            <div key={"family"} className="bg-[#F5EFE6] border-[#ECE4D6] border-r flex items-center justify-center" ><AptPar>FAMILIE</AptPar></div >
            {
                weekDays.map(obj => (
                    <div
                        key={obj.day}
                        className={`bg-[#F5EFE6] border-[#ECE4D6] ${obj.day === "Zondag" ? "" : "border-r"}`} // If obj key = Sunday no border
                    >
                        <p className="flex items-center p-3">
                            <span className={`ml-2 text-[14px] text-[#6B6358] ${obj.day === "Zaterdag" || obj.day === "Zondag" ? "text-[#D97757]" : ""}`}>{obj.day.toUpperCase()}</span>
                            <span className={`ml-auto mr-2 font-[Instrument] italic`}>{obj.date.getDate()}</span>
                        </p>
                    </div>)
                )
            }
        </>
    )
}