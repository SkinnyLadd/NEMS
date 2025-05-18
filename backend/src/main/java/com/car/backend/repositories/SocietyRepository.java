package com.car.backend.repositories;

import com.car.backend.entities.Society;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocietyRepository extends JpaRepository<Society, Integer> {
    List<Society> findBySocNameContainingIgnoreCase(String socName);
//    List<Society> findBySocId(Integer id);
}