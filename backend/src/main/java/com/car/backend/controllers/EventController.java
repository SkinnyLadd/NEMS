// backend/src/main/java/com/car/backend/controllers/EventController.java
package com.car.backend.controllers;

import com.car.backend.DTO.EventCreateRequestDTO;
import com.car.backend.DTO.EventCreateRequestDTO;
import com.car.backend.DTO.EventDTO;
import com.car.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService service;

    @GetMapping
    public List<EventDTO> getAllEvents() {

        System.out.println("getAllEvents");
        return service.getAllEvents();
    }

    @GetMapping("/society/{societyId}")
    public List<EventDTO> getEventsBySocietyId(@PathVariable Integer societyId) {
        return service.getEventsBySocietyId(societyId);
    }

    @GetMapping("/date-range")
    public List<EventDTO> getEventsByDateRange(@RequestParam Instant start, @RequestParam Instant end) {
        return service.getEventsByDateRange(start, end);
    }

    @GetMapping("/search")
    public List<EventDTO> searchEventsByTitle(@RequestParam String title) {
        return service.searchEventsByTitle(title);
    }

//    @PostMapping
//    public EventDTO saveEvent(@RequestBody EventDTO dto) {
//
//        System.out.println("saveEvent Controller");
//        return service.saveEvent(dto);
//    }

    @PostMapping("/api/events")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventCreateRequestDTO request) {
        EventDTO createdEvent = service.createEventFromRequest(request);
        return ResponseEntity.ok(createdEvent);
    }


    // Add PUT/DELETE as needed
}