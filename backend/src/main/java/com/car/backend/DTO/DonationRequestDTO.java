package com.car.backend.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DonationRequestDTO {
    private BigDecimal amount;
    private Integer eventId;
}
