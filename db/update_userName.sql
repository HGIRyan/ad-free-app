update users
set user_username = $2
where user_id = $1

returning * ;