package com.example.incident.service;

import com.example.incident.dto.IncidentRequest;
import com.example.incident.dto.IncidentResponse;
import com.example.incident.dto.StatusUpdateRequest;
import com.example.incident.entity.Incident;
import com.example.incident.entity.IncidentStatus;
import com.example.incident.entity.Role;
import com.example.incident.entity.User;
import com.example.incident.exception.ResourceNotFoundException;
import com.example.incident.repository.IncidentRepository;
import com.example.incident.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Core business logic for the incident lifecycle: creation, retrieval,
 * assignment, status transitions and deletion. Ownership and role
 * checks live here rather than in the controller, so the same rules
 * apply no matter which entry point is used.
 */
@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public List<IncidentResponse> getAllIncidents() {
        return incidentRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(IncidentResponse::fromEntity)
                .toList();
    }

    public List<IncidentResponse> getMyReportedIncidents(Authentication authentication) {
        User current = userService.getCurrentUser(authentication);
        return incidentRepository.findByReportedByOrderByCreatedAtDesc(current)
                .stream()
                .map(IncidentResponse::fromEntity)
                .toList();
    }

    public List<IncidentResponse> getMyAssignedIncidents(Authentication authentication) {
        User current = userService.getCurrentUser(authentication);
        return incidentRepository.findByAssignedToOrderByCreatedAtDesc(current)
                .stream()
                .map(IncidentResponse::fromEntity)
                .toList();
    }

    public IncidentResponse getIncidentById(Long id) {
        return IncidentResponse.fromEntity(findIncidentOrThrow(id));
    }

    public IncidentResponse createIncident(IncidentRequest request, Authentication authentication) {
        User reporter = userService.getCurrentUser(authentication);

        Incident incident = Incident.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .severity(request.getSeverity())
                .status(IncidentStatus.OPEN)
                .reportedBy(reporter)
                .build();

        Incident saved = incidentRepository.save(incident);
        return IncidentResponse.fromEntity(saved);
    }

    public IncidentResponse assignResolver(Long incidentId, Long resolverUserId) {
        Incident incident = findIncidentOrThrow(incidentId);

        User resolver = userRepository.findById(resolverUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + resolverUserId));

        if (resolver.getRole() != Role.RESOLVER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected user is not a resolver");
        }

        incident.setAssignedTo(resolver);
        incident.setStatus(IncidentStatus.IN_PROGRESS);

        Incident saved = incidentRepository.save(incident);
        return IncidentResponse.fromEntity(saved);
    }

    public IncidentResponse updateStatus(Long incidentId, StatusUpdateRequest request, Authentication authentication) {
        Incident incident = findIncidentOrThrow(incidentId);
        User current = userService.getCurrentUser(authentication);

        boolean isAssignedResolver = incident.getAssignedTo() != null
                && incident.getAssignedTo().getId().equals(current.getId());
        boolean isAdmin = current.getRole() == Role.ADMIN;

        if (!isAssignedResolver && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only the assigned resolver or an admin can update this incident's status");
        }

        incident.setStatus(request.getStatus());
        Incident saved = incidentRepository.save(incident);
        return IncidentResponse.fromEntity(saved);
    }

    public void deleteIncident(Long incidentId) {
        Incident incident = findIncidentOrThrow(incidentId);
        incidentRepository.delete(incident);
    }

    private Incident findIncidentOrThrow(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incident not found: " + id));
    }
}
