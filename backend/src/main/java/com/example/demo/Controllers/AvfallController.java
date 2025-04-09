package com.example.demo.Controllers;
import java.util.List;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.GetAllAvfallResponse;
import com.example.demo.DTO.ScanAvfallResponse;
import com.example.demo.DTO.AddNewAvfallRequest;
import com.example.demo.DTO.SuccessResponse;
import com.example.demo.DTO.UpdateAvfallRequest;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.AvfPunktService;
import com.example.demo.Service.AvfTypeService;
import com.example.demo.Service.AvfallService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Utils.ErrorMsgBuilder;
import com.example.demo.Utils.SessionValidator;


@ApiController
public class AvfallController {

  @Autowired
  AvfallService avfallService;

  @Autowired
  BrukerService brukerService;

  @Autowired
  AvfTypeService avfTypeService;

  @Autowired 
  AvfPunktService avfPunktService;

  @Autowired
  AdminService adminService;

  @GetMapping("/scanAvfall")
  public ResponseEntity<?> scanAvfall(@RequestParam String strekkode) {
    Avfall avfall = avfallService.getAvfallByStrekkode(strekkode);
    if(avfall == null) {
      return ResponseEntity.badRequest().body((new ErrorResponse("Fant ikke avfall med kode: " + strekkode)));
    }
    List<Avfallspunkt> avfallspunkter = avfPunktService.getAvfallspunkterByAvfallstype_id(avfall.getId());
    return ResponseEntity.ok(new ScanAvfallResponse(avfall, avfallspunkter));
  }

  @GetMapping("/getAllAvfall")
  public ResponseEntity<?> getAllAvfall(HttpSession session) {
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if(notAdminResponse != null) {
      return notAdminResponse;
    }
    try{
      List<Avfall> avfall = avfallService.getAllAvfall();
      return ResponseEntity.ok().body(new GetAllAvfallResponse(avfall));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av avfallsdata"));
    }
  }
  
  @PostMapping("/addNewAvfall")
  public ResponseEntity<?> addNewAvfall(HttpSession session, @RequestBody @Valid AddNewAvfallRequest request, BindingResult bindingResult){

    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }

    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if(notAdminResponse != null) {
      return notAdminResponse;
    }

    if (bindingResult.hasErrors()){
      String returnMessage = ErrorMsgBuilder.buildError((BindingResult)bindingResult.getAllErrors());
      return ResponseEntity.badRequest().body(new ErrorResponse(returnMessage));
    }

    try {
      if(avfallService.strekkodeIsTaken(request.getStrekkode())) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Strekkoden er tatt. Vennligst bruk en annen."));
      }
      AvfallsType type = avfTypeService.getAvfTypeById(request.getAvfallstypeId());
      Avfall newAvfall = new Avfall();
      newAvfall.setNavn(request.getNavn());
      newAvfall.setStrekKode(request.getStrekkode());
      newAvfall.setBeskrivelse(request.getBeskrivelse());
      newAvfall.setAvfallsType(type);
      avfallService.createNewAvfall(newAvfall);
      return ResponseEntity.ok(new SuccessResponse("Nytt avfall ble lagt til!"));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under lagring av nytt avfall"));
    }

  }

  @PostMapping("postUpdateAvfall")
  public ResponseEntity<?> postUpdateAvfall(HttpSession session,
  @RequestBody @Valid UpdateAvfallRequest request, BindingResult bindingResult){
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if(notAdminResponse != null) {
      return notAdminResponse;
    }
    if (bindingResult.hasErrors()){
      String returnMessage = ErrorMsgBuilder.buildError((BindingResult)bindingResult.getAllErrors());
      return ResponseEntity.badRequest().body(new ErrorResponse(returnMessage));
    }
    try {
      Avfall avfall = avfallService.getAvfallById(request.getId());
      if(avfallService.updatedStrekkodeIsTaken(request.getStrekkode(), avfall.getStrekKode())) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Den nye strekkoden du oppgav er tatt. Vennligst bruk en annen."));
      }
      AvfallsType type = avfTypeService.getAvfTypeById(request.getAvfallstypeId());
      avfall.setNavn(request.getNavn());
      avfall.setStrekKode(request.getStrekkode());
      avfall.setBeskrivelse(request.getBeskrivelse());
      avfall.setAvfallsType(type);
      avfallService.updateAvfall(avfall);
      return ResponseEntity.ok(new SuccessResponse("Avfallet ble oppdatert!"));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under oppdateringen av avfallet"));
    }
  }

  @DeleteMapping("/deleteAvfall")
  public ResponseEntity<?> deleteAvfall(HttpSession session, @RequestParam int avfallId) {
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if (notAdminResponse != null) {
      return notAdminResponse;
    }
    try {
        avfallService.deleteAvfallById(avfallId);
        return ResponseEntity.ok(new SuccessResponse("Avfallet ble slettet!"));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under slettingen av avfallet."));
    }
  }

}
