package com.example.demo.Controllers;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import com.example.demo.DTO.GetAllUsersResponse;
import com.example.demo.DTO.GetUserResponse;
import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.RegisterResponse;
import com.example.demo.DTO.ResponseMessage;
import com.example.demo.DTO.SuccessResponse;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;
import com.example.demo.Utils.SessionValidator;


@ApiController
public class BrukerController {
    
  @Autowired
  BrukerService brukerService;
  @Autowired
  PassordService passordService;

  @Autowired
  AdminService adminService;

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
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logged inn!"));
    }

    if(bindResult.hasErrors()) {
    return ResponseEntity.badRequest().body(new ErrorResponse(buildErrorString(bindResult)));
    }

    Bruker bruker = brukerService.findByBrukernavn(request.getBrukernavn().trim());

    if (bruker == null || !passordService.erKorrektPassord(request.getPassord(), bruker.getSalt(), bruker.getHash())) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Feil brukernavn eller passord")); 
    }

    session.setAttribute("userId", bruker.getId());
    session.setMaxInactiveInterval(1800); // 30min
    String message = bruker.getFornavn() + " ble logget inn!";
    LoginResponse loginResponse = new LoginResponse(
      bruker.getId(),
      message,
      bruker.getFornavn(),
      bruker.getEtternavn(),
      bruker.getBrukernavn(),
      bruker.isAdminrettigheter(),
      bruker.isDelerstat()
    );
    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpSession session, HttpServletResponse response) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Brukeren er allerede logget ut!"));
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
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    try {
      Object userId = session.getAttribute("userId");
      Bruker bruker = brukerService.findById((Integer) userId);
      System.out.println(bruker);
      if (bruker == null) {
          return ResponseEntity.status(404).body(new ErrorResponse("Brukeren finnes ikke lenger i systemet"));
      }
      session.setMaxInactiveInterval(1800); // Refresh session timeout
      return ResponseEntity.ok(new GetUserResponse(
        bruker.getId(),
        bruker.getFornavn(), 
        bruker.getEtternavn(), 
        bruker.getBrukernavn(), 
        bruker.isAdminrettigheter(), 
        bruker.isDelerstat()
        ));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av brukerdata"));
    }
  }

  @PostMapping("postActivateStatShare")
  public ResponseEntity<?> activateStatShare(HttpSession session){
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    try {
      Object userId = session.getAttribute("userId");
      brukerService.activateStatShare((Integer)userId);
      return ResponseEntity.ok().body(new SuccessResponse("Din statistikk er nå offentliggjort"));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under publisering av brukerstatistikk"));
    }
  }

  @PostMapping("postDeactivateStatShare")
  public ResponseEntity<?> deactivateStatShare(HttpSession session){
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    try {
      Object userId = session.getAttribute("userId");
      brukerService.deactivateStatShare((Integer)userId);
      return ResponseEntity.ok().body(new SuccessResponse("Din statistikk er nå skjult"));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under skjuling av brukerstatistikk"));
    }
  }

  @GetMapping("/getAllUsers")
  public ResponseEntity<?> getAllUsers(HttpSession session) {
    ResponseEntity<?> sessionInvalidResponse = SessionValidator.validateSession(session);
    if (sessionInvalidResponse != null) {
      return sessionInvalidResponse;
    }
    ResponseEntity<?> notAdminResponse = adminService.validateAdmin(session);
    if(notAdminResponse != null) {
      return notAdminResponse;
    }
    try {
      List<Bruker> brukere = brukerService.getAllUsers();
      return ResponseEntity.ok().body(new GetAllUsersResponse(brukere));
    } catch(Exception e) {
      return ResponseEntity.status(500).body(new ErrorResponse("En feil oppstod under henting av alle brukere"));
    }
  }
  

  private String buildErrorString(BindingResult bindResult) {
    return bindResult.getAllErrors()
      .stream()
      .map(error -> error.getDefaultMessage())
      .collect(Collectors.joining(", "));
  }
  
}

