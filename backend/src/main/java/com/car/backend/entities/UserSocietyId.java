package com.car.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserSocietyId implements Serializable {
    private static final long serialVersionUID = 3125998189711579641L;
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "society_id", nullable = false)
    private Integer societyId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserSocietyId entity = (UserSocietyId) o;
        return Objects.equals(this.societyId, entity.societyId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(societyId, userId);
    }

}