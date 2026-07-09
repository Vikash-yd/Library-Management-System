package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Dtos.UserRequestDTO;
import com.SoulSpace.backend.Dtos.UserResponseDTO;
import com.SoulSpace.backend.Services.UserServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/users")

public class UserController {
    private final UserServices userService;
    public UserController(UserServices userService) {
        this.userService = userService;
    }

    // Create User
    @PostMapping
    public UserResponseDTO createUser(@RequestBody UserRequestDTO requestDTO) {
        return userService.createUser(requestDTO);
    }
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }
}
