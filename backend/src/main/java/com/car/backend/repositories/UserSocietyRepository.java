package com.car.backend.repositories;

import com.car.backend.entities.UserSociety;
import com.car.backend.entities.UserSocietyId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSocietyRepository extends JpaRepository<UserSociety, UserSocietyId> {
    List<UserSociety> findAll();
    List<UserSociety> findByUserId(Integer userId);
    List<UserSociety> findBySocietyId(Integer societyId);
}