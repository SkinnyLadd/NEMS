package com.car.backend.DTO;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class EventCreateRequestDTO {
    private String title;
    private String description;
    private Instant startDate;
    private Instant endDate;
    private Integer societyId;
    private String venue;
    private List<ModuleDTO> modules;
    private List<TicketDTO> ticketTypes;
}