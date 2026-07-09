package com.SoulSpace.backend.Models;

import java.util.UUID;

public class LoginResponse {
    private UUID id;
    private String name;
    private String email;

    public LoginResponse(UUID id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}