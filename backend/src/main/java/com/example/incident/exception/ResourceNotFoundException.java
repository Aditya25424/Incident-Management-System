package com.example.incident.exception;

/**
 * Thrown when a requested entity (user, incident, ...) does not exist.
 * Translated to HTTP 404 by GlobalExceptionHandler.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
