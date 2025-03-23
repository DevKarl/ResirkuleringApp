package com.example.demo.DTO;

public class BrukerDTO {
  private String fornavn;
  private String etternavn;
  private String brukernavn;
  private String passord;
  private boolean adminrettigheter;

//DataTransferObject som sendes fra frontend til backend. 
//Denne brukes til å kryptere passord, og deretter oppretter en Bruker som kan saves i databasen.
  public BrukerDTO(String fornavn, String etternavn, String brukernavn, String passord, boolean adminrettigheter) {
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.brukernavn = brukernavn;
    this.passord = passord;
    this.adminrettigheter = adminrettigheter;
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

  public boolean isAdminrettigheter() {
    return this.adminrettigheter;
  }

  public boolean getAdminrettigheter() {
    return this.adminrettigheter;
  }

  public void setAdminrettigheter(boolean adminrettigheter) {
    this.adminrettigheter = adminrettigheter;
  }




}
