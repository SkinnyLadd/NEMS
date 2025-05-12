package com.car.backend.entities;

import com.car.backend.entities.enums.AppTemplate;
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
@Table(name = "application_templates", schema = "nems")
public class ApplicationTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.application_templates_template_id_seq')")
    @Column(name = "template_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "template")
    private Set<Application> applications = new LinkedHashSet<>();
    @OneToMany(mappedBy = "template")
    private Set<QuestionTemplate> questionTemplates = new LinkedHashSet<>();

    @Column(name = "template_type", columnDefinition = "template_enum not null")
    @Enumerated(EnumType.STRING)
    private AppTemplate template;
}