package com.example.incident.controller;

import com.example.incident.dto.UserResponse;
import com.example.incident.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * User-related endpoints: the authenticated user's own profile, and
 * the list of resolvers available for incident assignment.
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(UserResponse.fromEntity(userService.getCurrentUser(authentication)));
    }

    @GetMapping("/resolvers")
    public ResponseEntity<List<UserResponse>> listResolvers() {
        return ResponseEntity.ok(userService.listResolvers());
    }
}
