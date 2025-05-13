package com.car.backend.controllers;

import com.car.backend.DTO.EventOCApplicationDTO;
import com.car.backend.services.EventOCApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-oc-applications")
public class EventOCApplicationController {

    @Autowired
    private EventOCApplicationService service;

    @GetMapping("/event/{eventId}")
    public List<EventOCApplicationDTO> getApplicationsByEventId(@PathVariable Integer eventId) {
        return service.getApplicationsByEventId(eventId);
    }

    @GetMapping("/role/{requestedRole}")
    public List<EventOCApplicationDTO> getApplicationsByRequestedRole(@PathVariable String requestedRole) {
        return service.getApplicationsByRequestedRole(requestedRole);
    }

    @PostMapping
    public EventOCApplicationDTO saveApplication(@RequestBody EventOCApplicationDTO dto) {
        return service.saveApplication(dto);
    }
}