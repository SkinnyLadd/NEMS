package com.car.backend.DTO;

import lombok.Data;

@Data
public class SocietyMemberApplicationDTO {
    private Integer id;
    private Integer societyId;
    private String requestedRole;
    private String portfolio;
}