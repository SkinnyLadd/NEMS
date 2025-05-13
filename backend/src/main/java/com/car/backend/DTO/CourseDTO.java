package com.car.backend.DTO;

import lombok.Data;

@Data
public class CourseDTO {
    private Integer id;
    private String courseCode;
    private String courseName;
    private String description;
    private String school;
    private String level;
}