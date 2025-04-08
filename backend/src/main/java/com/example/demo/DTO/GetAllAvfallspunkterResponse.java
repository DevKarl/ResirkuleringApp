package com.example.demo.DTO;
import com.example.demo.Entities.Avfallspunkt;
import java.util.List;

public class GetAllAvfallspunkterResponse {

  private List<Avfallspunkt> avfallsPunkter;


  public GetAllAvfallspunkterResponse(List<Avfallspunkt> avfallsPunkter) {
    this.avfallsPunkter = avfallsPunkter;
  }

  public void setAvfallsPunkter(List<Avfallspunkt> avfallsPunkter) {
    this.avfallsPunkter = avfallsPunkter;
  }

  public List<Avfallspunkt> getAvfallsPunkter() {
    return avfallsPunkter;
  }
  
}
