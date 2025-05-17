package com.car.backend.repositories;

import com.car.backend.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.Instant;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findBySocietyId(Integer societyId);

    @Query("SELECT e FROM Event e WHERE e.startTime >= :start AND e.endTime <= :end")
    List<Event> findByDateRange(Instant start, Instant end);

    @Query("SELECT e FROM Event e WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Event> searchByTitle(String title);
}