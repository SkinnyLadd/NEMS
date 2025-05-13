package com.car.backend.services;

import com.car.backend.DTO.ModuleDTO;
import com.car.backend.entities.Module;
import com.car.backend.repositories.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository repository;

    public List<ModuleDTO> getModulesByVenue(String venue) {
        return repository.findByVenueContainingIgnoreCase(venue).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ModuleDTO> getModulesByTimeRange(Instant startTime, Instant endTime) {
        return repository.findByStartTimeBeforeAndEndTimeAfter(startTime, endTime).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ModuleDTO saveModule(ModuleDTO dto) {
        Module entity = convertToEntity(dto);
        Module savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private ModuleDTO convertToDTO(Module entity) {
        ModuleDTO dto = new ModuleDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setVenue(entity.getVenue());
        return dto;
    }

    private Module convertToEntity(ModuleDTO dto) {
        Module entity = new Module();
        entity.setId(dto.getId());
        entity.setDescription(dto.getDescription());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        entity.setVenue(dto.getVenue());
        return entity;
    }
}