package com.car.backend.services;

import com.car.backend.DTO.DonationDTO;
import com.car.backend.entities.Donation;
import com.car.backend.repositories.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationService {

    @Autowired
    private DonationRepository repository;

    public List<DonationDTO> getDonationsByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DonationDTO> getDonationsByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DonationDTO saveDonation(DonationDTO dto) {
        Donation entity = convertToEntity(dto);
        Donation savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private DonationDTO convertToDTO(Donation entity) {
        DonationDTO dto = new DonationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setEventId(entity.getEvent() != null ? entity.getEvent().getId() : null);
        dto.setAmount(entity.getAmount());
        dto.setDonatedAt(entity.getDonatedAt());
        return dto;
    }

    private Donation convertToEntity(DonationDTO dto) {
        Donation entity = new Donation();
        entity.setId(dto.getId());
        entity.setAmount(dto.getAmount());
        entity.setDonatedAt(dto.getDonatedAt());
        // Set user and event entities as needed
        return entity;
    }
}