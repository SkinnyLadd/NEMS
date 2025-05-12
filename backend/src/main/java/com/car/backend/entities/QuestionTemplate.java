package com.car.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "question_templates", schema = "nems")
public class QuestionTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.question_templates_question_id_seq')")
    @Column(name = "question_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "template_id", nullable = false)
    private ApplicationTemplate template;

    @Column(name = "question_text", nullable = false, length = Integer.MAX_VALUE)
    private String questionText;

    @ColumnDefault("1")
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @OneToMany(mappedBy = "question")
    private Set<ApplicationAnswer> applicationAnswers = new LinkedHashSet<>();

}