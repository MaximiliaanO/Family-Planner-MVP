import { supabase } from "./supabaseClient"

export type FamilyMember = {
  id: string,
  first_name: string,
  last_name: string,
  family_name: string,
  bgColor: string,
  fontColor: string,
  accentColor: string,
  backgroundColorsOpaque: string,
}

export type Appointment = {
  apt_id: string,
  f_id: string,
  p_id: string,
  person: string,
  last_name: string,
  title: string,
  appointment_start_date: string,
  appointment_start_time: string,
  appointment_end_date: string,
  appointment_end_time: string,
  category: string
  appointment_notes: string
}

export type FamilyId = {
  family_id: string
}

export default async function fetchInitData() {
    
    const { data, error } = await supabase
    .from('appointments')
    .select("*")

  if(error) throw error
  return data
  }

export async function fetchFamilyMembers(family_id : string): Promise<FamilyMember[]> {
  const { data } = await supabase
  .schema("public")
  .rpc("get_family_members", {p_family_id : family_id})
  return data
}

export async function fetchAppointments(startOfWeek: string, endOfWeek: string, familyId : string): Promise<Appointment[]> {
  const { data } = await supabase
  .schema("public")
  .rpc("get_appointments", 
    //Params
    {p_family_id : familyId, p_startofweek: startOfWeek, p_endofweek: endOfWeek}
  )
  return data
}

export async function newAppointment( formdata : Appointment ): Promise<void> {
  await supabase
  .schema("public")
  .rpc("new_appointment", 
    //Params
    {
      p_family_id : "a1a104bf-43a0-4d24-bb12-ff63303b9a98",
      p_person_id : formdata.p_id,
      p_title: formdata.title,
      p_location: "",
      p_notes: formdata.appointment_notes,
      p_start: formdata.appointment_start_date,
      p_end:  formdata.appointment_end_date,
      p_category: formdata.category,
    }
  )
}

export async function editAppointment ( formdata : Appointment): Promise<void> {
  await supabase
  .schema("public")
  .rpc("update_appointment",
    //Params
    {
      p_appointment_id: formdata.apt_id,
      p_person_id: formdata.p_id,
      p_appointment_title: formdata.title,
      p_notes: formdata.appointment_notes,
      p_appointment_start: formdata.appointment_start_date,
      p_appointment_end: formdata.appointment_end_date,
      p_category: formdata.category
    }
  )
}

export async function deleteAppointment( appointment : Appointment ): Promise<void> {
    await supabase
  .schema("public")
  .rpc("remove_appointment",
    //Params
    {
      p_appointment_id: appointment.apt_id
    }
  )
}

export async function getFamilyId( userId:string ): Promise<FamilyId[]> {
  const { data } = await supabase
  .schema("public")
  .rpc("get_family_id",
    {
      p_userid: userId
    }
  )
  return data
}