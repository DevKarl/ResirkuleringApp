package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AvfallsType {
  
  @Id
  private int id;
  private String type;
  

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

}
