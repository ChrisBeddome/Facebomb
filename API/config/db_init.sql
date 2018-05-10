DROP DATABASE IF EXISTS jam_buds;

CREATE DATABASE jam_buds;

USE jam_buds;

CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,      
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    primary key (id)
);

GRANT ALL PRIVILEGES ON facebomb.* TO 'jam_buds_admin'@'localhost' IDENTIFIED BY 'jam_buds_secret123';



