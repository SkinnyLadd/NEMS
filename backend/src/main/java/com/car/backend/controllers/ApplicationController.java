package com.car.backend.controllers;

import com.car.backend.DTO.ApplicationDTO;
import com.car.backend.entities.enums.AppStatus;
import com.car.backend.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public List<ApplicationDTO> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @PutMapping("/{id}/status")
    public void updateStatus(@PathVariable int id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        applicationService.updateApplicationStatus(id, status);
    }
}
