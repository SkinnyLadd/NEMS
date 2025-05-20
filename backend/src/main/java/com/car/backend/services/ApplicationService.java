package com.car.backend.services;

import com.car.backend.DTO.ApplicationDTO;
import com.car.backend.entities.Application;
import com.car.backend.repositories.ApplicationAnswerRepository;
import com.car.backend.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.car.backend.entities.enums.AppStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepo;

    @Autowired
    private ApplicationAnswerRepository answerRepo;

    public List<ApplicationDTO> getAllApplications() {
        List<Application> apps = applicationRepo.findAllWithEventAndUser();
        return apps.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void updateApplicationStatus(int id, String newStatus) {
        Application app = applicationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(AppStatus.valueOf(newStatus));
        applicationRepo.save(app);
    }

    private ApplicationDTO toDTO(Application app) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(app.getId());
        dto.setEventTitle(app.getTemplate().getName());
        dto.setStatus(app.getStatus().name());
        dto.setAppliedAt(app.getCreatedAt().toString());

        ApplicationDTO.ApplicantInfo applicant = new ApplicationDTO.ApplicantInfo();
        applicant.setName(app.getApplicant().getFirstName() + " " + app.getApplicant().getLastName());
        applicant.setEmail(app.getApplicant().getEmail());
        applicant.setRegNo(String.valueOf(app.getApplicant().getCms()));
        dto.setApplicant(applicant);

        List<ApplicationDTO.AnswerDTO> answers = answerRepo.findByApplicationId(app.getId()).stream()
                .map(answer -> {
                    ApplicationDTO.AnswerDTO a = new ApplicationDTO.AnswerDTO();
                    a.setQuestionId(answer.getQuestion().getId());
                    a.setQuestion(answer.getQuestion().getQuestionText());
                    a.setAnswer(answer.getAnswerText());
                    return a;
                }).toList();

        dto.setAnswers(answers);
        return dto;
    }
}
