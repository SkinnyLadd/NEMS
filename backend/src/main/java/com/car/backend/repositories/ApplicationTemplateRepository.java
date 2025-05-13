package com.car.backend.repositories;

import com.car.backend.entities.ApplicationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationTemplateRepository extends JpaRepository<ApplicationTemplate, Integer> {

    @Query("SELECT t FROM ApplicationTemplate t WHERE t.name LIKE %:name%")
    List<ApplicationTemplate> findByNameContaining(@Param("name") String name);

    @Query("SELECT t FROM ApplicationTemplate t WHERE t.createdBy.id = :userId")
    List<ApplicationTemplate> findByCreatedBy(@Param("userId") Integer userId);
}