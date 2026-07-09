package com.SoulSpace.backend.Services;
import com.SoulSpace.backend.Models.Role;
import com.SoulSpace.backend.Dtos.UserRequestDTO;
import com.SoulSpace.backend.Dtos.UserResponseDTO;
import com.SoulSpace.backend.Models.Users;
import com.SoulSpace.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class UserServices {
    private final UserRepository userRepository;

    @Autowired
    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create a new user
    public UserResponseDTO createUser(UserRequestDTO requestDTO) {
        Users user = new Users();
//        user.setId(UUID.randomUUID()); // Generate UUID for user
        user.setName(requestDTO.getName());
        user.setUsername(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        if (requestDTO.getRole() == null) {
            user.setRole(Role.MEMBER);
        } else {
            user.setRole(requestDTO.getRole());
        }
        user.setPhoneNumber(requestDTO.getPhoneNumber());
        user.setAddress(requestDTO.getAddress());
        user.setPassword(requestDTO.getPassword());

        Users savedUser = userRepository.save(user);
        return mapToResponseDTO(savedUser);
    }

    // Get all users
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
//
//    // Get user by ID
//    public UserResponseDTO getUserById(UUID id) {
//        Users user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//        return mapToResponseDTO(user);
//    }
//
//    // Update user
//    public UserResponseDTO updateUser(UUID id, UserRequestDTO requestDTO) {
//        Users user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//
//        user.setName(requestDTO.getName());
//        user.setEmail(requestDTO.getEmail());
//        user.setRole(requestDTO.getRole());
//
//        Users updatedUser = userRepository.save(user);
//        return mapToResponseDTO(updatedUser);
//    }
//
//    // Delete user
//    public void deleteUser(UUID id) {
//        if (!userRepository.existsById(id)) {
//            throw new RuntimeException("User not found with id: " + id);
//        }
//        userRepository.deleteById(id);
//    }

    // Map User entity to UserResponseDTO
    private UserResponseDTO mapToResponseDTO(Users user) {
        UserResponseDTO responseDTO = new UserResponseDTO();
        responseDTO.setId(user.getId()); // UUID
        responseDTO.setName(user.getName());
        responseDTO.setUsername(user.getUsername());
        responseDTO.setEmail(user.getEmail());
        responseDTO.setRole(user.getRole());
        return responseDTO;
    }

}
