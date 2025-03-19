package com.example.demo.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.Entities.Avfall;
import com.example.demo.Service.AvfallService;


@ApiController
public class AvfallController {

  @Autowired
  AvfallService avfallService;

  @GetMapping("/scanAvfall")
  public Avfall scanAvfall(@RequestParam String strekkode) {
    
    return avfallService.scannAvfall(strekkode);
  
  }

  // public Avfall leggTilVare(String strekkode, int i) {
  //   throw new UnsupportedOperationException("Unimplemented method 'leggTilVare'");
  // }

}
