package com.car.backend.services;

import com.car.backend.DTO.CourseDTO;
import com.car.backend.entities.Course;
import com.car.backend.entities.enums.School;
import com.car.backend.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository repository;

    public List<CourseDTO> getCoursesBySchool(School school) {
        return repository.findBySchool(school).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public CourseDTO saveCourse(CourseDTO dto) {
        Course entity = convertToEntity(dto);
        Course savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private CourseDTO convertToDTO(Course entity) {
        CourseDTO dto = new CourseDTO();
        dto.setId(entity.getId());
        dto.setCourseName(entity.getCourseName());
        dto.setSchool(entity.getSchool().name());
        return dto;
    }

    private Course convertToEntity(CourseDTO dto) {
        Course entity = new Course();
        entity.setId(dto.getId());
        entity.setCourseName(dto.getCourseName());
        // Set school and level enums as needed
        return entity;
    }
}