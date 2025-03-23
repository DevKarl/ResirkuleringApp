package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.BrukerDTO;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;

@RestController
@RequestMapping("/api")
public class BrukerController {

    private final BrukerService brukerService;
    private final PassordService passordService;

    @Autowired
    public BrukerController(BrukerService brukerService, PassordService passordService) {
        this.brukerService = brukerService;
        this.passordService = passordService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody BrukerDTO request) {
        // Basic input validation (can be extended as needed)
        if (request.getEpost() == null || request.getPassord() == null) {
            return ResponseEntity.badRequest().body("E-mail and passord must be provided");
        }

        // Generate a salt and hash the password
        String salt = passordService.genererSalt();
        String hash = passordService.hashMedSalt(request.getPassord(), salt);

        // Create a new user entity
        Bruker newUser = new Bruker();
        newUser.setFornavn(request.getFornavn());
        newUser.setEtternavn(request.getEtternavn());
        newUser.setEpost(request.getEpost());
        newUser.setSalt(salt);
        newUser.setHash(hash);
        // Default admin rights to false
        newUser.setAdminrettigheter(false);

        // Save the user
        brukerService.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }
}
