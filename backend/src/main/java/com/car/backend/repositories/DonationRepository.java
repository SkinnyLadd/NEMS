package com.car.backend.repositories;

import com.car.backend.entities.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Integer> {
    List<Donation> findByUserId(Integer userId);
    List<Donation> findByEventId(Integer eventId);
}