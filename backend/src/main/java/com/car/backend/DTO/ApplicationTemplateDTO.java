package com.car.backend.DTO;

import lombok.Data;

import java.time.Instant;
import com.car.backend.entities.enums.AppTemplate;

@Data
public class ApplicationTemplateDTO {
    private Integer id;
    private String name;
    private String description;
    private Integer createdById;
    private Instant createdAt;
    private String templateType;
}