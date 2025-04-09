package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Avfallspunkt_avfallstype", schema = "resirkulering")
public class AvfallspunktAvfallstype {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "avfallspunkt_id", nullable = false)
  private Avfallspunkt avfallspunkt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JsonManagedReference
  @JoinColumn(name = "avfallstype_id", nullable = false)
  private AvfallsType avfallstype;

}
