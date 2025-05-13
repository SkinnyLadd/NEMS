package com.car.backend.controllers;

import com.car.backend.DTO.ModuleDTO;
import com.car.backend.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    @Autowired
    private ModuleService service;

    @GetMapping("/venue")
    public List<ModuleDTO> getModulesByVenue(@RequestParam String venue) {
        return service.getModulesByVenue(venue);
    }

    @GetMapping("/time-range")
    public List<ModuleDTO> getModulesByTimeRange(@RequestParam Instant startTime, @RequestParam Instant endTime) {
        return service.getModulesByTimeRange(startTime, endTime);
    }

    @PostMapping
    public ModuleDTO saveModule(@RequestBody ModuleDTO dto) {
        return service.saveModule(dto);
    }
}