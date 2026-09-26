package com.example.incident.repository;

import com.example.incident.entity.Incident;
import com.example.incident.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    List<Incident> findByReportedByOrderByCreatedAtDesc(User reportedBy);

    List<Incident> findByAssignedToOrderByCreatedAtDesc(User assignedTo);

    List<Incident> findAllByOrderByCreatedAtDesc();
}
