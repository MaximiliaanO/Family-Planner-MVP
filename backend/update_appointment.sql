CREATE OR REPLACE FUNCTION update_appointment(
    p_appointment_id UUID,
    p_person_id UUID, 
    p_appointment_title TEXT,
    p_notes TEXT,
    p_appointment_start TIMESTAMP,
    p_appointment_end TIMESTAMP,
    p_category TEXT
    )
RETURNS void LANGUAGE SQL AS $$
UPDATE appointments SET
    person_id = p_person_id,
    appointment_title = p_appointment_title,
    appointment_notes = p_notes,
    appointment_start = p_appointment_start,
    appointment_end = p_appointment_end,
    category = p_category
WHERE appointment_id = p_appointment_id
$$;