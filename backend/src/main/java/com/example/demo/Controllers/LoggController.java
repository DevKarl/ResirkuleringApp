package com.example.demo.Controllers;
import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.HivAvfallRequest;
import com.example.demo.DTO.SuccessResponse;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Entities.Bruker;
import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Service.AvfPunktService;
import com.example.demo.Service.AvfallService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.LoggService;
import com.example.demo.Utils.ErrorMsgBuilder;

@ApiController
public class LoggController {

  @Autowired
  private LoggService loggService;

  @Autowired
  private AvfallService avfallService;

  @Autowired
  private BrukerService brukerService;

  @Autowired
  private AvfPunktService avfPunktService;

  @GetMapping("/getAvfallsLogg")
  public ResponseEntity<?> getAvfallsLogg(HttpSession session) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }
    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return ResponseEntity.status(401).body(new ErrorResponse("Brukeren er ikke logget inn"));
    }
    try {
      List<Resirkuleringslogg> logger = loggService.getAlleLoggerForBrukerMedId((Integer) userId);
      return ResponseEntity.ok(logger);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("Ops! Noe feil skjedde."));
    }
  }

  @PostMapping("/postHivAvfall")
  public ResponseEntity<?> postHivAvfall(
    HttpSession session,
    @RequestBody @Valid HivAvfallRequest request, 
    BindingResult bindResult) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }
    if(bindResult.hasErrors()) {
      return ResponseEntity.badRequest().body(new ErrorResponse(ErrorMsgBuilder.buildError(bindResult)));
    }
    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return ResponseEntity.status(401).body(new ErrorResponse("Brukeren er ikke logget inn"));
    }

    try {
      Avfall avfall = avfallService.getAvfallById(request.getAvfallsId());
      Bruker bruker = brukerService.findById((Integer)userId);
      System.out.println(bruker.toString());
      Avfallspunkt avfallspunkt = avfPunktService.getAvfallspunktById(request.getAvfallsPunktId());
      LocalDateTime currentDateTime = LocalDateTime.now();
      Resirkuleringslogg logg = new Resirkuleringslogg(
        avfall,
        bruker,
        avfallspunkt,
        currentDateTime
      );
      loggService.saveHivdAvfall(logg);
      return ResponseEntity.ok(new SuccessResponse("Hivd avfall registrert"));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("Kunne ikke kaste avfall. Prøv igjen senere."));
    }
  }
}
