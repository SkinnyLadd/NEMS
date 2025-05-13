package com.car.backend.DTO;

import lombok.Data;

@Data
public class EventOrganizerDTO {
    private Integer userId;
    private Integer eventId;
    private String portfolio;
    private String role;
}