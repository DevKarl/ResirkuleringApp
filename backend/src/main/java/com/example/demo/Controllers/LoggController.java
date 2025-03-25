package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Service.LoggService;

import jakarta.servlet.http.HttpSession;


@ApiController
public class LoggController {
    
  @Autowired
  private LoggService loggService;


  @GetMapping("/getAlleLoggerForInnloggetBruker")
  public ResponseEntity<?> getAlleLoggerForBrukerForInnloggetBruker(HttpSession session) {

    Object userId = session.getAttribute("userId");

    if(userId == null) {
    return ResponseEntity.status(401).body("Ingen bruker logget inn");
    }
    try {
      List<Resirkuleringslogg> logger =  loggService.getAlleLoggerForBrukerMedId((Integer)userId);
      if (logger.isEmpty()){
        return ResponseEntity.status(404).body("Ingen logger funnet for bruker");
      } else{
        return ResponseEntity.ok(logger);
      }
     
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Ops! Noe feil skjedde.");
    } 
  }
 
}
