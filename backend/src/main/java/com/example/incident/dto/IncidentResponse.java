package com.example.incident.dto;

import com.example.incident.entity.Incident;
import com.example.incident.entity.IncidentStatus;
import com.example.incident.entity.Severity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Outbound representation of an Incident, with reporter/resolver
 * flattened into safe, password-free summaries.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentResponse {
    private Long id;
    private String title;
    private String description;
    private Severity severity;
    private IncidentStatus status;
    private UserResponse reportedBy;
    private UserResponse assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static IncidentResponse fromEntity(Incident incident) {
        return IncidentResponse.builder()
                .id(incident.getId())
                .title(incident.getTitle())
                .description(incident.getDescription())
                .severity(incident.getSeverity())
                .status(incident.getStatus())
                .reportedBy(UserResponse.fromEntity(incident.getReportedBy()))
                .assignedTo(UserResponse.fromEntity(incident.getAssignedTo()))
                .createdAt(incident.getCreatedAt())
                .updatedAt(incident.getUpdatedAt())
                .build();
    }
}
