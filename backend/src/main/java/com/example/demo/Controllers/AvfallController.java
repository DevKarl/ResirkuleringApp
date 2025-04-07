package com.example.demo.Controllers;
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
import com.example.demo.DTO.RegisterResponse;
import com.example.demo.DTO.UpdateAvfallRequest;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.AvfTypeService;
import com.example.demo.Service.AvfallService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.CookieService;
import com.example.demo.Utils.BadRequestUtils;
import com.example.demo.Utils.ErrorMsgBuilder;



@ApiController
public class AvfallController {

  @Autowired
  AvfallService avfallService;

  @Autowired
  private CookieService cookieService;

  @Autowired
  private BrukerService brukerService;

  @Autowired
  private AvfTypeService avfTypeService;

  @GetMapping("/getAvfallByStrekkode")
  public Avfall getAvfallByStrekkode(@RequestParam String strekkode) {    
    return avfallService.getAvfallByStrekkode(strekkode);
  }

  @PostMapping("postUpdateAvfall")
  public ResponseEntity<?> postUpdateAvfall(HttpSession session,
  @RequestBody @Valid UpdateAvfallRequest updatedAvfall, BindingResult br){

    ResponseEntity<?> errorMsg = cookieService.checkIfSessionNullorNoLoggedInUser(session);
    if(errorMsg != null){
      return errorMsg;
    }

    if (br.hasErrors()){
      String returnMessage = ErrorMsgBuilder.buildError((BindingResult)br.getAllErrors());
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
