// CourseService.java
package com.car.backend.services;

import com.car.backend.DTO.CourseDTO;
import com.car.backend.entities.enums.School;
import com.car.backend.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(course -> {
            CourseDTO dto = new CourseDTO();
            dto.setId(course.getId());
            dto.setCourseName(course.getCourseName());
            dto.setSchool(course.getSchool());
            return dto;
        }).collect(Collectors.toList());
    }

    public List<CourseDTO> getCoursesBySchool(String schoolStr) {
        try {
           School school = School.valueOf(schoolStr.toUpperCase());
            return courseRepository.findBySchool(school)
                    .stream()
                    .map(course -> {
                        CourseDTO dto = new CourseDTO();
                        dto.setId(course.getId());
                        dto.setCourseName(course.getCourseName());
                        dto.setSchool(course.getSchool());
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid school value");
        }
    }



}
