package com.example.demo.Controllers;
import java.util.List;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.GetAllAvfallResponse;
import com.example.demo.DTO.AddNewAvfallRequest;
import com.example.demo.DTO.RegisterResponse;
import com.example.demo.DTO.UpdateAvfallRequest;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.AvfTypeService;
import com.example.demo.Service.AvfallService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Utils.ErrorMsgBuilder;
import com.example.demo.Utils.SessionValidator;
import com.example.demo.Utils.BadRequestUtils;



@ApiController
public class AvfallController {

  @Autowired
  AvfallService avfallService;

  @Autowired
  BrukerService brukerService;

  @Autowired
  AvfTypeService avfTypeService;


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
  
  @PostMapping("/addNewAvfall")
  public ResponseEntity<?> addNewAvfall(HttpSession session, @RequestBody @Valid AddNewAvfallRequest request, BindingResult bindingResult){

    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logget ut!"));
    }

    if (session.getAttribute("userId") == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logged inn!"));
    }

    if (bindingResult.hasErrors()){
      String returnMessage = ErrorMsgBuilder.buildError((BindingResult)bindingResult.getAllErrors());
      return ResponseEntity.badRequest().body(new RegisterResponse(returnMessage));
    }

    Object id = session.getAttribute("userId");
    Bruker bruker = brukerService.findById((Integer)id);
    if(!bruker.isAdminrettigheter()){
      return ResponseEntity.badRequest().body(new ErrorResponse("Uautorisert tilgang: Denne handlingen krever admintilgang."));
    }

    if (!request.getStrekkode().trim().matches("\\d+")) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Strekkoden kan kun inneholde tall (0-9)."));
    }

    if(avfallService.strekkodeAlreadyExists(request.getStrekkode())) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Strekkoden finnes allerede fra før av. Vennligst bruk en annen."));
    }

    AvfallsType type = avfTypeService.getAvfTypeById(request.getAvfallsTypeId());
    
    Avfall newAvfall = new Avfall();
    newAvfall.setNavn(request.getNavn());
    newAvfall.setStrekKode(request.getStrekkode());
    newAvfall.setBeskrivelse(request.getBeskrivelse());
    newAvfall.setAvfallsType(type);

    avfallService.createNewAvfall(newAvfall);

    return ResponseEntity.ok(new RegisterResponse("Avfall registrert!"));

  }

  @PostMapping("postUpdateAvfall")
  public ResponseEntity<?> postUpdateAvfall(HttpSession session,
  @RequestBody @Valid UpdateAvfallRequest updatedAvfall, BindingResult bindingResult){
    
    ResponseEntity<?> validationResponse = SessionValidator.validateSession(session);
    if (validationResponse != null) {
      return validationResponse;
    }

    if (bindingResult.hasErrors()){
      String returnMessage = ErrorMsgBuilder.buildError((BindingResult)bindingResult.getAllErrors());
      return ResponseEntity.badRequest().body(new RegisterResponse(returnMessage));
    }

    Object userId = session.getAttribute("userId");
    Bruker bruker = brukerService.findById((Integer) userId);
    if (!bruker.isAdminrettigheter()){
      return BadRequestUtils.notAdminErrorResponse();
    }
    AvfallsType type = avfTypeService.getAvfTypeById(updatedAvfall.getAvfallstypeId());
    if(type == null){
      return BadRequestUtils.noAvfallsTypeFound();
    }

    Avfall avfall = avfallService.getAvfallById(updatedAvfall.getId());
    
    //if no avfall is found with corresponding id given in param, create new avfall.
    if(avfall == null){
      // wait to be implementet. check if needed first.
      return ResponseEntity.ok().body("Avfallet eksisterte ikke");
    }

    avfall.setNavn(updatedAvfall.getNavn());
    avfall.setStrekKode(updatedAvfall.getStrekkode());
    avfall.setBeskrivelse(updatedAvfall.getBeskrivelse());
    avfall.setAvfallsType(type);

    boolean updated = avfallService.updateAvfall(avfall);

    if (!updated){
      return BadRequestUtils.somethingWrongHappened();
    } 
    return ResponseEntity.ok().body("Avfall er oppdatert"); 
    
  }

}
