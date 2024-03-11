CREATE VIEW V_Users AS
SELECT
    u.user_id,
    u.campus_id,
    u.rol_id,
    u.username,
    u.password,
    u.email,
    u.user_state,
    r.rol,
    r.state AS rol_state,
    s.campus,
    d.departament_id,
    d.departament,
    d.campus_id AS departament_campus_id,
    o.office_id,
    o.office,
    o.departament_id AS office_departament_id
FROM
    usuario u
    JOIN rol r ON u.rol_id = r.rol_id
    JOIN sede s ON u.campus_id = s.campus_id
    JOIN departamento d ON u.campus_id = d.campus_id
    JOIN oficina o ON d.departament_id = o.departament_id;
