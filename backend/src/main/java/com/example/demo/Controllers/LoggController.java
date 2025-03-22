package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Service.LoggService;


@ApiController
public class LoggController {
    
  @Autowired
  private LoggService loggService;


  @GetMapping("/getAlleLoggerForBrukerMedId")
  public List<Resirkuleringslogg> getAlleLoggerForBrukerMedId(@RequestParam int id) {
      return loggService.getAlleLoggerForBrukerMedId(id);
  }
  
}
