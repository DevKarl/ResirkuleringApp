package com.example.demo.Controllers;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.HivAvfallRequest;
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

  @PostMapping("/postHivAvfall")
    public ResponseEntity<?> postHivAvfall(HttpSession session, @RequestBody HivAvfallRequest request) {
        if (request == null || request.getAvfallsid() == 0 || request.getAvfallspunktid() == 0) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Ugyldig forespørsel. AvfallsID og AvfallspunktID må være satt."));
        }
        try {
            Object userId = session.getAttribute("userId");
            loggService.hivAvfall((Integer)userId, request.getAvfallsid(), request.getAvfallspunktid(), LocalDate.now());
            return ResponseEntity.ok("Avfall kastet med suksess.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Kunne ikke kaste avfall. Prøv igjen senere.");
        }
    }
 
  // @PostMapping("/postHivAvfall")
  // public ResponseEntity<?> postHivAvfallRequest(HttpSession session, int avfallsid, int avfallspunktid) {
  //     //TODO: process POST request
  //     if (session == null) {
  //       return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
  //     }
  //     Object userId = session.getAttribute("userId");
  //     if(userId == null) {
  //       return ResponseEntity.status(401).body("Ingen bruker logget inn");
  //     }
  //     try {
        
  //     } catch (Exception e) {
  //       return ResponseEntity.status(500).body("Ops! Noe feil skjedde.");
  //     }

  //     return ResponseEntity.ok(null);
  // }
  

}
