
insert into developers (
developer_name, dev_user_id
)
values (
$1, $2
)
returning *;
