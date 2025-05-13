package com.car.backend.controllers;

import com.car.backend.DTO.UserSocietyDTO;
import com.car.backend.services.UserSocietyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-societies")
public class UserSocietyController {

    @Autowired
    private UserSocietyService service;

    @GetMapping("/user/{userId}")
    public List<UserSocietyDTO> getUserSocietiesByUserId(@PathVariable Integer userId) {
        return service.getUserSocietiesByUserId(userId);
    }

    @GetMapping("/society/{societyId}")
    public List<UserSocietyDTO> getUserSocietiesBySocietyId(@PathVariable Integer societyId) {
        return service.getUserSocietiesBySocietyId(societyId);
    }

    @PostMapping
    public UserSocietyDTO saveUserSociety(@RequestBody UserSocietyDTO dto) {
        return service.saveUserSociety(dto);
    }
}