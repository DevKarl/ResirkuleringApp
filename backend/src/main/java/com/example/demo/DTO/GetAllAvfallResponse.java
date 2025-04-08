package com.example.demo.DTO;

import java.util.List;

import com.example.demo.Entities.Avfall;

public class GetAllAvfallResponse {

  List<Avfall> avfall;

  public List<Avfall> getAvfall() {
    return avfall;
  }

  public GetAllAvfallResponse(List<Avfall> avfall) {
    this.avfall = avfall;
  }

  public void setAvfall(List<Avfall> avfall) {
    this.avfall = avfall;
  }
  
}
