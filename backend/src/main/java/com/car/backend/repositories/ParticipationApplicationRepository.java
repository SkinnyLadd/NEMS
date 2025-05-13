package com.car.backend.repositories;

import com.car.backend.entities.ParticipationApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationApplicationRepository extends JpaRepository<ParticipationApplication, Integer> {
    List<ParticipationApplication> findByEventId(Integer eventId);
    List<ParticipationApplication> findByCustomRoleContainingIgnoreCase(String customRole);
}