DROP DATABASE IF EXISTS jam_buds;

CREATE DATABASE jam_buds;

USE jam_buds;

CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    city varchar(255),
    province varchar(255),
    country varchar(255),
    bio varchar(1000),
    jam_space bit(1) DEFAULT 0,
    image_url varchar(255),      
    PRIMARY KEY (id)
);

ALTER TABLE users AUTO_INCREMENT = 59363698;

-- gear
-- influences
-- genres
-- instruments
-- samples

GRANT ALL PRIVILEGES ON jam_buds.* TO 'jam_buds_admin'@'localhost' IDENTIFIED BY 'jam_buds_secret123';



