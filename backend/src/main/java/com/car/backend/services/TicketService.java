package com.car.backend.services;

import com.car.backend.DTO.TicketDTO;
import com.car.backend.entities.Ticket;
import com.car.backend.entities.enums.TicketType;
import com.car.backend.repositories.TicketRepository;
import com.car.backend.utils.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    @Autowired
    private TicketRepository repository;

    public List<TicketDTO> getTicketsByEventId(Integer eventId) {
        return repository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TicketDTO> getTicketsByType(String ticketType) {
        return repository.findByTicketType(TicketType.valueOf(ticketType)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TicketDTO saveTicket(TicketDTO dto) {
        Ticket entity = convertToEntity(dto);
        Ticket savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private TicketDTO convertToDTO(Ticket entity) {
        TicketDTO dto = new TicketDTO();
        dto.setId(entity.getId());
        dto.setEventId(entity.getEvent().getId());
        dto.setAvailableTickets(entity.getAvailableTickets());
        dto.setTicketType(String.valueOf(entity.getTicketType()));
        return dto;
    }

    private Ticket convertToEntity(TicketDTO dto) {
        Ticket entity = new Ticket();
        entity.setId(dto.getId());
        // Set event entity as needed
        entity.setAvailableTickets(dto.getAvailableTickets());
        entity.setTicketType(EnumUtils.parseTicketType(dto.getTicketType()));
        return entity;
    }
}