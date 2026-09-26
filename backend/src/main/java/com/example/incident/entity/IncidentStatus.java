package com.example.incident.entity;

/**
 * Lifecycle states of an incident.
 *
 * OPEN        - default state when an incident is first created.
 * IN_PROGRESS - set automatically once a resolver is assigned.
 * RESOLVED    - the resolver has fixed the underlying issue.
 * CLOSED      - the incident is confirmed closed, no further action needed.
 */
public enum IncidentStatus {
    OPEN,
    IN_PROGRESS,
    RESOLVED,
    CLOSED
}
