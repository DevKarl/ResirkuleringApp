package com.example.demo.Service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ErrorResponse;
import com.example.demo.Entities.Bruker;

@Service
public class AdminService {

  @Autowired
  BrukerService brukerService;

  public ResponseEntity<ErrorResponse> validateAdmin(HttpSession session) {
    Object userId = session.getAttribute("userId");
    Bruker bruker = brukerService.findById((Integer) userId);
    if (!bruker.isAdminrettigheter()) {
      return ResponseEntity.status(403).body(new ErrorResponse("Uautorisert tilgang: Denne handlingen krever admintilgang."));
    }
    return null;
  }
  
}
