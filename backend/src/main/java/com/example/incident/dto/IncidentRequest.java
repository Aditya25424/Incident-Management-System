package com.example.incident.dto;

import com.example.incident.entity.Severity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Payload for POST /incidents.
 *
 * Note: the reporter is intentionally NOT part of this payload. The
 * backend always derives the reporter from the authenticated principal
 * so the browser cannot forge a different reporter identity.
 */
@Data
public class IncidentRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must be at most 150 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 4000, message = "Description must be at most 4000 characters")
    private String description;

    @NotNull(message = "Severity is required")
    private Severity severity;
}
