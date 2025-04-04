package com.example.demo.Controllers;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.LagAvfallRequest;
import com.example.demo.DTO.RegisterResponse;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.AvfTypeService;
import com.example.demo.Service.AvfallService;
import com.example.demo.Service.BrukerService;



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

  
  @PostMapping("/createNewAvfall")
  public ResponseEntity<?> leggTilAvfall(HttpSession session, @RequestBody @Valid LagAvfallRequest request){

    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logget ut!"));
    }

    if (session.getAttribute("userId") == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logged inn!"));
    }

    Object id = session.getAttribute("userId");
    Bruker bruker = brukerService.findById((Integer)id);
    if(!bruker.getAdminrettigheter()){
      return ResponseEntity.badRequest().body(new ErrorResponse("Du har ikke adminrettigheter."));
    }

    AvfallsType type = avfTypeService.getAvfTypeById(request.getAvfallstypeId());
    
    Avfall newAvfall = new Avfall();
    newAvfall.setNavn(request.getNavn());
    newAvfall.setStrekKode(request.getStrekkode());
    newAvfall.setBeskrivelse(request.getBeskrivelse());
    newAvfall.setAvfallsType(type);

    
    avfallService.createNewAvfall(newAvfall);

    return ResponseEntity.ok(new RegisterResponse("Avfall registrert!"));

  }

}
