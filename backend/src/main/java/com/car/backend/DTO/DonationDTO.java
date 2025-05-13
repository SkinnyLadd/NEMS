package com.car.backend.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class DonationDTO {
    private Integer id;
    private Integer userId;
    private Integer eventId;
    private BigDecimal amount;
    private Instant donatedAt;
}