package com.car.backend.entities;

import com.car.backend.entities.enums.MerchSize;
import com.car.backend.entities.enums.MerchType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "merch", schema = "nems")
public class Merch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.merch_merch_id_seq')")
    @Column(name = "merch_id", nullable = false)
    private Integer id;

    @Column(name = "merch_name", length = 100)
    private String merchName;

    @Column(name = "merch_description", length = Integer.MAX_VALUE)
    private String merchDescription;
    @ColumnDefault("true")
    @Column(name = "merch_purchaseable", nullable = false)
    private Boolean merchPurchaseable = false;

    @Column(name = "total_units", nullable = false)
    private Integer totalUnits;
    @Column(name = "available_units", nullable = false)
    private Integer availableUnits;

    @Column(name = "merch_type", columnDefinition = "merch_type_enum not null")
    @Enumerated(EnumType.STRING)
    private MerchType merchType;

    @Column(name = "merch_size", columnDefinition = "merch_size_enum not null")
    @Enumerated(EnumType.STRING)
    private MerchSize merchSize;
}