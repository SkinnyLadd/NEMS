package com.car.backend.repositories;

import com.car.backend.entities.Course;
import com.car.backend.entities.enums.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findBySchool(School school);
}