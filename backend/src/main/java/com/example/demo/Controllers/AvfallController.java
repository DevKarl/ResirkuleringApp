package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.Avfall;
import com.example.demo.Service.AvfallService;

@RestController
@RequestMapping("/api")
public class AvfallController {

    
  @Autowired
  AvfallService avfallService;



  public Avfall scanAvfall(String strekkode){
    
    return null;
  }



  public Avfall leggTilVare(String strekkode, int i) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'leggTilVare'");
  }

}
