package com.car.backend.repositories;

import com.car.backend.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
    List<Module> findByVenueContainingIgnoreCase(String venue);
    List<Module> findByStartTimeBeforeAndEndTimeAfter(Instant startTime, Instant endTime);
}