package com.car.backend.repositories;

import com.car.backend.entities.Merch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MerchRepository extends JpaRepository<Merch, Integer> {
    List<Merch> findByMerchNameContainingIgnoreCase(String merchName);
    List<Merch> findByMerchType(String merchType);
    List<Merch> findByMerchPurchaseableTrue();
}