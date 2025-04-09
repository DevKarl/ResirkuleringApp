package com.example.demo.DTO;

import com.example.demo.Entities.Avfall;

public class GetAvfallByStrekkodeResponse {
  private Avfall avfall;

  public GetAvfallByStrekkodeResponse(Avfall avfall) {
    this.avfall = avfall;
  }

  public Avfall getAvfall() {
    return avfall;
  }

  public void setAvfall(Avfall avfall) {
    this.avfall = avfall;
  }
  
}
