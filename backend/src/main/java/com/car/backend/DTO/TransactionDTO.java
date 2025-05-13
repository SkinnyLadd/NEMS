package com.car.backend.DTO;

import com.car.backend.entities.enums.PaymentMethod;
import com.car.backend.entities.enums.TransType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDTO {
    private Integer id;
    private Integer userId;
    private LocalDate transDate;
    private Integer amount;
    private TransType transType;
    private PaymentMethod paymentMethod;
}