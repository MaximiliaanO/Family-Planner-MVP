CREATE OR REPLACE FUNCTION get_family_id(p_userid UUID) 
RETURNS TABLE (family_id UUID)
LANGUAGE SQL AS $$
SELECT family_id
FROM families
WHERE user_id = p_userid
$$;
