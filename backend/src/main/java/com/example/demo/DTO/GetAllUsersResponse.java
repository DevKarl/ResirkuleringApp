package com.example.demo.DTO;

import java.util.List;

import com.example.demo.Entities.Bruker;

public class GetAllUsersResponse {
  private List<Bruker> brukere;

  public GetAllUsersResponse(List<Bruker> brukere) {
    this.brukere = brukere;
  }

  public List<Bruker> getBrukere() {
    return brukere;
  }

  public void setBrukere(List<Bruker> brukere) {
    this.brukere = brukere;
  }  
}
