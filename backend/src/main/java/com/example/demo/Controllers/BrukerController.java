package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.BrukerDTO;
import com.example.demo.Entities.Bruker;
import com.example.demo.Service.BrukerService;
import com.example.demo.Service.PassordService;

@ApiController
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
        if (request.getEpost() == null || request.getPassord() == null) {
            return ResponseEntity.badRequest().body("E-mail and passord must be provided");
        }

        // Genering av salt og hasj
        String salt = passordService.genererSalt();
        String hash = passordService.hashMedSalt(request.getPassord(), salt);

        Bruker newUser = new Bruker();
        newUser.setFornavn(request.getFornavn());
        newUser.setEtternavn(request.getEtternavn());
        newUser.setEpost(request.getEpost());
        newUser.setSalt(salt);
        newUser.setHash(hash);
        // inn så lenge sette default admin false
        newUser.setAdminrettigheter(false);

        brukerService.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }
}
