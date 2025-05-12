package com.car.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "modules", schema = "nems")
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.modules_module_id_seq')")
    @Column(name = "module_id", nullable = false)
    private Integer id;

    @Column(name = "description", nullable = false, length = 500)
    private String description;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "venue", length = 100)
    private String venue;

}