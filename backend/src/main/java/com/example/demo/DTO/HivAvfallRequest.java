package com.example.demo.DTO;

public class HivAvfallRequest {
  private int avfallsid;
  private int avfallspunktid;

  public HivAvfallRequest(int avfall, int avfallspunkt){
    this.avfallsid = avfall;
    this.avfallspunktid = avfallspunkt;
  }

  public int getAvfallsid() {
    return avfallsid;
  }

  public void setAvfallsid(int avfallsid) {
    this.avfallsid = avfallsid;
  }

  public int getAvfallspunktid() {
    return avfallspunktid;
  }

  public void setAvfallspunktid(int avfallspunktid) {
    this.avfallspunktid = avfallspunktid;
  }
}
