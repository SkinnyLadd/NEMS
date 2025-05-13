package com.car.backend.DTO;

import com.car.backend.entities.enums.PartRole;
import lombok.Data;

@Data
public class ParticipationDTO {
    private Integer id;
    private Integer userId;
    private String partCustomRole;
    private String partDetails;
    private PartRole partRole;
}