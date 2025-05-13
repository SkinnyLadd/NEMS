package com.car.backend.DTO;

import lombok.Data;

import java.time.Instant;

@Data
public class ModuleDTO {
    private Integer id;
    private String description;
    private Instant startTime;
    private Instant endTime;
    private String venue;
}