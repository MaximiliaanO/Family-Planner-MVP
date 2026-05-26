import AptPar from "./AppointmentParagraph";
import React, { Fragment, useState, type SetStateAction, type SubmitEvent } from "react";
import { X } from "lucide-react";
import { deleteAppointment, editAppointment, type FamilyMember } from "../utils/getData";
import PersonCircle from "./personCircle";
import PersonCircleSmall from "./personCircleSmall";
import type { Appointment } from "../utils/getData";
import DeleteAppointment from "./DeleteAppointment";

type EditAppointmentProps = {
  familyMembers: FamilyMember[],
  onSave: () => void,
  editAppointmentCard: string,
  setEditAppointmentCard: React.Dispatch<SetStateAction<string>>,
  appointments: Appointment[]
}


export default function EditAppointment({ familyMembers, editAppointmentCard, setEditAppointmentCard, onSave, appointments }: EditAppointmentProps) {

  const filtered = appointments.filter((apt) => apt.apt_id === editAppointmentCard)
  const appointment: Appointment = filtered[0]
  const [categorySelected, setCategorySelected] = useState(appointment.category)
  const [personSelected, setPersonSelected] = useState(familyMembers.filter((obj) => obj.id === appointment.p_id)[0])

  //TODO create in DB and implement dynamic fetching
  const categories = [
    "Werk",
    "Vakantie",
    "School",
    "Sport",
    "Reis",
    "Mijlpaal",
  ];

  async function handleSubmit(e: SubmitEvent) {

    e.preventDefault()

    const formData = new FormData(e.target)

    const appointmentData: Appointment =
    {
      apt_id: String(formData.get("appointment_id")),
      f_id: String(formData.get("family_id")),
      p_id: String(formData.get("person_id")),
      person: String(formData.get("first_name")),
      last_name: String(formData.get("last_name")),
      title: String(formData.get("title")),
      appointment_start_date: String(formData.get("startdatum")).concat(" ").concat(String(formData.get("starttijd"))),
      appointment_start_time: String(formData.get("starttijd")),
      appointment_end_time: String(formData.get("eindtijd")),
      appointment_end_date: String(formData.get("einddatum")).concat(" ").concat(String(formData.get("eindtijd"))),
      category: String(formData.get("category")),
      appointment_notes: String(formData.get("notities")),

    }

    setEditAppointmentCard("")
    await editAppointment(appointmentData)
    onSave()
    
  }

  return (
    <div
      className="
            absolute inset-0
          bg-[rgba(35,32,28,0.32)]
            backdrop-blur-sm
            flex items-center justify-center
            z-1000
            p-6
            font-['Plus_Jakarta_Sans',system-ui,sans-serif]
            animate-[samenFadeIn_0.18s_ease-out]
        "
    >
      <div className={`${personSelected.backgroundColorsOpaque} w-xl rounded-xl font-['Plus_Jakarta_Sans',system-ui,sans-serif]`}>
        <div className="border-b border-[#ECE4D6] flex items-center">
          <div className={`mr-1 w-2 min-h-13 rounded-r-2xl ${personSelected.accentColor}`}></div>
          <PersonCircle member={personSelected} />
          <div className="ml-2">
            <p className="mt-2 text-[14px] text-[#6B6358]">BEWERK AFSPRAAK</p>
            <p className="mb-2 text-sm font-[Instrument] italic">voor {personSelected.first_name}</p>
          </div>
          <X className="ml-auto mr-3 cursor-pointer" color="#6B6358" onClick={() => setEditAppointmentCard("")} />
        </div>

        {/*FORM STARTS HERE*/}
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-2">

            <AptPar>TITEL</AptPar>

            <input
              className="w-137.5 text-3xl border-b border-[#ECE4D6] font-[Instrument] mt-2 mb-2"
              type="text"
              placeholder=" Wat staat er op de planning?"
              name="title"
              id="title"
              defaultValue={appointment.title}
            >
            </input>


            <AptPar>WIE</AptPar>

            <div className="flex">
              {familyMembers.map((obj) => {
                return (
                  <Fragment key={obj.first_name}>
                    <input
                      type="radio"
                      id={obj.first_name}
                      value={obj.first_name}
                      name="first_name"
                      className="hidden"
                      checked={obj.id === appointment.p_id}
                      onChange={() => setPersonSelected(obj)}
                    >
                    </input>

                    <label
                      htmlFor={obj.first_name}
                      className={`flex border-[#ECE4D6] border m-1 p-3 rounded-full cursor-pointer min-w-20 text-center ${personSelected.first_name === obj.first_name ? obj.accentColor : ""} ${personSelected.first_name === obj.first_name ? obj.fontColor : ""} `} // TODO implement hover colors
                      onClick={() => setPersonSelected(obj)}
                    >
                      <PersonCircleSmall member={obj} />
                      {obj.first_name}
                    </label>

                  </Fragment>
                );
              })}
            </div>

            <input type="hidden" name="person_id" value={personSelected.id} />
            <input type="hidden" name="last_name" value={personSelected.last_name} />
            <input type="hidden" name="appointment_id" value={appointment.apt_id} />
            <input type="hidden" name="family_id" value={appointment.f_id} />


            <AptPar>WANNEER</AptPar>

            <div className="flex items-center">
              <label htmlFor="startdatum"><AptPar>Startdatum:</AptPar></label>
              <input id="startdatum" className="ml-1 mr-1 text-[14px] border-b border-[#ECE4D6]" name="startdatum" type="date" defaultValue={appointment.appointment_start_date}></input>
              <label htmlFor="einddatum"><AptPar>Einddatum:</AptPar></label>
              <input id="einddatum" className="ml-1 mr-1 text-[14px] border-b border-[#ECE4D6]" name="einddatum" type="date" defaultValue={appointment.appointment_end_date}></input>
              <br />
            </div>

            <AptPar>TIJD</AptPar>
            <input id="starttijd" name="starttijd" type="time" step="60" defaultValue={appointment.appointment_start_time}></input>
            <span className="m-2 text-[14px] text-[#6B6358]">tot</span>
            <input id="eindtijd" name="eindtijd" type="time" step="60" defaultValue={appointment.appointment_end_time}></input>

            <AptPar>CATEGORIE</AptPar>

            <div className="mt-4 mb-4">
              {categories.map((category) => {
                return (
                  <Fragment key={category}>
                    <input
                      type="radio"
                      id={category}
                      value={category}
                      name="category"
                      className="hidden"
                      checked={category === appointment.category}
                      onChange={() => setCategorySelected(category)}
                    ></input>
                    <label htmlFor={category}
                      className={`border border-[#ECE4D6] font-[Instrument] text-sm m-1 p-3 rounded-full cursor-pointer ${categorySelected === category ? "bg-black text-white" : ""} hover:bg-black hover:text-white`}
                      onClick={() => setCategorySelected(category)}
                    >{category}</label>
                  </Fragment>
                );
              })}
            </div>

            <div className="flex">

              {/*
              <div className="flex-2">
                <AptPar>HERHALING</AptPar>
                <select name="herhaling">
                  <option value="eenmalig">Eenmalig</option>
                  <option value="elke dag">Elke dag</option>
                  <option value="elke week">Elke week</option>
                </select>
              </div>
              */}

              <div className="flex-2">
                <AptPar>NOTITIES</AptPar>
                <textarea 
                  className="w-full"
                  name="notities" 
                  id="notities" 
                  defaultValue={appointment.appointment_notes} 
                  rows={1}></textarea>
              </div>

            </div>

            <div>
              <AptPar>VERWIJDEREN</AptPar>
              <DeleteAppointment onClick={async () => {
                setEditAppointmentCard("")
                await deleteAppointment(appointment)
                onSave()
                }}>Verwijder afspraak</DeleteAppointment>
            </div>

          </div>

          <div className="rounded-b-xl flex items-center overflow-hidden bg-[#FBF7F1] border-t border-[#ECE4D6]">
            <button type="button" className="ml-2 cursor-pointer" onClick={() => setEditAppointmentCard("")}>Annuleren</button>
            <button type="submit" className="ml-auto mt-2 mb-2 border-2 p-2 rounded-full bg-[#D97757] text-white cursor-pointer w-26 mr-3">✓ Opslaan</button>
          </div>

        </form>
      </div>
    </div>
  );
}
