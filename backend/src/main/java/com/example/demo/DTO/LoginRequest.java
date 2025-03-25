package com.example.demo.DTO;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

  @NotBlank(message = "Brukernavn må oppgis!")
  private String brukernavn;
  @NotBlank(message = "Passord må oppgis!")
  private String passord;

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
}
