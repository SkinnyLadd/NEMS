package com.car.backend.entities.enums;

public enum Batch {
    //rich enum
    FRESHMAN("Freshman"),
    SOPHOMORE("Sophomore"),
    JUNIOR("Junior"),
    SENIOR("Senior"),
    ALUMNI("Alumni");

    private final String batch;
    Batch(String batch) {
        this.batch = batch;
    }
    public String getBatch() {
        return batch;
    }

}
