package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.BrukerDTO;
import com.example.demo.DTO.LoginRequest;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;

import jakarta.servlet.http.HttpSession;

@ApiController
public class BrukerController {
    
    @Autowired
    private final BrukerService brukerService;
    private final PassordService passordService;

    public BrukerController(BrukerService brukerService, PassordService passordService) {
        this.brukerService = brukerService;
        this.passordService = passordService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody BrukerDTO request) {
        if (request.getBrukernavn() == null || request.getPassord() == null) {
            return ResponseEntity.badRequest().body("username and password must be provided");
        }
        
        if(brukerService.findByBrukernavn(request.getBrukernavn())!=null) {
          return ResponseEntity.badRequest().body("Brukernavn eksisterer");
        }

        // Genering av salt og hasj
        String salt = passordService.genererSalt();
        String hash = passordService.hashMedSalt(request.getPassord(), salt);

        Bruker newUser = new Bruker();
        newUser.setFornavn(request.getFornavn());
        newUser.setEtternavn(request.getEtternavn());
        newUser.setBrukernavn(request.getBrukernavn());
        newUser.setSalt(salt);
        newUser.setHash(hash);
        // inn så lenge sette default admin false
        newUser.setAdminrettigheter(false);

        brukerService.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpSession session) {
     if(request.getBrukernavn() == null || request.getPassord()== null) {
      return ResponseEntity.badRequest().body("Username and password must be provided");
     }
     Bruker bruker = brukerService.findByBrukernavn(request.getBrukernavn());
     if(bruker==null) {
      return ResponseEntity.badRequest().body("User not found");
     }
     if(!passordService.erKorrektPassord(request.getPassord(), bruker.getSalt(), bruker.getHash())) {
      return ResponseEntity.badRequest().body("Incorrent brukernavn or password");
     }

    // lagring av cookies inni sesjonen + session expiry 20 min
     session.setAttribute("userId", bruker.getId());
     session.setMaxInactiveInterval(1800);

     return ResponseEntity.ok("Login succesful");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
      session.invalidate();
      return ResponseEntity.ok("Logged out succesfully");
    }

   // kun for testing, kan fjernes etterhvert
    @GetMapping("/profile")
    public ResponseEntity<String> profile(HttpSession session) {
      Object userId = session.getAttribute("userId");
      if(userId == null) {
        return ResponseEntity.status(401).body("No user logged in");
      }
      return ResponseEntity.ok("Logged in as user id: "+ userId);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpSession session) {
      Object userId = session.getAttribute("userId");
      if(userId!=null) {
        return ResponseEntity.status(401).body("No user logged in");
      }
        Bruker bruker = brukerService.findById((Integer) userId);
        if(bruker== null) {
          return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(bruker);
      }
    }

