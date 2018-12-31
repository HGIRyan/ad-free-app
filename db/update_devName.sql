update developers
set developer_name = $2
where dev_user_id = $1

returning * ;