package com.car.backend.entities;

import com.car.backend.entities.enums.PaymentStatus;
import com.car.backend.entities.enums.TicketType;
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
@Table(name = "registrations", schema = "nems")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.registrations_reg_id_seq')")
    @Column(name = "reg_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(name = "purchase_date", nullable = false)
    private LocalDate purchaseDate;


    @Column(name = "ticket_type", columnDefinition = "ticket_enum not null")
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;


    @Column(name = "payment_status", columnDefinition = "payment_status_enum not null")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'PENDING'")
    private PaymentStatus paymentStatus;


}