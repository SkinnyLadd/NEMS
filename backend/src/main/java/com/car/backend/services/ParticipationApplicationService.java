package com.car.backend.services;

import com.car.backend.DTO.ParticipationApplicationDTO;
import com.car.backend.entities.ParticipationApplication;
import com.car.backend.repositories.ParticipationApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParticipationApplicationService {

    @Autowired
    private ParticipationApplicationRepository repository;

    public List<ParticipationApplicationDTO> getApplicationsByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ParticipationApplicationDTO> getApplicationsByCustomRole(String customRole) {
        return repository.findByCustomRoleContainingIgnoreCase(customRole).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ParticipationApplicationDTO saveApplication(ParticipationApplicationDTO dto) {
        ParticipationApplication entity = convertToEntity(dto);
        ParticipationApplication savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private ParticipationApplicationDTO convertToDTO(ParticipationApplication entity) {
        ParticipationApplicationDTO dto = new ParticipationApplicationDTO();
        dto.setId(entity.getId());
        dto.setEventId(entity.getEvent().getId());
        dto.setCustomRole(entity.getCustomRole());
        dto.setDetails(entity.getDetails());
        return dto;
    }

    private ParticipationApplication convertToEntity(ParticipationApplicationDTO dto) {
        ParticipationApplication entity = new ParticipationApplication();
        entity.setId(dto.getId());
        // Set event entity as needed
        entity.setCustomRole(dto.getCustomRole());
        entity.setDetails(dto.getDetails());
        return entity;
    }
}