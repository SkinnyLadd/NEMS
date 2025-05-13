package com.car.backend.services;

import com.car.backend.DTO.VolunteerDTO;
import com.car.backend.entities.Volunteer;
import com.car.backend.repositories.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository repository;

    public List<VolunteerDTO> getVolunteersByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VolunteerDTO> getVolunteersByAssignedRole(String assignedRole) {
        return repository.findByAssignedRoleContainingIgnoreCase(assignedRole).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VolunteerDTO saveVolunteer(VolunteerDTO dto) {
        Volunteer entity = convertToEntity(dto);
        Volunteer savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private VolunteerDTO convertToDTO(Volunteer entity) {
        VolunteerDTO dto = new VolunteerDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setAssignedRole(entity.getAssignedRole());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        return dto;
    }

    private Volunteer convertToEntity(VolunteerDTO dto) {
        Volunteer entity = new Volunteer();
        entity.setId(dto.getId());
        // Set user entity as needed
        entity.setAssignedRole(dto.getAssignedRole());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        return entity;
    }
}