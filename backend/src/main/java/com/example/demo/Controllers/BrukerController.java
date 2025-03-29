package com.example.demo.Controllers;
import java.util.stream.Collectors;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.RegisterResponse;
import com.example.demo.DTO.ResponseMessage;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.GetUserResponse;
import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@ApiController
public class BrukerController {
    
  @Autowired
  BrukerService brukerService;
  @Autowired
  PassordService passordService;

  @PostMapping("/register")
  public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest request, BindingResult bindResult) {

    if(bindResult.hasErrors()) {
      return ResponseEntity.badRequest().body(new RegisterResponse(buildErrorString(bindResult)));
    }
    if (brukerService.brukernavnIsTaken(request.getBrukernavn())) {
      return ResponseEntity.badRequest().body(new RegisterResponse("Brukernavn er allerede i bruk. ❌"));
    }

    String salt = passordService.genererSalt();
    String hash = passordService.hashMedSalt(request.getPassord(), salt);

    Bruker newUser = new Bruker();
    newUser.setFornavn(request.getFornavn());
    newUser.setEtternavn(request.getEtternavn());
    newUser.setBrukernavn(request.getBrukernavn());
    newUser.setSalt(salt);
    newUser.setHash(hash);
    newUser.setAdminrettigheter(false);
    newUser.setDelerStat(false);

    brukerService.createNewUser(newUser);
    return ResponseEntity.ok(new RegisterResponse("Bruker registrert!"));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(
    @RequestBody @Valid LoginRequest request, 
    BindingResult bindResult, 
    HttpSession session) 
    {

    if (session.getAttribute("userId") != null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logged inn! ❌"));
    }

    if(bindResult.hasErrors()) {
    return ResponseEntity.badRequest().body(new ErrorResponse(buildErrorString(bindResult)));
    }

    Bruker bruker = brukerService.findByBrukernavn(request.getBrukernavn().trim());

    if (bruker == null || !passordService.erKorrektPassord(request.getPassord(), bruker.getSalt(), bruker.getHash())) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Feil brukernavn eller passord ❌")); 
    }

    session.setAttribute("userId", bruker.getId());
    session.setMaxInactiveInterval(1800); // 30min
    String message = bruker.getFornavn() + " ble logget inn! ✅";
    LoginResponse loginResponse = new LoginResponse(
      message,
      bruker.getFornavn(),
      bruker.getEtternavn(),
      bruker.getBrukernavn(),
      bruker.getAdminrettigheter(),
      bruker.getDelerStat()
    );
    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpSession session, HttpServletResponse response) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logget ut! ❌"));
    }
    session.invalidate();
    Cookie cookie = new Cookie("JSESSIONID", null);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(0); 
    response.addCookie(cookie);
    return ResponseEntity.ok(new ResponseMessage("Brukeren din ble logget ut"));
  }

  @GetMapping("/getUser")
  public ResponseEntity<?> getUser(HttpServletRequest request) {
    HttpSession session = request.getSession(false); // Prevent new session creation
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }

    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return ResponseEntity.status(401).body(new ErrorResponse("Ingen bruker logget inn"));
    }

    try {
      Bruker bruker = brukerService.findById((Integer) userId);
      System.out.println(bruker);
      if (bruker == null) {
          return ResponseEntity.status(404).body(new ErrorResponse("Brukeren finnes ikke lenger i systemet"));
      }
      session.setMaxInactiveInterval(1800); // Refresh session timeout
      return ResponseEntity.ok(new GetUserResponse(
        bruker.getFornavn(), 
        bruker.getEtternavn(), 
        bruker.getBrukernavn(), 
        bruker.getAdminrettigheter(), 
        bruker.getDelerStat()
        ));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av brukerdata"));
    }
  }

  private String buildErrorString(BindingResult bindResult) {
    return bindResult.getAllErrors()
      .stream()
      .map(error -> error.getDefaultMessage())
      .collect(Collectors.joining(", "));
  }
  
}

