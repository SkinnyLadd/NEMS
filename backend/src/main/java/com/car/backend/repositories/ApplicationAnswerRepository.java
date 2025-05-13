package com.car.backend.repositories;

import com.car.backend.entities.ApplicationAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationAnswerRepository extends JpaRepository<ApplicationAnswer, Integer> {

    @Query("SELECT a FROM ApplicationAnswer a WHERE a.application.id = :applicationId")
    List<ApplicationAnswer> findByApplicationId(@Param("applicationId") Integer applicationId);

    @Query("SELECT a FROM ApplicationAnswer a WHERE a.question.id = :questionId")
    List<ApplicationAnswer> findByQuestionId(@Param("questionId") Integer questionId);
}