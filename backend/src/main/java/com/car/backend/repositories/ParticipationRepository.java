package com.car.backend.repositories;

import com.car.backend.entities.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Integer> {
    List<Participation> findByUserId(Integer userId);
    List<Participation> findByPartRole(String partRole);
}