// backend/src/main/java/com/car/backend/services/EventService.java
package com.car.backend.services;

import com.car.backend.DTO.EventCreateRequestDTO;
import com.car.backend.DTO.EventDTO;
import com.car.backend.entities.Module;
import com.car.backend.entities.Event;
import com.car.backend.entities.Society;
import com.car.backend.entities.Ticket;
import com.car.backend.repositories.EventRepository;
import com.car.backend.repositories.ModuleRepository;
import com.car.backend.repositories.SocietyRepository;
import com.car.backend.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;
    @Autowired
    private SocietyRepository societyRepository;
    @Autowired
    private ModuleRepository moduleRepository;
    @Autowired
    private TicketRepository ticketRepository;

    public List<EventDTO> getAllEvents() {
        System.out.println("Getting all events Service");
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<EventDTO> getEventsBySocietyId(Integer societyId) {
        return repository.findBySocietyId(societyId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByDateRange(Instant start, Instant end) {
        return repository.findByDateRange(start, end).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<EventDTO> searchEventsByTitle(String title) {
        return repository.searchByTitle(title).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EventDTO createEventFromRequest(EventCreateRequestDTO dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setStartTime(dto.getStartDate());
        event.setEndTime(dto.getEndDate());
        event.setVenue(dto.getVenue());

        Society society = societyRepository.findById(dto.getSocietyId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid society ID"));
        event.setSociety(society);

        // Save event first to get its ID
        Event savedEvent = repository.save(event);

        // Map and attach modules
        if (dto.getModules() != null) {
            List<Module> modules = dto.getModules().stream().map(moduleDto -> {
                Module module = new Module();
                module.setDescription(moduleDto.getDescription());
                module.setStartTime(moduleDto.getStartTime());
                module.setEndTime(moduleDto.getEndTime());
                module.setVenue(moduleDto.getVenue());
                module.setEvent(savedEvent);
                return module;
            }).collect(Collectors.toList());

            moduleRepository.saveAll(modules);
            // savedEvent.setModules(new HashSet<>(modules));
            savedEvent.setModules((Set<Module>) modules);
        }

        // Map and attach tickets
        if (dto.getTicketTypes() != null) {
            List<Ticket> tickets = dto.getTicketTypes().stream().map(ticketDto -> {
                Ticket ticket = new Ticket();
                ticket.setTicketPrice(ticketDto.getPrice());
                ticket.setAvailableTickets(ticketDto.getAvailableTickets());
                ticket.setEvent(savedEvent);
                return ticket;
            }).collect(Collectors.toList());

            ticketRepository.saveAll(tickets);
           // savedEvent.setTickets(new HashSet<>(tickets));
            savedEvent.setTickets((Set<Ticket>) tickets);
        }

        // Save event again if modules/tickets are set
        Event finalSavedEvent = repository.save(savedEvent);

        return toDTO(finalSavedEvent);
    }

    private EventDTO toDTO(Event event) {
        // Map Event to EventDTO
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setStartTime(event.getStartTime());
        dto.setEndTime(event.getEndTime());
        // Map other fields as needed
        return dto;
    }

    private Event toEntity(EventDTO dto) {
        // Map EventDTO to Event
        Event event = new Event();
        event.setId(dto.getId());
        event.setTitle(dto.getTitle());
        event.setStartTime(dto.getStartTime());
        event.setEndTime(dto.getEndTime());
        // Map other fields as needed
        return event;
    }
}