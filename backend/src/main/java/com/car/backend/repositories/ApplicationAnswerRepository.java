package com.car.backend.repositories;

import com.car.backend.entities.ApplicationAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationAnswerRepository extends JpaRepository<ApplicationAnswer, Integer> {
    List<ApplicationAnswer> findByApplicationId(Integer applicationId);
}