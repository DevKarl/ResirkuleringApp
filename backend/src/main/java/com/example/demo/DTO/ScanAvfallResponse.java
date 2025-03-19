package com.example.demo.DTO;

import java.util.List;

import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.Avfallspunkt;

public class ScanAvfallResponse {
  private Avfall avfall;
  private List<Avfallspunkt> avfallspunkter;

  public ScanAvfallResponse(Avfall avfall, List<Avfallspunkt> avfallspunkter) {
      this.avfall = avfall;
      this.avfallspunkter = avfallspunkter;
  }

  public Avfall getAvfall() {
      return avfall;
  }

  public List<Avfallspunkt> getAvfallspunkter() {
      return avfallspunkter;
  }
}

  

