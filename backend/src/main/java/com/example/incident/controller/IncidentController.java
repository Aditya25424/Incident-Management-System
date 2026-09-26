package com.example.incident.controller;

import com.example.incident.dto.IncidentRequest;
import com.example.incident.dto.IncidentResponse;
import com.example.incident.dto.StatusUpdateRequest;
import com.example.incident.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST resource for the incident lifecycle: listing, creation,
 * retrieval, assignment, status updates and deletion. All endpoints
 * here require a valid JWT (see SecurityConfig).
 */
@RestController
@RequestMapping("/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping
    public ResponseEntity<List<IncidentResponse>> getAllIncidents() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    @GetMapping("/my-reported")
    public ResponseEntity<List<IncidentResponse>> getMyReportedIncidents(Authentication authentication) {
        return ResponseEntity.ok(incidentService.getMyReportedIncidents(authentication));
    }

    @GetMapping("/my-assigned")
    public ResponseEntity<List<IncidentResponse>> getMyAssignedIncidents(Authentication authentication) {
        return ResponseEntity.ok(incidentService.getMyAssignedIncidents(authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentResponse> getIncidentById(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.getIncidentById(id));
    }

    @PostMapping
    public ResponseEntity<IncidentResponse> createIncident(@Valid @RequestBody IncidentRequest request,
                                                             Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(incidentService.createIncident(request, authentication));
    }

    @PutMapping("/{id}/assign/{userId}")
    public ResponseEntity<IncidentResponse> assignResolver(@PathVariable Long id, @PathVariable Long userId) {
        return ResponseEntity.ok(incidentService.assignResolver(id, userId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<IncidentResponse> updateStatus(@PathVariable Long id,
                                                           @Valid @RequestBody StatusUpdateRequest request,
                                                           Authentication authentication) {
        return ResponseEntity.ok(incidentService.updateStatus(id, request, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }
}
