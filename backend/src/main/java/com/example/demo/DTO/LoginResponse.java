package com.example.demo.DTO;

public class LoginResponse {
  private String fornavn;
  private String etternavn;
  private String brukernavn;

  public LoginResponse(String fornavn, String etternavn, String brukernavn) {
      this.fornavn = fornavn;
      this.etternavn = etternavn;
      this.brukernavn = brukernavn;
  }

  public String getFornavn() {
      return fornavn;
  }

  public void setFornavn(String fornavn) {
      this.fornavn = fornavn;
  }

  public String getEtternavn() {
      return etternavn;
  }

  public void setEtternavn(String etternavn) {
      this.etternavn = etternavn;
  }

  public String getBrukernavn() {
      return brukernavn;
  }

  public void setBrukernavn(String brukernavn) {
      this.brukernavn = brukernavn;
  }
}
