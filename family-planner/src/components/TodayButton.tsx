import { Calendar1 } from "lucide-react";
import { currentWeek, currentYear } from "../constants/dateConstants"

type TodayButtonProps = {
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>,
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>,

}


export default function TodayButton({setSelectedWeek, setSelectedYear} : TodayButtonProps) {
    return (
        <div 
         className="ml-3 flex items-center justify-center border border-[#ECE4D6] p-1 rounded-full cursor-pointer bg-white text-sm"
         onClick={() => {setSelectedWeek(currentWeek), setSelectedYear(currentYear)}}
        >
            <Calendar1 size={18} color="black" className="ml-1"/>
            <p className="ml-2 mr-1">Vandaag</p>
        </div>
    )
}