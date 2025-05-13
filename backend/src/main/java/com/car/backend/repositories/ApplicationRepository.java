package com.car.backend.repositories;

import com.car.backend.entities.Application;
import com.car.backend.entities.enums.AppStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    @Query("SELECT a FROM Application a WHERE a.status = :status")
    List<Application> findByStatus(@Param("status") AppStatus status);

    @Query("SELECT a FROM Application a WHERE a.applicant.id = :applicantId")
    List<Application> findByApplicantId(@Param("applicantId") Integer applicantId);

    @Query("SELECT a FROM Application a WHERE a.template.id = :templateId")
    List<Application> findByTemplateId(@Param("templateId") Integer templateId);
}