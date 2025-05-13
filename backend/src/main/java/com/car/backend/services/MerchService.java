package com.car.backend.services;

import com.car.backend.DTO.MerchDTO;
import com.car.backend.entities.Merch;
import com.car.backend.repositories.MerchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MerchService {

    @Autowired
    private MerchRepository repository;

    public List<MerchDTO> getMerchByName(String merchName) {
        return repository.findByMerchNameContainingIgnoreCase(merchName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MerchDTO> getMerchByType(String merchType) {
        return repository.findByMerchType(merchType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MerchDTO> getPurchaseableMerch() {
        return repository.findByMerchPurchaseableTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MerchDTO saveMerch(MerchDTO dto) {
        Merch entity = convertToEntity(dto);
        Merch savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    private MerchDTO convertToDTO(Merch entity) {
        MerchDTO dto = new MerchDTO();
        dto.setId(entity.getId());
        dto.setMerchName(entity.getMerchName());
        dto.setMerchDescription(entity.getMerchDescription());
        dto.setMerchPurchaseable(entity.getMerchPurchaseable());
        dto.setTotalUnits(entity.getTotalUnits());
        dto.setAvailableUnits(entity.getAvailableUnits());
        dto.setMerchType(entity.getMerchType());
        dto.setMerchSize(entity.getMerchSize());
        return dto;
    }

    private Merch convertToEntity(MerchDTO dto) {
        Merch entity = new Merch();
        entity.setId(dto.getId());
        entity.setMerchName(dto.getMerchName());
        entity.setMerchDescription(dto.getMerchDescription());
        entity.setMerchPurchaseable(dto.getMerchPurchaseable());
        entity.setTotalUnits(dto.getTotalUnits());
        entity.setAvailableUnits(dto.getAvailableUnits());
        entity.setMerchType(dto.getMerchType());
        entity.setMerchSize(dto.getMerchSize());
        return entity;
    }
}