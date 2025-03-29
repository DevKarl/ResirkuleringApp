package com.example.demo.DTO;
import jakarta.validation.constraints.NotNull;

public class HivAvfallRequest {

  @NotNull(message = "avfalls ID må oppgis")
  private int avfallsId;

  @NotNull(message = "avfallspunkt ID må oppgis")
  private int avfallsPunktId;

  public HivAvfallRequest(int avfallsId, int avfallsPunktId){
    this.avfallsId = avfallsId;
    this.avfallsPunktId = avfallsPunktId;
  }

  public int getAvfallsId() {
    return avfallsId;
  }

  public void setAvfallsId(int avfallsId) {
    this.avfallsId = avfallsId;
  }

  public int getAvfallsPunktId() {
    return avfallsPunktId;
  }

  public void setAvfallsPunktId(int avfallsPunktId) {
    this.avfallsPunktId = avfallsPunktId;
  }
}
