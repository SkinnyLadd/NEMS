package com.car.backend.controllers;

import com.car.backend.DTO.QuestionTemplateDTO;
import com.car.backend.services.QuestionTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-templates")
public class QuestionTemplateController {

    @Autowired
    private QuestionTemplateService service;

    @GetMapping("/template/{templateId}")
    public List<QuestionTemplateDTO> getQuestionsByTemplateId(@PathVariable Integer templateId) {
        return service.getQuestionsByTemplateId(templateId);
    }

    @GetMapping("/search")
    public List<QuestionTemplateDTO> getQuestionsByText(@RequestParam String questionText) {
        return service.getQuestionsByText(questionText);
    }

    @PostMapping
    public QuestionTemplateDTO saveQuestion(@RequestBody QuestionTemplateDTO dto) {
        return service.saveQuestion(dto);
    }
}