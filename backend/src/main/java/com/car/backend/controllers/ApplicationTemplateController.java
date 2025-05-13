package com.car.backend.controllers;

import com.car.backend.DTO.ApplicationTemplateDTO;
import com.car.backend.services.ApplicationTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application-templates")
public class ApplicationTemplateController {

    @Autowired
    private ApplicationTemplateService applicationTemplateService;

    @GetMapping
    public List<ApplicationTemplateDTO> getAllTemplates() {
        return applicationTemplateService.getAllTemplates();
    }

    @GetMapping("/search")
    public List<ApplicationTemplateDTO> searchTemplatesByName(@RequestParam String name) {
        return applicationTemplateService.searchTemplatesByName(name);
    }

    @GetMapping("/creator/{userId}")
    public List<ApplicationTemplateDTO> getTemplatesByCreator(@PathVariable Integer userId) {
        return applicationTemplateService.getTemplatesByCreator(userId);
    }

    @PostMapping
    public ApplicationTemplateDTO saveTemplate(@RequestBody ApplicationTemplateDTO templateDTO) {
        return applicationTemplateService.saveTemplate(templateDTO);
    }
}