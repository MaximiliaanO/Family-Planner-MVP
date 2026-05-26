import type { SetStateAction, SubmitEvent } from "react";
import AptPar from "./AppointmentParagraph";
import SamenLogo from "./SamenLogo";
import { signInWithEmail, type emailSignInData, type signInData } from "../utils/users";


export default function LoginPage({ setSession, setUserId } : {setSession: React.Dispatch<SetStateAction<boolean>>, setUserId: React.Dispatch<SetStateAction<string>>}) {
    const roundedBorder = "border border-[#ECE4D6] rounded-lg w-full"
    const introMargin = "ml-[10%]"

    async function handleSubmit(e:SubmitEvent) {
    
    e.preventDefault()

    const formdata = new FormData(e.target)

    const signInData: emailSignInData = {
        email: String(formdata.get("email")),
        password: String(formdata.get("password"))
    }

    const returnObj : signInData = await signInWithEmail(signInData) 

    if (returnObj.session) {
        setSession(true)
        setUserId(returnObj.userId)
    }
}

    return (
        <div id="landing"className="grid grid-cols-2 border h-screen">
            <div className="border-r border-[#ECE4D6]">
                <div className="flex items-center min-h-[10%]% max-h-[10%]%">
                    <SamenLogo className={`m-6 ${introMargin}`} /> <span className="text-[24px] text-[#23201C] font-[Instrument] italic">Samen</span>
                </div>
                <div className="min-h-[30%]"></div>
                <div className={`${introMargin}`}>
                    <p className="text-[#D97757] text-lg">| FAMILIEPLANNER |</p>
                    <p className="font-[Instrument_Serif] text-[40px] italic">
                        Eén plek waar <br /><span className="font-bold">iedereen</span> in het gezin <br />de week ziet.
                    </p>
                    <AptPar className="font-[Plus_Jakarta_Sans]">
                        Werk, school, sport, vakantie, voor iedereen op één rustig overzicht. <br /> Geen losse agenda's, geen vergeten verjaardagen.
                    </AptPar>
                </div>
                <div className="absolute bottom-5 left-0 ml-[5%]"><AptPar>© 2026 Samen · Privacy · Voorwaarden</AptPar></div>
            </div>
            <div id="login" className="bg-white flex items-center justify-center">
                <div id="loginform" className="m-auto w-[40%]">
                    <AptPar>WELKOM TERUG</AptPar>
                    <p className="italic font-[Plus_Jakarta_Sans] text-xl">Log in bij <span className="text-[#D97757]">samen</span></p>

                    <form className="mt-4" onSubmit={handleSubmit}>
                        <label htmlFor="email">E-mailadres</label><br />
                        <input id="email" name="email" type="text" className={`${roundedBorder}`} placeholder="john@example.com"></input><br />
                        <label htmlFor="password">Wachtwoord</label><br />
                        <input id="password" name="password" type="password" className={`${roundedBorder}`} placeholder="**********"></input><br />
                        <input id="stay" name="stay" type="checkbox"></input>
                        <label htmlFor="stay" className="text-sm ml-1 font-[Instrument_Serif] text-[#6B6358]">blijf ingelogd op dit apparaat</label><br />
                        <button 
                            className="border w-full rounded-lg mt-2 mb-2 cursor-pointer font-[Plus_Jakarta_Sans] bg-black text-white text-xl p-2"
                            type="submit"  
                        >Doorgaan →</button>
                    </form>
                    <AptPar className="text-center">Nog geen account? <span className="font-bold border-b cursor-pointer ">Maak een gezin aan</span></AptPar>
                </div>
                <div className="absolute bottom-5 right-0 mr-[5%]"><AptPar className="italic">Gemaakt in Hazerswoude-Dorp</AptPar></div>
            </div>
        </div>
    )
}