package com.car.backend.services;

import com.car.backend.DTO.UserSocietyDTO;
import com.car.backend.entities.UserSociety;
import com.car.backend.entities.UserSocietyId;
import com.car.backend.repositories.UserSocietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserSocietyService {

    @Autowired
    private UserSocietyRepository repository;

    public List<UserSocietyDTO> getUserSocietiesByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserSocietyDTO> getUserSocietiesBySocietyId(Integer societyId) {
        return repository.findBySocietyId(societyId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserSocietyDTO saveUserSociety(UserSocietyDTO dto) {
        UserSociety entity = convertToEntity(dto);
        UserSociety savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private UserSocietyDTO convertToDTO(UserSociety entity) {
        UserSocietyDTO dto = new UserSocietyDTO();
        dto.setUserId(entity.getUser().getId());
        dto.setSocietyId(entity.getSociety().getId());
        dto.setPortfolio(entity.getPortfolio());
        dto.setRole(entity.getRole());
        dto.setJoinDate(entity.getJoinDate());
        dto.setEndDate(entity.getEndDate());
        return dto;
    }

    private UserSociety convertToEntity(UserSocietyDTO dto) {
        UserSociety entity = new UserSociety();
        entity.setId(new UserSocietyId(dto.getUserId(), dto.getSocietyId()));
        // Set user and society entities as needed
        entity.setPortfolio(dto.getPortfolio());
        entity.setRole(dto.getRole());
        entity.setJoinDate(dto.getJoinDate());
        entity.setEndDate(dto.getEndDate());
        return entity;
    }
}