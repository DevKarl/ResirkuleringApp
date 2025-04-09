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
import com.example.demo.Service.AdminService;
import com.example.demo.Service.AvfPunktService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Utils.SessionValidator;

@ApiController
public class AvfPunktController {

  @Autowired
  private AvfPunktService avfPunktService;

  @Autowired
  BrukerService brukerService;

  @Autowired
  AdminService adminService;

  @GetMapping("/getAvfallspunkterByAvfallstype")
  public List<Avfallspunkt> getAvfallspunkterByAvfallstype_id(@RequestParam int id) {
      return avfPunktService.getAvfallspunkterByAvfallstype_id(id);
  }

  @GetMapping("/getAllAvfallspunkter")
  public ResponseEntity<?> getAllAvfallspunkter(HttpSession session) {
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if(notAdminResponse != null) {
      return notAdminResponse;
    }
    try{
      List<Avfallspunkt> avfallspunkter = avfPunktService.getAllAvfallspunkter();
      return ResponseEntity.ok().body(new GetAllAvfallspunkterResponse(avfallspunkter));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av avfallspunkter"));
    }
    
  }

}
