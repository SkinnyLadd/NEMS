package com.car.backend.entities.enums;

public enum PartRole {
    SOCIETY_MEMBER("Society Member"),
    EVENT_OC("Event OC"),
    PARTICIPANT("Participant");

    private final String role;

    PartRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
