package com.car.backend.controllers;

import com.car.backend.DTO.ParticipationApplicationDTO;
import com.car.backend.services.ParticipationApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participation-applications")
public class ParticipationApplicationController {

    @Autowired
    private ParticipationApplicationService service;

    @GetMapping("/event/{eventId}")
    public List<ParticipationApplicationDTO> getApplicationsByEventId(@PathVariable Integer eventId) {
        return service.getApplicationsByEventId(eventId);
    }

    @GetMapping("/custom-role")
    public List<ParticipationApplicationDTO> getApplicationsByCustomRole(@RequestParam String customRole) {
        return service.getApplicationsByCustomRole(customRole);
    }

    @PostMapping
    public ParticipationApplicationDTO saveApplication(@RequestBody ParticipationApplicationDTO dto) {
        return service.saveApplication(dto);
    }
}