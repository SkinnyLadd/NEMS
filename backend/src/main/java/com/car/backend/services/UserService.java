package com.car.backend.services;

import com.car.backend.DTO.UserDTO;
import com.car.backend.entities.User;
import com.car.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserDTO> getUsersByFirstName(String firstName) {
        return repository.findByFirstNameContainingIgnoreCase(firstName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersByLastName(String lastName) {
        return repository.findByLastNameContainingIgnoreCase(lastName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserByEmail(String email) {
        return repository.findByEmail(email).stream()
                .findFirst()
                .map(this::convertToDTO)
                .orElse(null);
    }

    public UserDTO saveUser(UserDTO dto) {
        User entity = convertToEntity(dto);
        User savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private UserDTO convertToDTO(User entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setRole(entity.getRole());
        dto.setBatch(entity.getBatch().name());
        return dto;
    }

    private User convertToEntity(UserDTO dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setRole(dto.getRole());
        // Set batch enum as needed
        return entity;
    }
}