package com.car.backend.repositories;

import com.car.backend.entities.EventOrganizer;
import com.car.backend.entities.EventOrganizerId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventOrganizerRepository extends JpaRepository<EventOrganizer, EventOrganizerId> {
    List<EventOrganizer> findByEventId(Integer eventId);
    List<EventOrganizer> findByUserId(Integer userId);
}