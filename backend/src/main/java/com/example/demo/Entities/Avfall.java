package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "resirkulering")
public class Avfall {
  

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String strekkode;
  
  @ManyToOne
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


}
