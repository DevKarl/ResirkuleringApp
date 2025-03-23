package com.example.demo.DTO;

public class LoginRequest {
    private String brukernavn;
    private String passord;

    public LoginRequest() {
    }

    public LoginRequest(String brukernavn, String passord) {
        this.brukernavn = brukernavn;
        this.passord = passord;
    }

    public String getBrukernavn() {
        return brukernavn;
    }

    public void setBrukernavn(String brukernavn) {
        this.brukernavn = brukernavn;
    }

    public String getPassord() {
        return passord;
    }

    public void setPassord(String passord) {
        this.passord = passord;
    }
}
