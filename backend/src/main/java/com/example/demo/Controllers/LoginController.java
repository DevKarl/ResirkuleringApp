package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final BrukerService brukerService;
    private final PassordService passordService;

    @Autowired
    public LoginController(BrukerService brukerService, PassordService passordService) {
        this.brukerService = brukerService;
        this.passordService = passordService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpSession session) {
        if (request.getEpost() == null || request.getPassord() == null) {
            return ResponseEntity.badRequest().body("Epost and passord must be provided");
        }
        
        // Retrieve the user based on the provided email (assuming the service maps this correctly)
        Bruker bruker = brukerService.findByEpost(request.getEpost());
        if (bruker == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        // Verify the password using the PassordService
        if (!passordService.erKorrektPassord(request.getPassord(), bruker.getSalt(), bruker.getHash())) {
            return ResponseEntity.badRequest().body("Incorrect email or password");
        }
        
        // Store user information in the session
        session.setAttribute("userId", bruker.getId());
        
        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
       @GetMapping("/profile")
    public ResponseEntity<String> profile(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("No user logged in");
        }
        return ResponseEntity.ok("Logged in as user id: " + userId);
    }
}
