package com.example.demo.Controllers;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.RegisterResponse;
import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;

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
      return ResponseEntity.badRequest().body(new RegisterResponse("Brukernavn er allerede i bruk."));
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
      return ResponseEntity.badRequest().body("Brukeren er allerede logged inn!");
    }

    if(bindResult.hasErrors()) {
    return ResponseEntity.badRequest().body(buildErrorString(bindResult));
    }

    Bruker bruker = brukerService.findByBrukernavn(request.getBrukernavn().trim());

    if (bruker == null || !passordService.erKorrektPassord(request.getPassord(), bruker.getSalt(), bruker.getHash())) {
      return ResponseEntity.badRequest().body("Feil brukernavn eller passord"); 
    }

    session.setAttribute("userId", bruker.getId());
    session.setMaxInactiveInterval(1800); // 30min
    LoginResponse loginResponse = new LoginResponse(
      bruker.getFornavn(),
      bruker.getEtternavn(),
      bruker.getBrukernavn()
    );
    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.ok("Logged out succesfully");
  }

  @GetMapping("/getUser")
  public ResponseEntity<?> getUser(HttpSession session) {
    Object userId = session.getAttribute("userId");
    if(userId == null) {
    return ResponseEntity.status(401).body("Ingen bruker logget inn");
    }
    Bruker bruker = brukerService.findById((Integer) userId);
    if(bruker == null) {
      return ResponseEntity.status(404).body("Bruker ikke funnet");
    }
    session.setMaxInactiveInterval(1800);
    return ResponseEntity.ok(bruker);
  }

  private String buildErrorString(BindingResult bindResult) {
    return bindResult.getAllErrors()
      .stream()
      .map(error -> error.getDefaultMessage())
      .collect(Collectors.joining(", "));
  }
  
}

