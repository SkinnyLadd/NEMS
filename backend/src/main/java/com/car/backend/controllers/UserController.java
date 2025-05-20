package com.car.backend.controllers;

import com.car.backend.DTO.UserDTO;
import com.car.backend.DTO.CreateUserDTO;
import com.car.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/search/first-name")
    public List<UserDTO> getUsersByFirstName(@RequestParam String firstName) {
        return service.getUsersByFirstName(firstName);
    }

    @GetMapping("/search/last-name")
    public List<UserDTO> getUsersByLastName(@RequestParam String lastName) {
        return service.getUsersByLastName(lastName);
    }

    @GetMapping("/email")
    public UserDTO getUserByEmail(@RequestParam String email) {
        return service.getUserByEmail(email);
    }

    @GetMapping
    public List<UserDTO> getUsers() {
        return service.getAllUsers();
    }

    @PostMapping
    public UserDTO createUser(@RequestBody CreateUserDTO dto) {
        return service.createUser(dto);
    }
}