package com.car.backend.controllers;

import com.car.backend.DTO.CourseDTO;
import com.car.backend.entities.enums.School;
import com.car.backend.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseDTO> getCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/by-school/{school}")
    public List<CourseDTO> getCoursesBySchool(@PathVariable String school) {
        return courseService.getCoursesBySchool(school);
    }



}
