package com.example.demo.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "resirkulering")
public class Resirkuleringslogg {
  
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;

@ManyToOne
@JoinColumn(name = "avfall_id")
private Avfall avfall;

@ManyToOne
@JoinColumn(name = "bruker_id")
private Bruker bruker;

@ManyToOne
@JoinColumn(name = "avfallspunkt_id")
private Avfallspunkt avfallspunkt;

private LocalDateTime tidspunktKastet;



public Resirkuleringslogg(){
//Standard konstruktør
}

public Resirkuleringslogg(Avfall avfall, Bruker bruker, Avfallspunkt avfallspunkt){
  this.avfall = avfall;
  this.bruker = bruker;
  this.avfallspunkt = avfallspunkt;
  this.tidspunktKastet = LocalDateTime.now();
}


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Avfall getAvfall() {
    return this.avfall;
  }

  public void setAvfall(Avfall avfall) {
    this.avfall = avfall;
  }

  public Bruker getBruker() {
    return this.bruker;
  }

  public void setBruker(Bruker bruker) {
    this.bruker = bruker;
  }

  public Avfallspunkt getAvfallspunkt() {
    return this.avfallspunkt;
  }

  public void setAvfallspunkt(Avfallspunkt avfallspunkt) {
    this.avfallspunkt = avfallspunkt;
  }

  public LocalDateTime getTidspunktKastet() {
    return this.tidspunktKastet;
  }

  public void setTidspunktKastet(LocalDateTime tidspunktKastet) {
    this.tidspunktKastet = tidspunktKastet;
  }




}
