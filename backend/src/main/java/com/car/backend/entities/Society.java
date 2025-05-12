package com.car.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "societies", schema = "nems")
public class Society {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.societies_society_id_seq')")
    @Column(name = "society_id", nullable = false)
    private Integer id;

    @Column(name = "soc_name", nullable = false, length = 100)
    private String socName;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @OneToMany(mappedBy = "society")
    private Set<Event> events = new LinkedHashSet<>();

    @OneToMany(mappedBy = "society")
    private Set<SocietyMemberApplication> societyMemberApplications = new LinkedHashSet<>();


    @OneToMany(mappedBy = "society")
    private Set<UserSociety> userSocieties = new LinkedHashSet<>();

}