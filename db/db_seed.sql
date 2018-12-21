-- CREATING USER TABLE 
create table users (
    user_id serial primary key not null,
    user_username VARCHAR(50) not null,
    user_email varchar(50) not null,
    user_hash_value text not null,
    user_autoRenewal BOOLEAN ,
    user_renewalPeriod INTEGER ,
    user_isDev BOOLEAN 
);
-- CREATING DEVELOPER TABLE
create table developers (
    developer_id serial primary key not null,
    developer_name VARCHAR(50) not null,
    developer_details text,
    start_date TIMESTAMPTZ DEFAULT Now() ,
    dev_user_id INTEGER references users (user_id)
);
-- CREATING APP TABLE
create table apps (
    app_id serial primary key not null,
    developer_id INTEGER REFERENCES developers (developer_id),
    date_submitted TIMESTAMPTZ DEFAULT Now(),
    download_count INTEGER,
    app_name VARCHAR(50),
    app_description text, 
    current_rating text,
    iconimg text,
    img1 text,
    img2 text,
    img3 text,
    img4 text,
    img5 text,
    img6 text,
    tags text, 
    other_details TEXT
);


--  CREATING USERS ACCOUNTS

insert into users (
    user_username, user_email, user_hash_value, user_autorenewal, user_renewalperiod, user_isdev
)
values(
    $1, $2, $3, $4, $5, $6
)
returning*;

-- CREATING DEV ACCOUNTS
insert into developers (
developer_name, dev_user_id
)
values (
$1, $2
);
select * from developers;
select * from users;

-- CREATING APP
insert into apps (
developer_id, app_name, app_description, current_rating, iconimg, img1, img2, img3, img4, img5, img6, tags, app_link,apple_app_id
)
values(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
)
returning*;

-- CHECK FOR EXISTING USER
insert into users 
(
    user_username, user_email, user_hash_value
)
values 
(
    $1, $2, $3
)
-- LOGIN CHECK
select * from users 
where user_username = $1;

-- 