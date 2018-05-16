DROP DATABASE IF EXISTS jam_mates;

CREATE DATABASE jam_mates;

USE jam_mates;

CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    city varchar(255),
    province varchar(255),
    country varchar(255),
    bio varchar(255),
    jam_space int(1) DEFAULT 0,
    image_url varchar(255),      
    PRIMARY KEY (id)
);

ALTER TABLE users AUTO_INCREMENT = 59363698;

-- gear
-- influences
-- genres
-- instruments
-- samples

GRANT ALL PRIVILEGES ON jam_mates.* TO 'jam_mates_admin'@'localhost' IDENTIFIED BY 'jam_mates_secret123';



