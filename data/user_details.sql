create view user_details as
select 
users.id,
users.username,
users.firstname,
users.surname,
users.email,
users.password,
users.domain_id,
domain.name as domain_name,
users.role_id,
role.name as role_name
from
users,
role,
domain
where users.domain_id = domain.id
and users.role_id = role.id;
