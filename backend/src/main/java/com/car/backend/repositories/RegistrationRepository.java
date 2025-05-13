package com.car.backend.repositories;

import com.car.backend.entities.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
    List<Registration> findByUserId(Integer userId);
    List<Registration> findByEventId(Integer eventId);
    List<Registration> findByPaymentStatus(String paymentStatus);
}