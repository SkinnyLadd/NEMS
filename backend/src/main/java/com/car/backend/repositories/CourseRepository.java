package com.car.backend.repositories;

import com.car.backend.entities.Course;
import com.car.backend.entities.enums.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findBySchool(School school);
    Optional<Course> findByCourseName(String CourseName);
}