package com.car.backend.controllers;

import com.car.backend.DTO.SocietyDTO;
import com.car.backend.services.SocietyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/societies")
public class SocietyController {

    @Autowired
    private SocietyService service;

    @GetMapping("/search")
    public List<SocietyDTO> getSocietiesByName(@RequestParam String socName) {
        return service.getSocietiesByName(socName);
    }

    @GetMapping
    public List<SocietyDTO> getAllSocieties() {
        return service.getAllSocieties();
    }

//    @GetMapping
//    public List<SocietyDTO> getSocietiesById(@RequestParam Integer Id) {
//        return service.getSocietiesById(Id);
//    }

    @PostMapping
    public SocietyDTO saveSociety(@RequestBody SocietyDTO dto) {
        return service.saveSociety(dto);
    }
}