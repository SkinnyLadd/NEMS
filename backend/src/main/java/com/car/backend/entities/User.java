package com.car.backend.entities;

import com.car.backend.entities.enums.Batch;
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
@Table(name = "users", schema = "nems", uniqueConstraints = {
        @UniqueConstraint(name = "users_email_key", columnNames = {"email"})
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.users_user_id_seq')")
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "cms", nullable = false)
    private Long cms;

    @Column(name = "role", nullable = false, length = 30)
    private String role;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "createdBy")
    private Set<ApplicationTemplate> applicationTemplates = new LinkedHashSet<>();

    @OneToMany(mappedBy = "applicant")
    private Set<Application> applications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Donation> donations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<EventOrganizer> eventOrganizers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Participation> participations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Registration> registrations = new LinkedHashSet<>();


    @OneToMany(mappedBy = "user")
    private Set<Transaction> transactions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<UserSociety> userSocieties = new LinkedHashSet<>();
    @OneToMany(mappedBy = "user")
    private Set<Volunteer> volunteers = new LinkedHashSet<>();


    @Column(name = "batch", columnDefinition = "batch_enum not null")
    @Enumerated(EnumType.STRING)
    private Batch batch;



}