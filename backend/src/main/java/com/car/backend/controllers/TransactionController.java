package com.car.backend.controllers;

import com.car.backend.DTO.TransactionDTO;
import com.car.backend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public List<TransactionDTO> getAllTransactions() {
        return service.getAllTransactions();
    }

    @GetMapping("/user/{userId}")
    public List<TransactionDTO> getTransactionsByUserId(@PathVariable Integer userId) {
        return service.getTransactionsByUserId(userId);
    }

    @GetMapping("/type")
    public List<TransactionDTO> getTransactionsByTransType(@RequestParam String transType) {
        return service.getTransactionsByTransType(transType);
    }

    @GetMapping("/payment-method")
    public List<TransactionDTO> getTransactionsByPaymentMethod(@RequestParam String paymentMethod) {
        return service.getTransactionsByPaymentMethod(paymentMethod);
    }

    @PostMapping
    public TransactionDTO saveTransaction(@RequestBody TransactionDTO dto) {
        return service.saveTransaction(dto);
    }
}
