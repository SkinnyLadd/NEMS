//package com.car.backend.controllers;
//
//import com.car.backend.DTO.ApplicationAnswerDTO;
//import com.car.backend.services.ApplicationAnswerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/application-answers")
//public class ApplicationAnswerController {
//
//    @Autowired
//    private ApplicationAnswerService service;
//
//    @GetMapping("/application/{applicationId}")
//    public List<ApplicationAnswerDTO> getAnswersByApplicationId(@PathVariable Integer applicationId) {
//        return service.getAnswersByApplicationId(applicationId);
//    }
//
//    @GetMapping("/question/{questionId}")
//    public List<ApplicationAnswerDTO> getAnswersByQuestionId(@PathVariable Integer questionId) {
//        return service.getAnswersByQuestionId(questionId);
//    }
//
//    @PostMapping
//    public ApplicationAnswerDTO saveAnswer(@RequestBody ApplicationAnswerDTO dto) {
//        return service.saveAnswer(dto);
//    }
//}