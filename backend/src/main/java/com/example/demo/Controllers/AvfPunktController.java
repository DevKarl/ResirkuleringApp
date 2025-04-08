package com.example.demo.Controllers;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.GetAllAvfallspunkterResponse;
import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Service.AvfPunktService;
import com.example.demo.Service.BrukerService;

@ApiController
public class AvfPunktController {

  @Autowired
  private AvfPunktService avfPunktService;

  @Autowired
  BrukerService brukerService;

  @GetMapping("/getAvfallspunkterByAvfallstype")
  public List<Avfallspunkt> getAvfallspunkterByAvfallstype_id(@RequestParam int id) {
      return avfPunktService.getAvfallspunkterByAvfallstype_id(id);
  }

  @GetMapping("/getAllAvfallspunkter")
  public ResponseEntity<?> getAllAvfallspunkter(HttpSession session) {

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
      List<Avfallspunkt> avfallspunkter = avfPunktService.getAllAvfallspunkter();
      return ResponseEntity.ok().body(new GetAllAvfallspunkterResponse(avfallspunkter));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av avfallspunkter"));
    }
    
  }

}
