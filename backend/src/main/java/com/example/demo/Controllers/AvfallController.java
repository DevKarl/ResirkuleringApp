package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.Avfall;
import com.example.demo.Service.AvfallService;

@RestController
@RequestMapping("/api")
public class AvfallController {

    
  @Autowired
  AvfallService avfallService;



  @GetMapping("/{strekkode}")
  public Avfall scanAvfall(String strekkode){
    
    Avfall avfall = avfallService.scannAvfall(strekkode);
    return avfall;
  }



  public Avfall leggTilVare(String strekkode, int i) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'leggTilVare'");
  }

}
