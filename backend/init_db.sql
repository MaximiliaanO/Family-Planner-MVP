CREATE TABLE families
(
    family_id UUID DEFAULT gen_random_uuid() primary key,
    family_name text
)

CREATE TYPE role as ENUM ('Parent', 'Child')

CREATE TABLE persons
(
    person_id UUID DEFAULT gen_random_uuid() primary key,
    first_name text,
    last_name text,
    person_role role
)

CREATE TABLE appointments
(
    appointment_id UUID DEFAULT gen_random_uuid() primary key,
    family_id UUID references families(family_id),
    person_id UUID references persons(person_id),
    appointment_title text,
    appointment_location text,
    appointment_notes text,
    appointment_start timestamp,
    appointment_end timestamp
)