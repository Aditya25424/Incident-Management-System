package com.example.incident;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Incident Management System backend.
 *
 * Boots the embedded Tomcat server and initializes the Spring
 * application context (controllers, services, repositories, security).
 */
@SpringBootApplication
public class IncidentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(IncidentManagementApplication.class, args);
    }
}
