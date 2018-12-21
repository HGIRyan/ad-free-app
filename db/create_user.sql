insert into users (
    user_username, user_email, user_hash_value, user_autorenewal, user_renewalperiod, user_isdev
)
values(
    $1, $2, $3, $4, $5, $6
)
returning *;