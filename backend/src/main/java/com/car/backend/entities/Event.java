package com.car.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "events", schema = "nems")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.events_event_id_seq')")
    @Column(name = "event_id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "society_id", nullable = false)
    private Society society;

    @OneToMany(mappedBy = "event")
    private Set<Donation> donations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "event")
    private Set<EventOCApplication> eventOcApplications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "event")
    private Set<EventOrganizer> eventOrganizers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "event")
    private Set<ParticipationApplication> participationApplications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "event")
    private Set<Registration> registrations = new LinkedHashSet<>();


    @OneToMany(mappedBy = "event")
    private Set<Ticket> tickets = new LinkedHashSet<>();

}