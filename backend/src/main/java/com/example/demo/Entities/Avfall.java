package com.example.demo.Entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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


  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
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
