package com.car.backend.services;

import com.car.backend.DTO.EventOrganizerDTO;
import com.car.backend.entities.EventOrganizer;
import com.car.backend.entities.EventOrganizerId;
import com.car.backend.repositories.EventOrganizerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventOrganizerService {

    @Autowired
    private EventOrganizerRepository repository;

    public List<EventOrganizerDTO> getOrganizersByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventOrganizerDTO> getOrganizersByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventOrganizerDTO saveOrganizer(EventOrganizerDTO dto) {
        EventOrganizer entity = convertToEntity(dto);
        EventOrganizer savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private EventOrganizerDTO convertToDTO(EventOrganizer entity) {
        EventOrganizerDTO dto = new EventOrganizerDTO();
        dto.setUserId(entity.getUser().getId());
        dto.setEventId(entity.getEvent().getId());
        dto.setPortfolio(entity.getPortfolio());
        dto.setRole(entity.getRole());
        return dto;
    }

    private EventOrganizer convertToEntity(EventOrganizerDTO dto) {
        EventOrganizer entity = new EventOrganizer();
        entity.setId(new EventOrganizerId(dto.getUserId(), dto.getEventId()));
        entity.setPortfolio(dto.getPortfolio());
        entity.setRole(dto.getRole());
        // Set user and event entities as needed
        return entity;
    }
}