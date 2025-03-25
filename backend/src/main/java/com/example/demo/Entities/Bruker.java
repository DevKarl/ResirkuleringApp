package com.example.demo.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema = "resirkulering")
public class Bruker {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fornavn;
    private String etternavn;

    @Column(nullable = false, unique = true)
    private String brukernavn;

    private String hash;
    private String salt;

    private boolean adminrettigheter;

    public Bruker(){

    }


  public Bruker(int id, String fornavn, String etternavn,String brukernavn,String hash, String salt) {
    this.id = id;
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.brukernavn = brukernavn;
    this.hash = hash;
    this.salt = salt;
    this.adminrettigheter = false;
  }


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
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

  public String getHash() {
    return this.hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  public String getSalt() {
    return this.salt;
  }

  public void setSalt(String salt) {
    this.salt = salt;
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
