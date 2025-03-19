package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Service.AvfPunktService;


@ApiController
public class AvfPunktController {

    @Autowired
    private AvfPunktService avfPunktService;


    

  @GetMapping("/getAvfallspunkterByAvfallstype")
  public List<Avfallspunkt> getAvfallspunkterByAvfallstype_id(@RequestParam int id) {
      return avfPunktService.getAvfallspunkterByAvfallstype_id(id);
  }
  

}
