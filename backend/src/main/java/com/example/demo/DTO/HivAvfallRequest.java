package com.example.demo.DTO;

import jakarta.validation.constraints.NotBlank;

public class HivAvfallRequest {

  @NotBlank(message = "avfalls ID må oppgis")
  private int avfallsId;

  @NotBlank(message = "avfallspunkt ID må oppgis")
  private int avfallspunktId;

  public HivAvfallRequest(int avfallsId, int avfallspunktId){
    this.avfallsId = avfallsId;
    this.avfallspunktId = avfallspunktId;
  }

  public int getAvfallsId() {
    return avfallsId;
  }

  public void setAvfallsId(int avfallsId) {
    this.avfallsId = avfallsId;
  }

  public int getAvfallspunktId() {
    return avfallspunktId;
  }

  public void setAvfallspunktId(int avfallspunktId) {
    this.avfallspunktId = avfallspunktId;
  }
}
