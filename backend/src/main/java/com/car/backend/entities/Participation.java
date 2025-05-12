package com.car.backend.entities;

import com.car.backend.entities.enums.PartRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "participations", schema = "nems")
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('nems.participations_part_id_seq')")
    @Column(name = "part_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "part_custom_role", length = 50)
    private String partCustomRole;
    @Column(name = "part_details", length = Integer.MAX_VALUE)
    private String partDetails;

    @Column(name= "part_role", columnDefinition = "part_role_enum not null")
    @Enumerated(EnumType.STRING)
    private PartRole partRole;
}