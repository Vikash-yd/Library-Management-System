package com.SoulSpace.backend.Dtos;

import com.SoulSpace.backend.Models.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private Role role= Role.MEMBER;
}