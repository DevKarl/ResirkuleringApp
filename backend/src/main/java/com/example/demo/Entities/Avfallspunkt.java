package com.example.demo.Entities;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(schema = "resirkulering")
public class Avfallspunkt {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String longitude;
  private String latitude;

  @ManyToMany
  @JoinTable(
    name = "Avfallspunkt_avfallstype",
    joinColumns = @JoinColumn(name = "avfallspunkt_id"),
    inverseJoinColumns = @JoinColumn(name = "avfallstype_id")
  )
  private Set<AvfallsType> avfallstyper;
}
