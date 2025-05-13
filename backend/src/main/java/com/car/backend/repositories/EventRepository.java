package com.car.backend.repositories;

import com.car.backend.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findBySocietyId(Integer societyId);
    List<Event> findByStartTimeBetween(Instant start, Instant end);
    List<Event> findByTitleContainingIgnoreCase(String title);
}