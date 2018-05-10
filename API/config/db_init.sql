DROP DATABASE IF EXISTS facebomb;

CREATE DATABASE facebomb;

USE facebomb;

CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,      
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    primary key (id)
);

GRANT ALL PRIVILEGES ON facebomb.* TO 'facebomb_admin'@'localhost' IDENTIFIED BY 'facebomb_secret123';



