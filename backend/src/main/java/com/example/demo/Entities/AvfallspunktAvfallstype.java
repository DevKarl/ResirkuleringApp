package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// @Entity
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



// @EmbeddedId
  // private AvfallspunktAvfallstypeId id;

  // @ManyToOne
  //   @JoinColumn(name = "avfallspunkt_id", insertable = false, updatable = false)
  //   private Avfallspunkt avfallspunkt;

  //   @ManyToOne
  //   @JoinColumn(name = "avfallstype_id", insertable = false, updatable = false)
  //   private AvfallsType avfallstype;
