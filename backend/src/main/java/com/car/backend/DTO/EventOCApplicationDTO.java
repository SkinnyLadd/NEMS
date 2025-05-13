package com.car.backend.DTO;

import lombok.Data;

@Data
public class EventOCApplicationDTO {
    private Integer id;
    private Integer eventId;
    private String requestedRole;
    private String portfolio;
}