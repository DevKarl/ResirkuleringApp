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
import com.example.demo.Service.AdminService;
import com.example.demo.Service.AvfTypeService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Utils.SessionValidator;


@ApiController
public class AvfallsTypeController {
  
  @Autowired
  private AvfTypeService avfTypeService;

  @Autowired
  BrukerService brukerService;

  @Autowired
  AdminService adminService;

  @GetMapping("/getAvfTypeByAvfPunktID")
  public List<AvfallsType> getAvfTypeByAvfPunktID(@RequestParam int id) {
      return avfTypeService.getAvfTypeByAvfPunktID(id);
  }

  @GetMapping("/getAllAvfallstyper")
  public  ResponseEntity<?>  getAllAvfallstyper(HttpSession session) {
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if(notAdminResponse != null) {
      return notAdminResponse;
    }
    try{
      List<AvfallsType> avfall = avfTypeService.getAllAvfallstyper();
      return ResponseEntity.ok().body(new GetAllAvfallstyperResponse(avfall));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av avfallstyper"));
    }
  }
  
  
}
