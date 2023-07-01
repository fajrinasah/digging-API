SELECT 
    *
FROM
    digging.users;
    
-- INSERT NEW USER'S DATA
INSERT INTO digging.users(uuid, email, phone_number, username, password)
VALUES ('17sfusufcn93', 'user17@example.com', '1234567891', 'user17', 'password123');

-- GET USER'S DATA
SELECT 
    uuid, email, phone_number, username
FROM
    digging.users
WHERE
    uuid = 'randomuuidhere17';
    
-- UPDATE USER'S DATA
-- WARNING: safe update is off, so please make sure to add a specific WHERE clause
UPDATE digging.users 
SET 
    email = 'user16@example.com'
WHERE
    uuid = 'randomuuidhere16';

-- UPDATE USER'S PROFILE
SELECT 
    username, display_name, photo_profile, about
FROM
    digging.users where uuid = 'randomuuidhere16';

UPDATE digging.users 
SET 
    display_name = 'Ursa'
WHERE
    uuid = 'randomuuidhere16';

-- SELECT USER'S PROFILE
SELECT 
    username, display_name, photo_profile, about
FROM
    digging.users where uuid = 'randomuuidhere17';
    
-- SELECT ALL PUBLISHED ARTICLES FROM A USER
-- ????????????????????????????????


-- INSERT NEW ARTICLE'S DATA
SELECT 
    *
FROM
    digging.articles;



