CREATE OR REPLACE FUNCTION remove_appointment(
    p_appointment_id UUID
)
RETURNS void LANGUAGE SQL AS $$
DELETE FROM appointments
WHERE appointment_id = p_appointment_id
$$;