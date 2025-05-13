package com.car.backend.repositories;

import com.car.backend.entities.QuestionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionTemplateRepository extends JpaRepository<QuestionTemplate, Integer> {
    List<QuestionTemplate> findByTemplateId(Integer templateId);
    List<QuestionTemplate> findByQuestionTextContainingIgnoreCase(String questionText);
}