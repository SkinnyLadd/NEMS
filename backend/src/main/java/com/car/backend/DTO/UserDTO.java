package com.car.backend.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String batch;
}