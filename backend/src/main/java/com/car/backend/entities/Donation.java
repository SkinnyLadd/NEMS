package com.car.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "donations", schema = "nems")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.donations_donation_id_seq')")
    @Column(name = "donation_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

//    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "donated_at", nullable = false)
    private Instant donatedAt;

    @PrePersist
    protected void onCreate() {
        if (donatedAt == null) {
            donatedAt = Instant.now();
        }
    }


}