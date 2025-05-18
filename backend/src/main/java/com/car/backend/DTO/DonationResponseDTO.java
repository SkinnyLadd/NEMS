package com.car.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DonationResponseDTO {
    private Integer id;
    private Donor donor;
    private Event event;
    private Double amount;
    private String date; // ISO string
    // private String message; // if applicable

    @Data
    @AllArgsConstructor
    public static class Donor {
        private String name;
        private String regNo;
        private String type; // "student" or "other"
    }

    @Data
    @AllArgsConstructor
    public static class Event {
        private Integer id;
        private String name;
        private String society;
    }
}
