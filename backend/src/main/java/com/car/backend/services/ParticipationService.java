package com.car.backend.services;

import com.car.backend.DTO.ParticipationDTO;
import com.car.backend.entities.Participation;
import com.car.backend.repositories.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParticipationService {

    @Autowired
    private ParticipationRepository repository;

    public List<ParticipationDTO> getParticipationsByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ParticipationDTO> getParticipationsByRole(String partRole) {
        return repository.findByPartRole(partRole).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ParticipationDTO saveParticipation(ParticipationDTO dto) {
        Participation entity = convertToEntity(dto);
        Participation savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private ParticipationDTO convertToDTO(Participation entity) {
        ParticipationDTO dto = new ParticipationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setPartCustomRole(entity.getPartCustomRole());
        dto.setPartDetails(entity.getPartDetails());
        dto.setPartRole(entity.getPartRole());
        return dto;
    }

    private Participation convertToEntity(ParticipationDTO dto) {
        Participation entity = new Participation();
        entity.setId(dto.getId());
        // Set user entity as needed
        entity.setPartCustomRole(dto.getPartCustomRole());
        entity.setPartDetails(dto.getPartDetails());
        entity.setPartRole(dto.getPartRole());
        return entity;
    }
}