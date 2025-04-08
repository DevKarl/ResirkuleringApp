package com.example.demo.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class AddNewAvfallRequest {
  

  @NotBlank(message = "Strekkode maa oppgies")
  private String strekkode;

  @NotBlank(message = "Varenavn mangler")
  private String navn;

  @Size(min = 0, max = 200)
  private String beskrivelse;

  @NotNull(message = "må velge avfallstype")
  private Integer avfallsTypeId;


  public AddNewAvfallRequest(){

  }

  public AddNewAvfallRequest(String strekkode, String navn, String beskrivelse, Integer avfallsTypeId){
    this.strekkode = strekkode;
    this.navn = navn;
    this.beskrivelse = beskrivelse;
    this.avfallsTypeId = avfallsTypeId;
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

  public Integer getAvfallsTypeId() {
    return this.avfallsTypeId;
  }

  public void setAvfallsTypeId(Integer avfallsTypeId) {
    this.avfallsTypeId = avfallsTypeId;
  }



}
