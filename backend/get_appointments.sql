create or replace function get_appointments (p_family_id uuid, p_startofweek date, p_endofweek date)
returns table(apt_id TEXT, f_id TEXT, p_id TEXT, person TEXT, last_name TEXT, title TEXT, appointment_start_date DATE, appointment_start_time TIME, appointment_end_date DATE, appointment_end_time TIME, category TEXT, appointment_notes TEXT)
language sql as $$
    SELECT
    a.appointment_id AS apt_id,
    a.family_id AS f_id,
    a.person_id AS p_id,
    p.first_name AS person,
    p.last_name,
    a.appointment_title AS title,
    a.appointment_start::date AS appointment_start_date,
    a.appointment_start::time AS appointment_start_time,
    a.appointment_end::date AS appointment_end_date,
    a.appointment_end::time AS appointment_end_time,
    a.category,
    a.appointment_notes
FROM 
    appointments AS a
    INNER JOIN families AS f ON a.family_id = f.family_id
    INNER JOIN persons AS p ON a.person_id = p.person_id
WHERE
    f.family_id = p_family_id and
    a.appointment_start::date BETWEEN p_startofweek AND p_endofweek
ORDER by
    a.appointment_start ASC
$$