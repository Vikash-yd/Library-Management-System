package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.Users;
import com.SoulSpace.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // encrypt password BEFORE saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Users savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    // LOGIN
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Users user) {

    Users dbUser = userRepository.findByEmail(user.getEmail())
            .orElse(null);

    if (dbUser == null) {
        return ResponseEntity.status(404).body("User not found");
    }

    if (!dbUser.getPassword().equals(user.getPassword())) {
        return ResponseEntity.status(401).body("Invalid password");
    }

    // IMPORTANT: return ONLY safe fields (avoid JPA issues)
    return ResponseEntity.ok(new LoginResponse(
            dbUser.getId(),
            dbUser.getName(),
            dbUser.getEmail()
    ));
}

    // LOGIN RESPONSE DTO (avoid JPA issues)
    private record LoginResponse(
            UUID id,
            String name,
            String email
    ) {}
}