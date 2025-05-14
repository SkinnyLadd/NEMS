package com.car.backend.repositories;

import com.car.backend.entities.Transaction;
import com.car.backend.entities.enums.PaymentMethod;
import com.car.backend.entities.enums.TransType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserId(Integer userId);
    List<Transaction> findByTransType(TransType transType);
    List<Transaction> findByPaymentMethod(PaymentMethod paymentMethod);
}