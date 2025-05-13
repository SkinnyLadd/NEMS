package com.car.backend.DTO;

import lombok.Data;

@Data
public class QuestionTemplateDTO {
    private Integer id;
    private Integer templateId;
    private String questionText;
    private Integer sortOrder;
}