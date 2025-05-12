package com.car.backend.entities.enums;

public enum School {
    SEECS("School of Electrical Engineering and Computer Science"),
    NBS("NUST Business School"),
    S3H("School of Social Sciences and Humanities"),
    SNS("School of Natural Sciences"),
    NICE("NUST Institute of Civil Engineering"),
    SADA("School of Art, Design and Architecture"),
    IGIS("Institute of Geographical Information Systems"),
    SCME("School of Chemical and Manufacturing Engineering"),
    SMME("School of Mechanical and Manufacturing Engineering"),
    IESE("Institute of Environmental Sciences and Engineering"),
    ASAB("Atta-ur-Rehman School of Applied Biosciences"),
    NSHS("NUST School of Health Sciences"),
    CAE("College of Aeronautical Engineering"),
    MCS("Military College of Signals"),
    CEME("College of Electrical and Mechanical Engineering");

    private final String School;

    School(String schoolName) {
        this.School = schoolName;
    }
    public String getSchool() {
        return School;
    }




}
