package com.car.backend.controllers;

import com.car.backend.DTO.ApplicationDTO;
import com.car.backend.entities.enums.AppStatus;
import com.car.backend.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/status/{status}")
    public List<ApplicationDTO> getApplicationsByStatus(@PathVariable AppStatus status) {
        return applicationService.getApplicationsByStatus(status);
    }

    @GetMapping("/applicant/{applicantId}")
    public List<ApplicationDTO> getApplicationsByApplicantId(@PathVariable Integer applicantId) {
        return applicationService.getApplicationsByApplicantId(applicantId);
    }

    @GetMapping("/template/{templateId}")
    public List<ApplicationDTO> getApplicationsByTemplateId(@PathVariable Integer templateId) {
        return applicationService.getApplicationsByTemplateId(templateId);
    }

    @PostMapping
    public ApplicationDTO saveApplication(@RequestBody ApplicationDTO applicationDTO) {
        return applicationService.saveApplication(applicationDTO);
    }
}