package com.car.backend.repositories;

import com.car.backend.entities.EventOCApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventOCApplicationRepository extends JpaRepository<EventOCApplication, Integer> {
    List<EventOCApplication> findByEventId(Integer eventId);
    List<EventOCApplication> findByRequestedRole(String requestedRole);
}