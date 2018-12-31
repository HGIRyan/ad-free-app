update users
set user_email = $2
where user_id = $1

returning * ;