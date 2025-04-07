package com.example.demo.DTO;

public class LoginResponse {
  private int id;
  private String fornavn;
  private String etternavn;
  private String brukernavn;
  private Boolean isAdmin;
  private Boolean delerStat;

  private String message;

  public LoginResponse(int id, String message, String fornavn, String etternavn, String brukernavn, Boolean isAdmin, Boolean delerStat) {
    this.id = id;
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.brukernavn = brukernavn;
    this.message = message;
    this.isAdmin = isAdmin;
    this.delerStat = delerStat;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
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

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Boolean getIsAdmin() {
    return isAdmin;
  }

  public void setIsAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public Boolean getDelerStat() {
    return delerStat;
  }

  public void setDelerStat(Boolean delerStat) {
    this.delerStat = delerStat;
  }
}
