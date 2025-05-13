package com.car.backend.controllers;

import com.car.backend.DTO.CourseDTO;
import com.car.backend.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService service;

    @GetMapping("/school/{school}")
    public List<CourseDTO> getCoursesBySchool(@PathVariable String school) {
        return service.getCoursesBySchool(school);
    }

    @GetMapping("/level/{level}")
    public List<CourseDTO> getCoursesByLevel(@PathVariable String level) {
        return service.getCoursesByLevel(level);
    }

    @GetMapping("/code/{courseCode}")
    public CourseDTO getCourseByCode(@PathVariable String courseCode) {
        return service.getCourseByCode(courseCode);
    }

    @PostMapping
    public CourseDTO saveCourse(@RequestBody CourseDTO dto) {
        return service.saveCourse(dto);
    }
}