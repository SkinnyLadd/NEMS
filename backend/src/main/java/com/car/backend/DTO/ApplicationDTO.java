package com.car.backend.DTO;

import com.car.backend.entities.enums.AppStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class ApplicationDTO {
    private Integer id;
    private Integer templateId;
    private Integer applicantId;
    private Instant createdAt;
    private AppStatus status;
}