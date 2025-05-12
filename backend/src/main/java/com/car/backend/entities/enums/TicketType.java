package com.car.backend.entities.enums;

public enum TicketType {
    STANDARD("Standard"),
    VIP("VIP"),
    EARLY_BIRD("Early Bird");

    private final String TicketType;

    TicketType(String TicketType) {
        this.TicketType = TicketType;
    }

    public String getTicketType() {
        return TicketType;
    }
}
