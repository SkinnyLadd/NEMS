package com.car.backend.entities.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Batch {
    FRESHMAN,
    SOPHOMORE,
    JUNIOR,
    SENIOR,
    ALUMNI;

    @JsonCreator
    public static Batch fromString(String key) {
        return key == null ? null : Batch.valueOf(key.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}
