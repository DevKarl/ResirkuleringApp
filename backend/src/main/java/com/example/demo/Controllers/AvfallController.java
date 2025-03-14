package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.demo.Entities.Avfall;
import com.example.demo.Service.AvfallService;

@Controller
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
