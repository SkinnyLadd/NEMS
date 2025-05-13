package com.car.backend.controllers;

import com.car.backend.DTO.EventOrganizerDTO;
import com.car.backend.services.EventOrganizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-organizers")
public class EventOrganizerController {

    @Autowired
    private EventOrganizerService service;

    @GetMapping("/event/{eventId}")
    public List<EventOrganizerDTO> getOrganizersByEventId(@PathVariable Integer eventId) {
        return service.getOrganizersByEventId(eventId);
    }

    @GetMapping("/user/{userId}")
    public List<EventOrganizerDTO> getOrganizersByUserId(@PathVariable Integer userId) {
        return service.getOrganizersByUserId(userId);
    }

    @PostMapping
    public EventOrganizerDTO saveOrganizer(@RequestBody EventOrganizerDTO dto) {
        return service.saveOrganizer(dto);
    }
}