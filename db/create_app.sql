insert into apps (
developer_id, app_name, app_description, current_rating, iconimg, img1, img2, img3, img4, img5, img6, tags, app_link,apple_app_id
)
values(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
)
returning*;