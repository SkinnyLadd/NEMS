package com.car.backend.services;

import com.car.backend.DTO.SocietyDTO;
import com.car.backend.entities.Society;
import com.car.backend.repositories.SocietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocietyService {

    @Autowired
    private SocietyRepository repository;

    public List<SocietyDTO> getSocietiesByName(String socName) {
        return repository.findBySocNameContainingIgnoreCase(socName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SocietyDTO> getAllSocieties() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SocietyDTO saveSociety(SocietyDTO dto) {
        Society entity = convertToEntity(dto);
        Society savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private SocietyDTO convertToDTO(Society entity) {
        SocietyDTO dto = new SocietyDTO();
        dto.setId(entity.getId());
        dto.setSocName(entity.getSocName());
        dto.setDescription(entity.getDescription());
        return dto;
    }

    private Society convertToEntity(SocietyDTO dto) {
        Society entity = new Society();
        entity.setId(dto.getId());
        entity.setSocName(dto.getSocName());
        entity.setDescription(dto.getDescription());
        return entity;
    }

//    public List<SocietyDTO> getSocietiesBySocId(Integer id) {
//        return repository.findBySocId(id).stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
}