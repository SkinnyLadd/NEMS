package com.car.backend.services;

import com.car.backend.DTO.TransactionDTO;
import com.car.backend.entities.Donation;
import com.car.backend.entities.Merch;
import com.car.backend.entities.Registration;
import com.car.backend.entities.Transaction;
import com.car.backend.entities.enums.PaymentMethod;
import com.car.backend.entities.enums.TransType;
import com.car.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;
    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private MerchRepository merchRepository;
    @Autowired
    private DonationRepository donationRepository;
    @Autowired
    private UserRepository userRepository;

    // Use toDTO() for all conversions to ensure full data fields are set
    public List<TransactionDTO> getAllTransactions() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByUserId(Integer userId) {
        return repository.findByUserId(userId).stream()
                .map(this::toDTO)  // changed here
                .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByTransType(String transType) {
        return repository.findByTransType(TransType.valueOf(transType)).stream()
                .map(this::toDTO)  // changed here
                .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByPaymentMethod(String paymentMethod) {
        return repository.findByPaymentMethod(PaymentMethod.valueOf(paymentMethod)).stream()
                .map(this::toDTO)  // changed here
                .collect(Collectors.toList());
    }

    public TransactionDTO saveTransaction(TransactionDTO dto) {
        Transaction entity = convertToEntity(dto);
        Transaction savedEntity = repository.save(entity);
        return toDTO(savedEntity);  // use toDTO here as well for consistency
    }

    // Main conversion to DTO with detailed fields
    private TransactionDTO toDTO(Transaction tx) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(tx.getId());
        dto.setTransDate(tx.getTransDate());
        dto.setStatus(tx.getTransType().name());  // status = transType name (maybe not ideal)
        dto.setPrice(tx.getAmount());
        dto.setQuantity(1); // default
        dto.setItem("Unknown");
        dto.setMajorEvent("N/A");
        dto.setType("general");

        if (tx.getReferenceType() == null || tx.getReferenceId() == null) {
            return dto;
        }

        switch (tx.getReferenceType().toUpperCase()) {
            case "REGISTRATION" -> {
                Registration reg = registrationRepository.findById(tx.getReferenceId()).orElse(null);
                if (reg != null) {
                    dto.setItem(reg.getTicketType().toString());
                    dto.setMajorEvent(reg.getEvent() != null ? reg.getEvent().getTitle() : "Unknown Event");
                    dto.setType("event");
                    dto.setQuantity(1);
                }
            }
            case "MERCH" -> {
                Merch merch = merchRepository.findById(tx.getReferenceId()).orElse(null);
                if (merch != null) {
                    dto.setItem(merch.getMerchName());
                    dto.setMajorEvent(merch.getEvent() != null ? merch.getEvent().getTitle() : "General");
                    dto.setType("merchandise");
                    dto.setQuantity(1); // or actual quantity if you store it
                }
            }
            case "DONATION" -> {
                Donation donation = donationRepository.findById(tx.getReferenceId()).orElse(null);
                if (donation != null) {
                    dto.setItem("Donation");
                    dto.setMajorEvent(donation.getEvent() != null ? donation.getEvent().getTitle() : "General");
                    dto.setType("donation");
                }
            }
            default -> {
                dto.setItem("Unknown");
                dto.setType("general");
            }
        }

        // You can also set status to something better if you have it in the transaction
        dto.setStatus(tx.getTransType().name().toLowerCase());

        return dto;
    }


    // Basic conversion to entity for saving, fill user and references as needed
    private Transaction convertToEntity(TransactionDTO dto) {
        Transaction entity = new Transaction();
        entity.setId(dto.getId());
        entity.setUser(userRepository.findById(dto.getUserId()).orElse(null));
        entity.setTransDate(dto.getTransDate());
        entity.setAmount(dto.getAmount());
        entity.setTransType(dto.getTransType());
        entity.setPaymentMethod(dto.getPaymentMethod());
        return entity;
    }
}
