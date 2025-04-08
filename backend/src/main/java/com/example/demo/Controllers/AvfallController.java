package com.example.demo.Controllers;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.GetAllAvfallResponse;
import com.example.demo.Entities.Avfall;
import com.example.demo.Service.AvfallService;
import com.example.demo.Service.BrukerService;


@ApiController
public class AvfallController {

  @Autowired
  AvfallService avfallService;

  @Autowired
  BrukerService brukerService;

  @GetMapping("/getAvfallByStrekkode")
  public Avfall getAvfallByStrekkode(@RequestParam String strekkode) {    
    return avfallService.getAvfallByStrekkode(strekkode);
  }

  @GetMapping("/getAllAvfall")
  public ResponseEntity<?> getAllAvfall(HttpSession session) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }
    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return ResponseEntity.status(401).body(new ErrorResponse("Brukeren er ikke logget inn"));
    }
    if (!brukerService.isAdmin((Integer) userId)) {
      return ResponseEntity.status(403).body(new ErrorResponse("Uautorisert tilgang: Denne handlingen krever admintilgang."));
    }
    try{
      List<Avfall> avfall = avfallService.getAllAvfall();
      return ResponseEntity.ok().body(new GetAllAvfallResponse(avfall));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av avfallsdata"));
    }
  }
}
