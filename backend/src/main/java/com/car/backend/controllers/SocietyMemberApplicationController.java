package com.car.backend.controllers;

import com.car.backend.DTO.SocietyMemberApplicationDTO;
import com.car.backend.services.SocietyMemberApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/society-member-applications")
public class SocietyMemberApplicationController {

    @Autowired
    private SocietyMemberApplicationService service;

    @GetMapping("/society/{societyId}")
    public List<SocietyMemberApplicationDTO> getApplicationsBySocietyId(@PathVariable Integer societyId) {
        return service.getApplicationsBySocietyId(societyId);
    }

    @GetMapping("/requested-role")
    public List<SocietyMemberApplicationDTO> getApplicationsByRequestedRole(@RequestParam String requestedRole) {
        return service.getApplicationsByRequestedRole(requestedRole);
    }

    @PostMapping
    public SocietyMemberApplicationDTO saveApplication(@RequestBody SocietyMemberApplicationDTO dto) {
        return service.saveApplication(dto);
    }
}