-- ==============================================================
-- Incident Management System - database reset helper
--
-- Drops and recreates the schema used by the application. Useful
-- during development when you want a clean slate. Spring Boot
-- (spring.jpa.hibernate.ddl-auto=update) will recreate the tables
-- automatically the next time the backend starts.
--
-- Usage:
--   mysql -u root -p < database-reset.sql
-- ==============================================================

DROP DATABASE IF EXISTS incident_management;
CREATE DATABASE incident_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Optional: create a dedicated application user instead of using root.
-- CREATE USER IF NOT EXISTS 'incident_app'@'localhost' IDENTIFIED BY 'change-this-password';
-- GRANT ALL PRIVILEGES ON incident_management.* TO 'incident_app'@'localhost';
-- FLUSH PRIVILEGES;

USE incident_management;

-- Tables are created/updated automatically by Hibernate
-- (spring.jpa.hibernate.ddl-auto=update) on backend startup.
-- This file only ensures a clean, correctly-collated database exists.
