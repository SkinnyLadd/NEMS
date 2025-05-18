package com.car.backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class MemberDTO {
    private Integer id;
    private String name;
    private String email;
    private List<String> societies;
    private String role;
    private String joinDate;
    private String status; // "active" or "inactive"
}
