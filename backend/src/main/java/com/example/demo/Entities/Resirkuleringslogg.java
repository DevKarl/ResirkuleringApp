package com.example.demo.Entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
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

@Column(name = "tidspunktkastet")
private LocalDate tidspunktKastet;



public Resirkuleringslogg(){
//Standard konstruktør
}

public Resirkuleringslogg(Avfall avfall, Bruker bruker, Avfallspunkt avfallspunkt, LocalDate dato){
  this.avfall = avfall;
  this.bruker = bruker;
  this.avfallspunkt = avfallspunkt;
  this.tidspunktKastet = dato;
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

  public LocalDate getTidspunktKastet() {
    return this.tidspunktKastet;
  }

  public void setTidspunktKastet(LocalDate tidspunktKastet) {
    this.tidspunktKastet = tidspunktKastet;
  }




}
