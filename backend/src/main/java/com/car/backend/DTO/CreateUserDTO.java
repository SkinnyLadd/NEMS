package com.car.backend.DTO;

import com.car.backend.entities.enums.Batch;
import lombok.Data;

@Data
public class CreateUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long cms;
    private String role;
    private Batch batch;
    private String department;
}
