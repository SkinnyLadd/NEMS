package com.car.backend.entities.enums;

public enum PaymentStatus {
    PENDING("Pending"),
    PAID("Paid"),
    CANCELLED("Cancelled");

    private final String status;

    PaymentStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
