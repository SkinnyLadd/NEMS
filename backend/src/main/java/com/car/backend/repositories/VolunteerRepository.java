package com.car.backend.repositories;

import com.car.backend.entities.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerRepository extends JpaRepository<Volunteer, Integer> {
    List<Volunteer> findByUserId(Integer userId);
    List<Volunteer> findByAssignedRoleContainingIgnoreCase(String assignedRole);
}