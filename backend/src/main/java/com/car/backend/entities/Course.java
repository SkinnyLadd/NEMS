package com.car.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

import com.car.backend.entities.enums.School;

@Getter
@Setter
@Entity
@Table(name = "courses", schema = "nems", uniqueConstraints = {
        @UniqueConstraint(name = "unique_course_per_level", columnNames = {"school", "level", "course_code"}),
        @UniqueConstraint(name = "courses_course_code_key", columnNames = {"course_code"})
})
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.courses_course_id_seq')")
    @Column(name = "course_id", nullable = false)
    private Integer id;


    @Column(name = "course_name", nullable = false, length = Integer.MAX_VALUE)
    private String courseName;


    @OneToMany(mappedBy = "course")
    private Set<User> users = new LinkedHashSet<>();

    @Column(name = "school", columnDefinition = "school_enum")
    @Enumerated(EnumType.STRING)
    private School school;

}