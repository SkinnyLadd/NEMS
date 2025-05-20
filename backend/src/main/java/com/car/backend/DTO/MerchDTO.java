package com.car.backend.DTO;

import com.car.backend.entities.enums.MerchSize;
import com.car.backend.entities.enums.MerchType;
import lombok.Data;

@Data
public class MerchDTO {
    private Integer id;
    private String merchName;
    private String merchDescription;
    private Boolean merchPurchaseable;
    private Integer totalUnits;
    private Integer availableUnits;
    private MerchType merchType;
    private MerchSize merchSize;

    private EventDTO eventDTO;

}