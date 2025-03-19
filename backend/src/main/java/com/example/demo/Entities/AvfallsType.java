package com.example.demo.Entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "avfallstype", schema = "resirkulering")
public class AvfallsType {
  
  @Id
  private Integer id;
  private String type;

  @JsonIgnore
  @ManyToMany (mappedBy = "avfallstyper")
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

  // public void setAvfallsPunkter(Set<Avfallspunkt> avfallsPunkter) {
  //   this.avfallsPunkter = avfallsPunkter;
  // }


}
