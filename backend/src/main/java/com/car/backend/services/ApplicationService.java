package com.car.backend.services;

import com.car.backend.DTO.ApplicationDTO;
import com.car.backend.entities.Application;
import com.car.backend.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.car.backend.entities.enums.AppStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<ApplicationDTO> getApplicationsByStatus(AppStatus status) {
        List<Application> applications = applicationRepository.findByStatus(status);
        return applications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ApplicationDTO> getApplicationsByApplicantId(Integer applicantId) {
        List<Application> applications = applicationRepository.findByApplicantId(applicantId);
        return applications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ApplicationDTO> getApplicationsByTemplateId(Integer templateId) {
        List<Application> applications = applicationRepository.findByTemplateId(templateId);
        return applications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ApplicationDTO saveApplication(ApplicationDTO applicationDTO) {
        Application application = convertToEntity(applicationDTO);
        Application savedApplication = applicationRepository.save(application);
        return convertToDTO(savedApplication);
    }

    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setTemplateId(application.getTemplate().getId());
        dto.setApplicantId(application.getApplicant().getId());
        dto.setCreatedAt(application.getCreatedAt());
        dto.setStatus(application.getStatus());
        return dto;
    }

    private Application convertToEntity(ApplicationDTO dto) {
        Application application = new Application();
        application.setId(dto.getId());
        // Set template and applicant using their respective services or repositories
        application.setCreatedAt(dto.getCreatedAt());
        application.setStatus(dto.getStatus());
        return application;
    }
}