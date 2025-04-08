package com.example.demo.Controllers;

import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.GetAllAvfallstyperResponse;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Service.AvfTypeService;
import com.example.demo.Service.BrukerService;


@ApiController
public class AvfallsTypeController {
  
  @Autowired
  private AvfTypeService avfTypeService;

  @Autowired
  BrukerService brukerService;

  @GetMapping("/getAvfTypeByAvfPunktID")
  public List<AvfallsType> getAvfTypeByAvfPunktID(@RequestParam int id) {
      return avfTypeService.getAvfTypeByAvfPunktID(id);
  }

  @GetMapping("/getAllAvfallstyper")
  public  ResponseEntity<?>  getAllAvfallstyper(HttpSession session) {
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
      List<AvfallsType> avfall = avfTypeService.getAllAvfallstyper();
      return ResponseEntity.ok().body(new GetAllAvfallstyperResponse(avfall));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av avfallstyper"));
    }
  }
  
  
}
