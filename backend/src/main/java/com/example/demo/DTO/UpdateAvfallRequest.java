package com.example.demo.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UpdateAvfallRequest {
  
  @NotNull(message = "Må ha id")
  private Integer id;

  @NotBlank(message="Strekkode må oppgies")
  private String strekkode;

  @NotBlank(message="Varenavn mangler")
  private String navn;

  private String beskrivelse;

  @NotNull(message = "må velge avfallstype")
  private Integer avfallstypeId;


  public UpdateAvfallRequest() {
  }


  public UpdateAvfallRequest(Integer id, String strekkode, String navn, String beskrivelse, Integer avfallstypeId) {
    this.id = id;
    this.strekkode = strekkode;
    this.navn = navn;
    this.beskrivelse = beskrivelse;
    this.avfallstypeId = avfallstypeId;
  }


  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  public void setAvfallstypeId(Integer avfallstypeId) {
    this.avfallstypeId = avfallstypeId;
  }






}
