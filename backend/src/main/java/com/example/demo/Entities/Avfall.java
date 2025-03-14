package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Avfall {
  

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String strekKode;
  //many to one
  private AvfallsType avfallsType;


  public Avfall(String strekkode, AvfallsType type){
    this.strekKode = strekkode;
    this.avfallsType = type;
  }

}
