package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Avfall {
  

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String strekKode;
  
  @ManyToOne
  @JoinColumn(name = "avfallstype_id")
  private AvfallsType avfallsType;

  public Avfall(){

  }

  public Avfall(String strekkode, AvfallsType type){
    this.strekKode = strekkode;
    this.avfallsType = type;
  }


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getStrekKode() {
    return this.strekKode;
  }

  public void setStrekKode(String strekKode) {
    this.strekKode = strekKode;
  }

  public AvfallsType getAvfallsType() {
    return this.avfallsType;
  }

  public void setAvfallsType(AvfallsType avfallsType) {
    this.avfallsType = avfallsType;
  }


}
