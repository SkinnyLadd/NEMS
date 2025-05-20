package com.car.backend.DTO;

import com.car.backend.entities.enums.Batch;
import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private Long cms;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Batch batch;
    private Integer courseId;
}