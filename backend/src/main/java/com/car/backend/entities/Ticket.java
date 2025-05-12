package com.car.backend.entities;

import com.car.backend.entities.enums.TicketType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "tickets", schema = "nems")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.tickets_ticket_id_seq')")
    @Column(name = "ticket_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(name = "available_tickets", nullable = false)
    private Integer availableTickets;


    @Column(name = "ticket_type", columnDefinition = "ticket_enum not null")
    @ColumnDefault("'STANDARD'")
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

}