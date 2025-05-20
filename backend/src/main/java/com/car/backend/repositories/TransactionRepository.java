package com.car.backend.repositories;

import com.car.backend.entities.Transaction;
import com.car.backend.entities.enums.PaymentMethod;
import com.car.backend.entities.enums.TransType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    Optional <Transaction> findById(Integer id);
    List<Transaction> findByUserId(Integer userId);
    List<Transaction> findByTransType(TransType transType);
    List<Transaction> findByPaymentMethod(PaymentMethod paymentMethod);
}