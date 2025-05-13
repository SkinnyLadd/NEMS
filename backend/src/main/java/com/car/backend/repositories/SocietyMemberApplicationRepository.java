package com.car.backend.repositories;

import com.car.backend.entities.SocietyMemberApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocietyMemberApplicationRepository extends JpaRepository<SocietyMemberApplication, Integer> {
    List<SocietyMemberApplication> findBySocietyId(Integer societyId);
    List<SocietyMemberApplication> findByRequestedRoleContainingIgnoreCase(String requestedRole);
}