package com.example.demo.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LagAvfallRequest {
  

  @NotBlank(message = "Strekkode maa oppgies")
  private String strekkode;

  @NotBlank(message = "Varenavn mangler")
  private String navn;

  @Size(min = 0, max = 400)
  private String beskrivelse;

  @NotNull(message = "må velge avfallstype")
  private Integer avfallstypeId;

  

  public LagAvfallRequest(){

  }

  public LagAvfallRequest(String strekkode, String navn, String beskrivelse, Integer avfallstypeId){
    this.strekkode = strekkode;
    this.navn = navn;
    this.beskrivelse = beskrivelse;
    this.avfallstypeId = avfallstypeId;
  }


  public String getStrekkode() {
    return this.strekkode;
  }

  public void setStrekkode(String strekkode) {
    this.strekkode = strekkode;
  }

  public String getNavn() {
    return this.navn;
  }

  public void setNavn(String navn) {
    this.navn = navn;
  }

  public String getBeskrivelse() {
    return this.beskrivelse;
  }

  public void setBeskrivelse(String beskrivelse) {
    this.beskrivelse = beskrivelse;
  }

  public Integer getAvfallstypeId() {
    return this.avfallstypeId;
  }

  public void setAvfallstypeId(Integer avfallstype) {
    this.avfallstypeId = avfallstype;
  }



}
