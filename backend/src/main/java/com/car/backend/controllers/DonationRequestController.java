package com.car.backend.controllers;

import com.car.backend.DTO.DonationDTO;
import com.car.backend.DTO.DonationRequestDTO;
import com.car.backend.services.DonationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class DonationRequestController {

    private DonationService donationService;

    @PostMapping("/donations")
    public ResponseEntity<DonationDTO> createDonation(@RequestBody DonationRequestDTO request) {
        DonationDTO saved = donationService.createDonation(request);
        return ResponseEntity.ok(saved);
    }

}
