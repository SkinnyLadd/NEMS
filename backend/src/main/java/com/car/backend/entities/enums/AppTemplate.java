package com.car.backend.entities.enums;

public enum AppTemplate {
    SOCIETY_MEMBER("Society Member"),
    EVENT_OC("Event OC"),
    PARTICIPATION("Participation");

    private final String template;

    AppTemplate(String template) {
        this.template = template;
    }

    public String getTemplate() {
        return template;
    }
}
