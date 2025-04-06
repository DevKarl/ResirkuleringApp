package com.example.demo.DTO;

import java.util.List;

import com.example.demo.Entities.Bruker;
import com.example.demo.Entities.Resirkuleringslogg;

public class SharedStatsResponse {
  private Bruker bruker;
  private List<Resirkuleringslogg> logg;

  public SharedStatsResponse(Bruker bruker, List<Resirkuleringslogg> logg) {
    this.bruker = bruker;
    this.logg = logg;
  }

  public Bruker getBruker() {
    return bruker;
  } 

  public void setBruker(Bruker bruker) {
    this.bruker = bruker;
  }

  public List<Resirkuleringslogg> getAvfallslogg() {
    return logg;
  }

  public void setAvfallslogg(List<Resirkuleringslogg> logg) {
    this.logg = logg;
  }
  
}
