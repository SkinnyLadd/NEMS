//package com.car.backend.services;
//
//import com.car.backend.DTO.ApplicationAnswerDTO;
//import com.car.backend.entities.ApplicationAnswer;
//import com.car.backend.repositories.ApplicationAnswerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class ApplicationAnswerService {
//
//    @Autowired
//    private ApplicationAnswerRepository repository;
//
//    public List<ApplicationAnswerDTO> getAnswersByApplicationId(Integer applicationId) {
//        return repository.findByApplicationId(applicationId).stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    public List<ApplicationAnswerDTO> getAnswersByQuestionId(Integer questionId) {
//        return repository.findByQuestionId(questionId).stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    public ApplicationAnswerDTO saveAnswer(ApplicationAnswerDTO dto) {
//        ApplicationAnswer entity = convertToEntity(dto);
//        ApplicationAnswer savedEntity = repository.save(entity);
//        return convertToDTO(savedEntity);
//    }
//
//    private ApplicationAnswerDTO convertToDTO(ApplicationAnswer entity) {
//        ApplicationAnswerDTO dto = new ApplicationAnswerDTO();
//        dto.setId(entity.getId());
//        dto.setApplicationId(entity.getApplication().getId());
//        dto.setQuestionId(entity.getQuestion().getId());
//        dto.setAnswerText(entity.getAnswerText());
//        return dto;
//    }
//
//    private ApplicationAnswer convertToEntity(ApplicationAnswerDTO dto) {
//        ApplicationAnswer entity = new ApplicationAnswer();
//        entity.setId(dto.getId());
//        entity.setAnswerText(dto.getAnswerText());
//        // Set application and question entities as needed
//        return entity;
//    }
//}