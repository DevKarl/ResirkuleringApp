package com.example.demo.Entities;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class AvfallsType {
  
  @Id
  private int id;
  private String type;

  @ManyToMany (mappedBy = "avfallstype")
  private Set<Avfallspunkt> avfallsPunkter;
  

  public AvfallsType(){
    //Standard
  }

  public AvfallsType(int id, String type){
    this.id = id;
    this.type = type;
  }


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getType() {
    return this.type;
  }

  public void setType(String type) {
    this.type = type;
  }


  public Set<Avfallspunkt> getAvfallsPunkter() {
    return this.avfallsPunkter;
  }

  public void setAvfallsPunkter(Set<Avfallspunkt> avfallsPunkter) {
    this.avfallsPunkter = avfallsPunkter;
  }


}
