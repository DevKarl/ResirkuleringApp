package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Service.AvfTypeService;


@ApiController
public class AvfallsTypeController {
  
  @Autowired
  private AvfTypeService avfTypeService;

  @GetMapping("/getAvfTypeByAvfPunktID")
  public List<AvfallsType> getAvfTypeByAvfPunktID(@RequestParam int id) {
      return avfTypeService.getAvfTypeByAvfPunktID(id);
  }
  
}
