package com.example.demo.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @JsonIgnore
    private String hash;
    @JsonIgnore
    private String salt;

    private boolean adminrettigheter;
    private boolean delerstat;

    public Bruker() {

    }

  public Bruker(String fornavn, String etternavn,String brukernavn,String hash, String salt) {
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.brukernavn = brukernavn;
    this.hash = hash;
    this.salt = salt;
    this.adminrettigheter = false;
    this.delerstat = false;
  }

  public boolean isDelerstat() {
    return delerstat;
  }

  public void setDelerStat(boolean delerstat) {
    this.delerstat = delerstat;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
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

  @JsonIgnore
  public String getHash() {
    return this.hash;
  }

  @JsonIgnore
  public void setHash(String hash) {
    this.hash = hash;
  }

  @JsonIgnore
  public String getSalt() {
    return this.salt;
  }

  @JsonIgnore
  public void setSalt(String salt) {
    this.salt = salt;
  }

  public boolean isAdminrettigheter() {
    return adminrettigheter;
  }

  public void setAdminrettigheter(boolean adminrettigheter) {
    this.adminrettigheter = adminrettigheter;
  }
    
}
