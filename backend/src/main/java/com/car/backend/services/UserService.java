package com.car.backend.services;

import com.car.backend.DTO.UserDTO;
import com.car.backend.DTO.CreateUserDTO;
import com.car.backend.entities.Course;
import com.car.backend.entities.User;
import com.car.backend.entities.enums.Batch;
import com.car.backend.repositories.CourseRepository;
import com.car.backend.repositories.UserRepository;
import com.car.backend.utils.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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


    public List<UserDTO> getAllUsers() {
        return repository.findAll().stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setEmail(user.getEmail());
            dto.setCms(user.getCms());
            dto.setRole(user.getRole());
            dto.setBatch(user.getBatch());
            dto.setCourseId(user.getCourse().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    public UserDTO createUser(CreateUserDTO dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use.");
        }
        if (dto.getCms() == null) {
            throw new IllegalArgumentException("CMS cannot be null or empty");
        }
        if (repository.findByCms(dto.getCms()).isPresent()) {
            throw new RuntimeException("CMS already in use.");
        }

        if (dto.getDepartment() == null || dto.getDepartment().isBlank()) {
            throw new IllegalArgumentException("Department cannot be null or empty");
        }

        Optional<Course> courseOpt = courseRepository.findByCourseName(dto.getDepartment());
        if (courseOpt.isEmpty()) {
            throw new RuntimeException("Course not found with name: " + dto.getDepartment());
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setCms(dto.getCms());
        user.setRole(dto.getRole() == null ? "USER" : dto.getRole());  // default role if null
        System.out.println("batch getting assigned to entity");
        user.setBatch(dto.getBatch());
        user.setCreatedAt(Instant.now());
        user.setCourse(courseOpt.get());

        User saved = repository.save(user);

        UserDTO response = new UserDTO();
        response.setId(saved.getId());
        response.setFirstName(saved.getFirstName());
        response.setLastName(saved.getLastName());
        response.setEmail(saved.getEmail());
        response.setCms(saved.getCms());
        response.setRole(saved.getRole());
        response.setBatch(saved.getBatch());
        response.setCourseId(saved.getCourse().getId());

        return response;
    }



    private UserDTO convertToDTO(User entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setRole(entity.getRole());
        dto.setBatch(entity.getBatch());
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