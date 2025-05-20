package com.car.backend.repositories;

import com.car.backend.entities.Application;
import com.car.backend.entities.enums.AppStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    @Query("SELECT a FROM Application a " +
            "JOIN FETCH a.applicant u " +
            "JOIN FETCH a.template t")
    List<Application> findAllWithEventAndUser();
}