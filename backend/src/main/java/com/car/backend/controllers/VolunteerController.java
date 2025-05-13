package com.car.backend.controllers;

import com.car.backend.DTO.VolunteerDTO;
import com.car.backend.services.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService service;

    @GetMapping("/user/{userId}")
    public List<VolunteerDTO> getVolunteersByUserId(@PathVariable Integer userId) {
        return service.getVolunteersByUserId(userId);
    }

    @GetMapping("/role")
    public List<VolunteerDTO> getVolunteersByAssignedRole(@RequestParam String assignedRole) {
        return service.getVolunteersByAssignedRole(assignedRole);
    }

    @PostMapping
    public VolunteerDTO saveVolunteer(@RequestBody VolunteerDTO dto) {
        return service.saveVolunteer(dto);
    }
}