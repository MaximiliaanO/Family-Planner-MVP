CREATE OR REPLACE FUNCTION new_appointment(p_family_id uuid, p_person_id uuid, p_title text, p_location text, p_notes text, p_start timestamp, p_end timestamp, p_category text) RETURNS void LANGUAGE SQL AS $$
INSERT INTO appointments
  (  
    family_id,
    person_id,
    appointment_title,
    appointment_location,
    appointment_notes,
    appointment_start,
    appointment_end,
    category
    )
VALUES (
   p_family_id, --unique family id
   p_person_id, -- unique person id
   p_title, -- appointment title
   p_location, -- appointment location
   p_notes, -- appointment notes
   p_start, -- appointment start i.e. 2026-05-18 10:00
   p_end, -- appointment end i.e. 2026-05-18 11:00
   p_category -- appointment category
)
$$;