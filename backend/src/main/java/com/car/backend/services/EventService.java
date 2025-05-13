package com.car.backend.services;

import com.car.backend.DTO.EventDTO;
import com.car.backend.entities.Event;
import com.car.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;

    public List<EventDTO> getEventsBySocietyId(Integer societyId) {
        return repository.findBySocietyId(societyId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByDateRange(Instant start, Instant end) {
        return repository.findByStartTimeBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> searchEventsByTitle(String title) {
        return repository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventDTO saveEvent(EventDTO dto) {
        Event entity = convertToEntity(dto);
        Event savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private EventDTO convertToDTO(Event entity) {
        EventDTO dto = new EventDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setSocietyId(entity.getSociety().getId());
        return dto;
    }

    private Event convertToEntity(EventDTO dto) {
        Event entity = new Event();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        // Set society entity as needed
        return entity;
    }
}