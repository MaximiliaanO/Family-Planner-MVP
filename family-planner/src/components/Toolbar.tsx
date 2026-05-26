import { yearList, weekList } from "../constants/dateConstants"
import { monthName } from "../utils/dateUtils";
import OrangePillButton from "./OrangePillButton";
import TodayButton from "./TodayButton";

type WeekSelectorProps = {
  selectedWeek: number,
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>,
  selectedYear: number,
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>,
  showNewAppointment: boolean,
  setShowNewAppt: React.Dispatch<React.SetStateAction<boolean>>,
  weekStart: Date,
  weekEnd: Date
}

export default function Toolbar({ selectedWeek, setSelectedWeek, selectedYear, setSelectedYear, showNewAppointment, setShowNewAppt, weekStart, weekEnd }: WeekSelectorProps) {
  const buttonClasses = "cursor-pointer m-1 text-[20px] text-[#23201C]"

  return (
    <div className="flex items-center p-4 border-b border-[#ECE4D6]">
      <div className="flex justify-center ml-[5%]">

        <button
          className={buttonClasses}
          onClick={() => setSelectedWeek(selectedWeek - 1)}
        >
         &#60; &nbsp; &nbsp; 
        </button>

        <div className="flex flex-col justify-center items-center">
          <form className="text-[14px] text-[#23201C] font-semibold" name="yearSelector">
            <label className="pl-2">{weekStart.getDate()} - {weekEnd.getDate()} {monthName(weekStart.getMonth())}</label>
            <select className="pl-1" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
              {yearList.map((week) => <option key={week}>{week}</option>)}
            </select>
          </form>

          <form className="text-[14px] text-[#6B6358]" name="weekSelector">
            <label className="pl-2">Week</label>
            <select className="pl-1" value={selectedWeek} onChange={
              (e) => setSelectedWeek(parseInt(e.target.value))}>
              {weekList.map((year) =>
                <option key={year}>{year}</option>)
              }
            </select>
          </form>
        </div>

        <button
          className={buttonClasses}
          onClick={() => setSelectedWeek(selectedWeek + 1)}
        >
          &nbsp; &nbsp; &#62; 
        </button>

       

      </div>

       <TodayButton setSelectedWeek={setSelectedWeek} setSelectedYear={setSelectedYear}/>

      <OrangePillButton onClick={() => setShowNewAppt(!showNewAppointment)}>+ Nieuwe afspraak</OrangePillButton>

    </div>
  )
}