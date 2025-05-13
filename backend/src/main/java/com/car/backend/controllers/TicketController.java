package com.car.backend.controllers;

import com.car.backend.DTO.TicketDTO;
import com.car.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService service;

    @GetMapping("/event/{eventId}")
    public List<TicketDTO> getTicketsByEventId(@PathVariable Integer eventId) {
        return service.getTicketsByEventId(eventId);
    }

    @GetMapping("/type")
    public List<TicketDTO> getTicketsByType(@RequestParam String ticketType) {
        return service.getTicketsByType(ticketType);
    }

    @PostMapping
    public TicketDTO saveTicket(@RequestBody TicketDTO dto) {
        return service.saveTicket(dto);
    }
}