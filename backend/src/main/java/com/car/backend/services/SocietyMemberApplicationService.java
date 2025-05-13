package com.car.backend.services;

import com.car.backend.DTO.SocietyMemberApplicationDTO;
import com.car.backend.entities.SocietyMemberApplication;
import com.car.backend.repositories.SocietyMemberApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocietyMemberApplicationService {

    @Autowired
    private SocietyMemberApplicationRepository repository;

    public List<SocietyMemberApplicationDTO> getApplicationsBySocietyId(Integer societyId) {
        return repository.findBySocietyId(societyId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SocietyMemberApplicationDTO> getApplicationsByRequestedRole(String requestedRole) {
        return repository.findByRequestedRoleContainingIgnoreCase(requestedRole).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SocietyMemberApplicationDTO saveApplication(SocietyMemberApplicationDTO dto) {
        SocietyMemberApplication entity = convertToEntity(dto);
        SocietyMemberApplication savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private SocietyMemberApplicationDTO convertToDTO(SocietyMemberApplication entity) {
        SocietyMemberApplicationDTO dto = new SocietyMemberApplicationDTO();
        dto.setId(entity.getId());
        dto.setSocietyId(entity.getSociety().getId());
        dto.setRequestedRole(entity.getRequestedRole());
        dto.setPortfolio(entity.getPortfolio());
        return dto;
    }

    private SocietyMemberApplication convertToEntity(SocietyMemberApplicationDTO dto) {
        SocietyMemberApplication entity = new SocietyMemberApplication();
        entity.setId(dto.getId());
        // Set society entity as needed
        entity.setRequestedRole(dto.getRequestedRole());
        entity.setPortfolio(dto.getPortfolio());
        return entity;
    }
}