package com.car.backend.entities.enums;

public enum AppStatus {
    PENDING("Pending"),
    APPROVED("Approved"),
    REJECTED("Rejected");

    private final String status;

    AppStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
