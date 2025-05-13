package com.car.backend.controllers;

import com.car.backend.DTO.ParticipationDTO;
import com.car.backend.services.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participations")
public class ParticipationController {

    @Autowired
    private ParticipationService service;

    @GetMapping("/user/{userId}")
    public List<ParticipationDTO> getParticipationsByUserId(@PathVariable Integer userId) {
        return service.getParticipationsByUserId(userId);
    }

    @GetMapping("/role/{partRole}")
    public List<ParticipationDTO> getParticipationsByRole(@PathVariable String partRole) {
        return service.getParticipationsByRole(partRole);
    }

    @PostMapping
    public ParticipationDTO saveParticipation(@RequestBody ParticipationDTO dto) {
        return service.saveParticipation(dto);
    }
}