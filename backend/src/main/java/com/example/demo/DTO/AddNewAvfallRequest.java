package com.example.demo.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class AddNewAvfallRequest {
  

  @NotBlank(message = "Strekkode maa oppgies")
  @Pattern(regexp = "\\d+", message = "Strekkoden kan kun inneholde tall (0-9).")
  private String strekkode;

  @NotBlank(message = "Varenavn mangler")
  private String navn;

  @Size(min = 0, max = 200)
  private String beskrivelse;

  @NotNull(message = "må velge avfallstype")
  private Integer avfallstypeId;


  public AddNewAvfallRequest(){

  }

  public AddNewAvfallRequest(String strekkode, String navn, String beskrivelse, Integer avfallstypeId){
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

  public void setAvfallstypeId(Integer avfallstypeId) {
    this.avfallstypeId = avfallstypeId;
  }
  
}
