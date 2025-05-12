package com.car.backend.entities;

import com.car.backend.entities.enums.PaymentMethod;
import com.car.backend.entities.enums.TransType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "transactions", schema = "nems")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.transactions_trans_id_seq')")
    @Column(name = "trans_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "trans_date", nullable = false)
    private LocalDate transDate;

    @Column(name = "amount", nullable = false)
    private Integer amount;


    @Column(name = "trans_type", columnDefinition = "trans_type_enum not null")
    @Enumerated(EnumType.STRING)
    private TransType transType;


    @Column(name = "payment_method", columnDefinition = "payment_method_enum not null")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

}