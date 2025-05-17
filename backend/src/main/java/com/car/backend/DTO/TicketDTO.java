package com.car.backend.DTO;

import com.car.backend.entities.enums.TicketType;
import lombok.Data;

@Data
public class TicketDTO {
    private Integer id;
    private Long price;
    private Integer eventId;
    private Integer availableTickets;
    private TicketType ticketType;
}