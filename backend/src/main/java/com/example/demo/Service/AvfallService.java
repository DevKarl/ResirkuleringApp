package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Avfall;
import com.example.demo.Repositories.AvfallRepo;

@Service
public class AvfallService {

  @Autowired
  AvfallRepo avfallRepo;

  public Avfall scannAvfall(String strekkode) {
    //returner avfall fra database som har strekkode.avfPunktController

    return null;
  }

  public Avfall leggTilVare(String strekkode, int avfallstypeId) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'leggTilVare'");
  }
    
  
}
