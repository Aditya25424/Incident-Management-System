package com.example.incident.dto;

import com.example.incident.entity.IncidentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Payload for PUT /incidents/{id}/status.
 */
@Data
public class StatusUpdateRequest {

    @NotNull(message = "Status is required")
    private IncidentStatus status;
}
