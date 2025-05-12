package com.car.backend.entities.enums;

public enum PaymentMethod {
    CASH("Cash"),
    BANK_TRANSFER("Bank Transfer"),
    CREDIT_CARD("Credit Card"),
    EASYPAISA("EasyPaisa"),
    JAZZ_CASH("JazzCash"),
    NAYAPAY("NayaPay"),
    SADAPAY("SadaPay");

    private final String PaymentMethod;

    PaymentMethod(String PaymentMethod) {
        this.PaymentMethod = PaymentMethod;
    }

    public String getPaymentMethod() {
        return PaymentMethod;
    }

}
