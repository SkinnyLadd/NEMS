package com.car.backend.controllers;

import com.car.backend.DTO.UserDTO;
import com.car.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
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

    @PostMapping
    public UserDTO saveUser(@RequestBody UserDTO dto) {
        return service.saveUser(dto);
    }
}