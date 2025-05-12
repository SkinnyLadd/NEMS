package com.car.backend.entities.enums;

public enum TransType {
    DONATION("Donation"),
    PURCHASE("Purchase"),
    REFUND("Refund");

    private final String TransType;

    TransType(String TransType) {
        this.TransType = TransType;
    }
    public String getTransType() {
        return TransType;
    }
}
