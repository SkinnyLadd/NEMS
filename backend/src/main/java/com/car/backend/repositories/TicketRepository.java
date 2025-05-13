package com.car.backend.repositories;

import com.car.backend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByEventId(Integer eventId);
    List<Ticket> findByTicketType(String ticketType);
}