package com.car.backend.DTO;

import com.car.backend.entities.enums.AppStatus;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ApplicationDTO {
    private int id;
    private String eventTitle;
    private String status;
    private String appliedAt;
    private ApplicantInfo applicant;
    private List<AnswerDTO> answers;

    @Data
    public static class ApplicantInfo {
        private String name;
        private String email;
        private String regNo;
    }

    @Data
    public static class AnswerDTO {
        private int questionId;
        private String question;
        private String answer;
    }
}
