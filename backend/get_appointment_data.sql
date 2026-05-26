create or replace function get_family_members (p_family_id uuid) returns table (first_name TEXT, last_name TEXT, family_name TEXT) language sql as $$
  select distinct
    p.first_name as person,
    p.last_name,
    f.family_name as family
  from
    appointments as a
    inner join families as f on a.family_id = f.family_id
    inner join persons as p on a.person_id = p.person_id
  where
    f.family_id = p_family_id
$$;


create or replace function get_appointments (p_family_id uuid, p_startofweek date, p_endofweek date)
returns table(id TEXT, person TEXT, last_name TEXT, title TEXT, appointment_date DATE, appointment_time TIME, appointment_location TEXT)
language sql as $$
    SELECT
    a.appointment_id AS id,
    p.first_name AS person,
    p.last_name,
    a.appointment_title AS title,
    a.appointment_start::date AS appointment_date,
    a.appointment_start::time AS appointment_time,
    a.appointment_location
FROM 
    appointments AS a
    INNER JOIN families AS f ON a.family_id = f.family_id
    INNER JOIN persons AS p ON a.person_id = p.person_id
WHERE
    f.family_id = p_family_id and
    a.appointment_start::date BETWEEN p_startofweek AND p_endofweek
$$
    
