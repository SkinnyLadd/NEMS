package com.car.backend.services;

import com.car.backend.DTO.QuestionTemplateDTO;
import com.car.backend.entities.QuestionTemplate;
import com.car.backend.repositories.QuestionTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionTemplateService {

    @Autowired
    private QuestionTemplateRepository repository;

    public List<QuestionTemplateDTO> getQuestionsByTemplateId(Integer templateId) {
        return repository.findByTemplateId(templateId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionTemplateDTO> getQuestionsByText(String questionText) {
        return repository.findByQuestionTextContainingIgnoreCase(questionText).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public QuestionTemplateDTO saveQuestion(QuestionTemplateDTO dto) {
        QuestionTemplate entity = convertToEntity(dto);
        QuestionTemplate savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private QuestionTemplateDTO convertToDTO(QuestionTemplate entity) {
        QuestionTemplateDTO dto = new QuestionTemplateDTO();
        dto.setId(entity.getId());
        dto.setTemplateId(entity.getTemplate().getId());
        dto.setQuestionText(entity.getQuestionText());
        dto.setSortOrder(entity.getSortOrder());
        return dto;
    }

    private QuestionTemplate convertToEntity(QuestionTemplateDTO dto) {
        QuestionTemplate entity = new QuestionTemplate();
        entity.setId(dto.getId());
        // Set template entity as needed
        entity.setQuestionText(dto.getQuestionText());
        entity.setSortOrder(dto.getSortOrder());
        return entity;
    }
}