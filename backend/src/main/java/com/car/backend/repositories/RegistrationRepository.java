package com.car.backend.repositories;

import com.car.backend.entities.Registration;
import com.car.backend.entities.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {

    Optional<Registration> findById(Integer id);
    List<Registration> findByUserId(Integer userId);
    List<Registration> findByEventId(Integer eventId);
    List<Registration> findByPaymentStatus(PaymentStatus paymentStatus);
}