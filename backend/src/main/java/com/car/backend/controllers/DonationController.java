package com.car.backend.controllers;

import com.car.backend.DTO.DonationDTO;
import com.car.backend.DTO.DonationResponseDTO;
import com.car.backend.services.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
    private DonationService donationService;

    @Autowired
    private DonationService service;

    @GetMapping
    public List<DonationResponseDTO> getAllDonations() {
        return service.getAllDonations();
    }

    @GetMapping("/user/{userId}")
    public List<DonationDTO> getDonationsByUserId(@PathVariable Integer userId) {
        return service.getDonationsByUserId(userId);
    }

    @GetMapping("/event/{eventId}")
    public List<DonationDTO> getDonationsByEventId(@PathVariable Integer eventId) {
        return service.getDonationsByEventId(eventId);
    }


    @PostMapping
    public DonationDTO saveDonation(@RequestBody DonationDTO dto) {
        return service.saveDonation(dto);
    }
}