package com.car.backend.entities.enums;

public enum MerchType {
    SHIRT("Shirt"),
    HOODIE("Hoodie"),
    MUG("Mug"),
    STICKER("Sticker"),
    PANTS("Pants"),
    CAP("Cap"),
    OTHER("Other");

    private final String merchType;
    MerchType(String merchType) {
        this.merchType = merchType;
    }

    public String getMerchType() {
        return merchType;
    }
}
