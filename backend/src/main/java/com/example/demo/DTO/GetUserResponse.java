package com.example.demo.DTO;

public class GetUserResponse {
  private String fornavn;
  private String etternavn;
  private String brukernavn;
  private boolean isAdmin;
  private boolean delerStat;

  public GetUserResponse(String fornavn, String etternavn, String brukernavn, boolean isAdmin, boolean delerStat) {
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.brukernavn = brukernavn;
    this.isAdmin = isAdmin;
    this.delerStat = delerStat;
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

  public boolean getIsAdmin() {
    return isAdmin;
  }

  public void setIsAdmin(boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public boolean getDelerStat() {
    return delerStat;
  }

  public void setDelerStat(boolean delerStat) {
    this.delerStat = delerStat;
  }
}
