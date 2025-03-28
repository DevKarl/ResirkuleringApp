package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Service.LoggService;

import jakarta.servlet.http.HttpSession;


@ApiController
public class LoggController {
    
  @Autowired
  private LoggService loggService;

  @GetMapping("/getAvfallsLogg")
  public ResponseEntity<?> getAvfallsLogg(HttpSession session) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }
    Object userId = session.getAttribute("userId");
    if(userId == null) {
      return ResponseEntity.status(401).body("Ingen bruker logget inn");
    }
    try {
      List<Resirkuleringslogg> logger =  loggService.getAlleLoggerForBrukerMedId((Integer)userId);
      return ResponseEntity.ok(logger);
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Ops! Noe feil skjedde.");
    } 
  }
 
}
