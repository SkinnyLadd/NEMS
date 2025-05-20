package com.car.backend.controllers;

import com.car.backend.DTO.MerchDTO;
import com.car.backend.services.MerchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/merch")
public class MerchController {

    @Autowired
    private MerchService service;

    @GetMapping
    public List<MerchDTO> getAllMerch() {
        return service.getAllMerch();
    }

    @GetMapping("/search")
    public List<MerchDTO> getMerchByName(@RequestParam String merchName) {
        return service.getMerchByName(merchName);
    }

    @GetMapping("/type/{merchType}")
    public List<MerchDTO> getMerchByType(@PathVariable String merchType) {
        return service.getMerchByType(merchType);
    }

    @GetMapping("/purchaseable")
    public List<MerchDTO> getPurchaseableMerch() {
        return service.getPurchaseableMerch();
    }

    @PostMapping
    public MerchDTO saveMerch(@RequestBody MerchDTO dto) {
        return service.saveMerch(dto);
    }
}