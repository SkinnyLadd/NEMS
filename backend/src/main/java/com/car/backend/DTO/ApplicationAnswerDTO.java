package com.car.backend.dto;

import lombok.Data;

@Data
public class ApplicationAnswerDTO {
    private Integer id;
    private Integer applicationId;
    private Integer questionId;
    private String answerText;
}