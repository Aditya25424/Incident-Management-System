package com.example.incident.service;

import com.example.incident.dto.UserResponse;
import com.example.incident.entity.Role;
import com.example.incident.entity.User;
import com.example.incident.exception.ResourceNotFoundException;
import com.example.incident.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * User-facing operations: resolving the authenticated principal to a
 * User entity and listing resolvers available for incident assignment.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found: " + email));
    }

    public List<UserResponse> listResolvers() {
        return userRepository.findByRole(Role.RESOLVER)
                .stream()
                .map(UserResponse::fromEntity)
                .toList();
    }
}
