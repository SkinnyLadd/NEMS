// This class is for the EventOrganizerId entity, which is used to represent the composite key for the EventOrganizer entity.

package com.car.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class EventOrganizerId implements Serializable {
    private static final long serialVersionUID = -1358909954772875645L;
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EventOrganizerId entity = (EventOrganizerId) o;
        return Objects.equals(this.eventId, entity.eventId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventId, userId);
    }

}