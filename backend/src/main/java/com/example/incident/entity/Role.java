package com.example.incident.entity;

/**
 * Application roles used for role-based authorization.
 *
 * USER      - can report incidents and view their own reported incidents.
 * RESOLVER  - can view incidents assigned to them and update their status.
 * ADMIN     - administrative capabilities (user management, oversight).
 */
public enum Role {
    USER,
    RESOLVER,
    ADMIN
}
