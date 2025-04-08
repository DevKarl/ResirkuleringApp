package com.example.demo.DTO;

import java.util.List;

import com.example.demo.Entities.AvfallsType;

public class GetAllAvfallstyperResponse {
  List<AvfallsType> avfallsTyper;

  public GetAllAvfallstyperResponse(List<AvfallsType> avfallsTyper) {
    this.avfallsTyper = avfallsTyper;
  }

  public List<AvfallsType> getAvfallsTyper() {
    return avfallsTyper;
  }

  public void setAvfallsTyper(List<AvfallsType> avfallsTyper) {
    this.avfallsTyper = avfallsTyper;
  }
  
}
