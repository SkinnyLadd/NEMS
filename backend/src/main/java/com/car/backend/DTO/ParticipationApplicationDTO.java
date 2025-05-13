package com.car.backend.DTO;

import lombok.Data;

@Data
public class ParticipationApplicationDTO {
    private Integer id;
    private Integer eventId;
    private String customRole;
    private String details;
}