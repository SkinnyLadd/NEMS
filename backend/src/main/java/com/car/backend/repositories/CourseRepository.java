package com.car.backend.repositories;

import com.car.backend.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findBySchool(String school);
    List<Course> findByLevel(String level);
    List<Course> findByCourseCode(String courseCode);
}