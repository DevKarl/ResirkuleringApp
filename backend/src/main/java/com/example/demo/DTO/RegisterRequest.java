package com.example.demo.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

  @NotBlank(message = "Fornavn må oppgis")
  private String fornavn;
  @NotBlank(message = "Etternavn må oppgis")
  private String etternavn;
  @NotBlank(message = "Brukernavn må oppgis")
  @Size(min = 5, max = 20, message = "Brukernavn må være mellom 5 og 20 tegn")
  private String brukernavn;
  @NotBlank(message = "Passord må oppgis")
  @Size(min = 8, message = "Passord må være minst 8 tegn langt")
  private String passord;

  public RegisterRequest(String fornavn, String etternavn, String brukernavn, String passord, boolean adminrettigheter) {
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.brukernavn = brukernavn;
    this.passord = passord;
  }

  public String getFornavn() {
    return this.fornavn;
  }

  public void setFornavn(String fornavn) {
    this.fornavn = fornavn;
  }

  public String getEtternavn() {
    return this.etternavn;
  }

  public void setEtternavn(String etternavn) {
    this.etternavn = etternavn;
  }

  public String getBrukernavn() {
    return this.brukernavn;
  }

  public void setBrukernavn(String brukernavn) {
    this.brukernavn = brukernavn;
  }

  public String getPassord() {
    return this.passord;
  }

  public void setPassord(String passord) {
    this.passord = passord;
  }

}
