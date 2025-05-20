package com.car.backend.DTO;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class EventDTO {
    private Integer id;
    private String title;
    private String description;
    private Instant startTime;
    private Instant endTime;
    private Integer societyId;
    private String venue;

    private List<TicketDTO> tickets;
}