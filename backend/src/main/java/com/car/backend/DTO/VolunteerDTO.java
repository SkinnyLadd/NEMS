package com.car.backend.DTO;

import lombok.Data;

import java.time.Instant;

@Data
public class VolunteerDTO {
    private Integer id;
    private Integer userId;
    private String assignedRole;
    private Instant startTime;
    private Instant endTime;
}