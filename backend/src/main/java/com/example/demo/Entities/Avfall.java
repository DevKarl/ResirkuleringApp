package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "avfall", schema = "resirkulering")
public class Avfall {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String strekkode;
  private String navn;
  private String beskrivelse;
  
  
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "avfallstype_id", nullable = false)
  private AvfallsType avfallsType;

  public Avfall(){

  }

  public Avfall(String strekkode, AvfallsType type){
    this.strekkode = strekkode;
    this.avfallsType = type;
  }


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getStrekKode() {
    return this.strekkode;
  }

  public void setStrekKode(String strekKode) {
    this.strekkode = strekKode;
  }

  public AvfallsType getAvfallsType() {
    return this.avfallsType;
  }

  public void setAvfallsType(AvfallsType avfallsType) {
    this.avfallsType = avfallsType;
  }

  public String getNavn() {
    return this.navn;
  }

  public void setNavn(String navn) {
    this.navn = navn;
  }

  public String getBeskrivelse() {
    return this.beskrivelse;
  }

  public void setBeskrivelse(String beskrivelse) {
    this.beskrivelse = beskrivelse;
  }


}
