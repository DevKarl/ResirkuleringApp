package com.example.demo.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegisterRequest {

  @NotBlank(message = "Fornavn må oppgis")
  @Size(min = 1, max = 20, message = "Fornavn må være mellom 1 og 20 tegn")
  private String fornavn;
  @NotBlank(message = "Etternavn må oppgis")
  @Size(min = 1, max = 20, message = "Etternavn må være mellom 1 og 20 tegn")
  private String etternavn;
  @NotBlank(message = "Brukernavn må oppgis")
  @Size(min = 5, max = 20, message = "Brukernavn må være mellom 5 og 20 tegn")
  private String brukernavn;
  @NotBlank(message = "Passord må oppgis")
  @Size(min = 5, max = 20, message = "Passord må være mellom 5 og 20 tegn")
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
