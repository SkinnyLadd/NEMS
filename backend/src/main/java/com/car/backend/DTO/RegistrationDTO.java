package com.car.backend.DTO;

import com.car.backend.entities.enums.PaymentStatus;
import com.car.backend.entities.enums.TicketType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegistrationDTO {
    private Integer id;
    private Integer userId;
    private Integer eventId;
    private LocalDate purchaseDate;
    private TicketType ticketType;
    private PaymentStatus paymentStatus;
}