package com.example.demo.Entities;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Avfallspunkt",schema = "resirkulering")
public class Avfallspunkt {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String longitude;
  private String latitude;
  private String navn;

  @JsonManagedReference
  @OneToMany(mappedBy = "avfallspunkt", fetch = FetchType.EAGER)
  private Set<AvfallspunktAvfallstype> avfallspunktAvfallstyper;




  //@ManyToMany(fetch = FetchType.EAGER)
  //@JoinTable(
  //  name = "Avfallspunkt_avfallstype",
  //  joinColumns = @JoinColumn(name = "avfallspunkt_id"),
  //  inverseJoinColumns = @JoinColumn(name = "avfallstype_id")
  //)
  //private Set<AvfallsType> avfallstyper;


  public Avfallspunkt(){

  }


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getLongitude() {
    return this.longitude;
  }

  public void setLongitude(String longitude) {
    this.longitude = longitude;
  }

  public String getLatitude() {
    return this.latitude;
  }

  public void setLatitude(String latitude) {
    this.latitude = latitude;
  }

  public String getNavn() {
    return this.navn;
  }

  public void setNavn(String navn) {
    this.navn = navn;
  }


  public Set<AvfallspunktAvfallstype> getAvfallspunktAvfallstyper() {
    return this.avfallspunktAvfallstyper;
  }

  public void setAvfallspunktAvfallstyper(Set<AvfallspunktAvfallstype> avfallspunktAvfallstyper) {
    this.avfallspunktAvfallstyper = avfallspunktAvfallstyper;
  }
 
}
