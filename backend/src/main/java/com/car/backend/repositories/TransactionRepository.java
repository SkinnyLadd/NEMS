package com.car.backend.repositories;

import com.car.backend.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserId(Integer userId);
    List<Transaction> findByTransType(String transType);
    List<Transaction> findByPaymentMethod(String paymentMethod);
}