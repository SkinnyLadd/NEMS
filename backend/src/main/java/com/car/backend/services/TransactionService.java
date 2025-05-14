package com.car.backend.services;

import com.car.backend.DTO.TransactionDTO;
import com.car.backend.entities.Transaction;
import com.car.backend.entities.enums.PaymentMethod;
import com.car.backend.entities.enums.TransType;
import com.car.backend.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<TransactionDTO> getTransactionsByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByTransType(String transType) {
        return repository.findByTransType(TransType.valueOf(transType)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByPaymentMethod(String paymentMethod) {
        return repository.findByPaymentMethod(PaymentMethod.valueOf(paymentMethod)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TransactionDTO saveTransaction(TransactionDTO dto) {
        Transaction entity = convertToEntity(dto);
        Transaction savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private TransactionDTO convertToDTO(Transaction entity) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setTransDate(entity.getTransDate());
        dto.setAmount(entity.getAmount());
        dto.setTransType(entity.getTransType());
        dto.setPaymentMethod(entity.getPaymentMethod());
        return dto;
    }

    private Transaction convertToEntity(TransactionDTO dto) {
        Transaction entity = new Transaction();
        entity.setId(dto.getId());
        // Set user entity as needed
        entity.setTransDate(dto.getTransDate());
        entity.setAmount(dto.getAmount());
        entity.setTransType(dto.getTransType());
        entity.setPaymentMethod(dto.getPaymentMethod());
        return entity;
    }
}