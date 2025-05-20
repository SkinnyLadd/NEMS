package com.car.backend.DTO;

import com.car.backend.entities.enums.School;
import lombok.Data;

@Data
public class CourseDTO {
    private Integer id;
    private String courseName;
    private School school;
}