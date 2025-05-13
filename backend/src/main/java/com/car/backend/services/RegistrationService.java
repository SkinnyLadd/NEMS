package com.car.backend.services;

import com.car.backend.DTO.RegistrationDTO;
import com.car.backend.entities.Registration;
import com.car.backend.repositories.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository repository;

    public List<RegistrationDTO> getRegistrationsByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RegistrationDTO> getRegistrationsByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RegistrationDTO> getRegistrationsByPaymentStatus(String paymentStatus) {
        return repository.findByPaymentStatus(paymentStatus).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RegistrationDTO saveRegistration(RegistrationDTO dto) {
        Registration entity = convertToEntity(dto);
        Registration savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private RegistrationDTO convertToDTO(Registration entity) {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setEventId(entity.getEvent().getId());
        dto.setPurchaseDate(entity.getPurchaseDate());
        dto.setTicketType(entity.getTicketType());
        dto.setPaymentStatus(entity.getPaymentStatus());
        return dto;
    }

    private Registration convertToEntity(RegistrationDTO dto) {
        Registration entity = new Registration();
        entity.setId(dto.getId());
        // Set user and event entities as needed
        entity.setPurchaseDate(dto.getPurchaseDate());
        entity.setTicketType(dto.getTicketType());
        entity.setPaymentStatus(dto.getPaymentStatus());
        return entity;
    }
}