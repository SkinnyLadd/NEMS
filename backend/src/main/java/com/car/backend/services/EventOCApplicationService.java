package com.car.backend.services;

import com.car.backend.DTO.EventOCApplicationDTO;
import com.car.backend.entities.EventOCApplication;
import com.car.backend.repositories.EventOCApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventOCApplicationService {

    @Autowired
    private EventOCApplicationRepository repository;

    public List<EventOCApplicationDTO> getApplicationsByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventOCApplicationDTO> getApplicationsByRequestedRole(String requestedRole) {
        return repository.findByRequestedRole(requestedRole).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventOCApplicationDTO saveApplication(EventOCApplicationDTO dto) {
        EventOCApplication entity = convertToEntity(dto);
        EventOCApplication savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private EventOCApplicationDTO convertToDTO(EventOCApplication entity) {
        EventOCApplicationDTO dto = new EventOCApplicationDTO();
        dto.setId(entity.getId());
        dto.setEventId(entity.getEvent().getId());
        dto.setRequestedRole(entity.getRequestedRole());
        dto.setPortfolio(entity.getPortfolio());
        return dto;
    }

    private EventOCApplication convertToEntity(EventOCApplicationDTO dto) {
        EventOCApplication entity = new EventOCApplication();
        entity.setId(dto.getId());
        entity.setRequestedRole(dto.getRequestedRole());
        entity.setPortfolio(dto.getPortfolio());
        // Set event entity as needed
        return entity;
    }
}