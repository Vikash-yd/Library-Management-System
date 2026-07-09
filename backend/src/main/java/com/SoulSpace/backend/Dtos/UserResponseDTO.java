package com.SoulSpace.backend.Dtos;

import com.SoulSpace.backend.Models.Role;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String username;
    private String email;
    private Role role=Role.MEMBER;
}