package com.car.backend.services;

import com.car.backend.DTO.ApplicationTemplateDTO;
import com.car.backend.entities.ApplicationTemplate;
import com.car.backend.repositories.ApplicationTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.car.backend.entities.enums.AppTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationTemplateService {

    @Autowired
    private ApplicationTemplateRepository applicationTemplateRepository;

    public List<ApplicationTemplateDTO> getAllTemplates() {
        List<ApplicationTemplate> templates = applicationTemplateRepository.findAll();
        return templates.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ApplicationTemplateDTO> searchTemplatesByName(String name) {
        List<ApplicationTemplate> templates = applicationTemplateRepository.findByNameContaining(name);
        return templates.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ApplicationTemplateDTO> getTemplatesByCreator(Integer userId) {
        List<ApplicationTemplate> templates = applicationTemplateRepository.findByCreatedBy(userId);
        return templates.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ApplicationTemplateDTO saveTemplate(ApplicationTemplateDTO templateDTO) {
        ApplicationTemplate template = convertToEntity(templateDTO);
        ApplicationTemplate savedTemplate = applicationTemplateRepository.save(template);
        return convertToDTO(savedTemplate);
    }

    private ApplicationTemplateDTO convertToDTO(ApplicationTemplate template) {
        ApplicationTemplateDTO dto = new ApplicationTemplateDTO();
        dto.setId(template.getId());
        dto.setName(template.getName());
        dto.setDescription(template.getDescription());
        dto.setCreatedById(template.getCreatedBy() != null ? template.getCreatedBy().getId() : null);
        dto.setCreatedAt(template.getCreatedAt());
        dto.setTemplateType(template.getTemplate().name());
        return dto;
    }

    private ApplicationTemplate convertToEntity(ApplicationTemplateDTO dto) {
        ApplicationTemplate template = new ApplicationTemplate();
        template.setId(dto.getId());
        template.setName(dto.getName());
        template.setDescription(dto.getDescription());
        // Set createdBy using UserService or repository if needed
        template.setTemplate(AppTemplate.valueOf(dto.getTemplateType()));
        return template;
    }
}