package com.example.demo.Entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "avfallstype", schema = "resirkulering")
public class AvfallsType {
  
  @Id
  private Integer id;
  private String type;

  @JsonIgnore
  @OneToMany(mappedBy = "avfallstype", fetch = FetchType.EAGER)
  private Set<AvfallspunktAvfallstype> avfallspunktAvfallstyper;


  //@JsonIgnore
  //@ManyToMany (mappedBy = "avfallstyper", fetch = FetchType.EAGER)
  //private Set<Avfallspunkt> avfallsPunkter;
  

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


  public Set<AvfallspunktAvfallstype> getAvfallspunktAvfallstyper() {
    return this.avfallspunktAvfallstyper;
  }

  public void setAvfallspunktAvfallstyper(Set<AvfallspunktAvfallstype> avfallspunktAvfallstyper) {
    this.avfallspunktAvfallstyper = avfallspunktAvfallstyper;
  }



}
