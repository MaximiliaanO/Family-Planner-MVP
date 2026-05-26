import { Settings } from "lucide-react"
import SamenLogo from "./SamenLogo"
import { signOut } from "../utils/users"
import type { SetStateAction } from "react"

export default function CalendarHeader({ setSession } : { setSession: React.Dispatch<SetStateAction<boolean>>}) {

    async function signOutHandler() {
        await signOut()
        setSession(false)
    }

    return (
        <header className="flex items-center gap-4 p-3.5 bg-white border-b border-[#ECE4D6]">

            <SamenLogo />

            <div className="flex gap-1 items-center bg">
                <span className="text-[24px] text-[#23201C] font-[Instrument] italic">Samen</span>
                <span className="text-[24px] text-[#6B6358]">|</span>
                <span className="text-[14px] text-[#6B6358]">Familie</span>
                <span className="text-[14px] text-[#23201C] font-semibold">Oorschot</span>
            </div>

            <div className="flex items-center ml-auto">
                <Settings 
                    color="#6B6358" size={26} 
                    className="cursor-pointer" 
                    onClick={signOutHandler}/>
            </div>

        </header>
    )
}