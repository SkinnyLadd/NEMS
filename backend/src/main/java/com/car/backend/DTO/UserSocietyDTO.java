package com.car.backend.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserSocietyDTO {
    private Integer userId;
    private Integer societyId;
    private String portfolio;
    private String role;
    private LocalDate joinDate;
    private LocalDate endDate;
}