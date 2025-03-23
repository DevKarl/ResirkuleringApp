package com.example.demo.DTO;

public class LoginRequest {
    private String epost;
    private String passord;

    public LoginRequest() {
    }

    public LoginRequest(String epost, String passord) {
        this.epost = epost;
        this.passord = passord;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public String getPassord() {
        return passord;
    }

    public void setPassord(String passord) {
        this.passord = passord;
    }
}
