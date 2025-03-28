package com.example.demo.DTO;

public class GetUserResponse {
  private String fornavn;
  private String etternavn;
  private String brukernavn;
  private Boolean isAdmin;
  private Boolean delerStat;

  public GetUserResponse(String fornavn, String etternavn, String brukernavn, Boolean isAdmin, Boolean delerStat) {
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
