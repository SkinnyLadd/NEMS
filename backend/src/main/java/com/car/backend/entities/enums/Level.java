package com.car.backend.entities.enums;

public enum Level {
    UG("Undergraduate"),
    PG("Postgraduate"),
    PHD("PhD");

    private final String level;
    Level (String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }
}
