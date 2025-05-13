package com.car.backend.controllers;

import com.car.backend.DTO.RegistrationDTO;
import com.car.backend.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService service;

    @GetMapping("/user/{userId}")
    public List<RegistrationDTO> getRegistrationsByUserId(@PathVariable Integer userId) {
        return service.getRegistrationsByUserId(userId);
    }

    @GetMapping("/event/{eventId}")
    public List<RegistrationDTO> getRegistrationsByEventId(@PathVariable Integer eventId) {
        return service.getRegistrationsByEventId(eventId);
    }

    @GetMapping("/payment-status")
    public List<RegistrationDTO> getRegistrationsByPaymentStatus(@RequestParam String paymentStatus) {
        return service.getRegistrationsByPaymentStatus(paymentStatus);
    }

    @PostMapping
    public RegistrationDTO saveRegistration(@RequestBody RegistrationDTO dto) {
        return service.saveRegistration(dto);
    }
}