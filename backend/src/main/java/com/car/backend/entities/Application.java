package com.car.backend.entities;

import com.car.backend.entities.enums.AppStatus;
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
@Table(name = "applications", schema = "nems")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.applications_application_id_seq')")
    @Column(name = "application_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "template_id", nullable = false)
    private ApplicationTemplate template;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "application")
    private Set<ApplicationAnswer> applicationAnswers = new LinkedHashSet<>();

    /* JPA does not support multiple inheritance, so we cannot have multiple OneToOne relationships with the same entity.
    @OneToOne
    private EventOCApplication eventOcApplication;

    @OneToOne
    private ParticipationApplication participationApplication;
    @OneToOne
    private SocietyMemberApplication societyMemberApplication;
     */

    @Column(name = "status", columnDefinition = "app_status_enum not null")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'PENDING'")
    private AppStatus status;
}