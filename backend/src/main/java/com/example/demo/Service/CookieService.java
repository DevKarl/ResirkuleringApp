package com.example.demo.Service;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ErrorResponse;

@Service
public class CookieService {
  
  public ResponseEntity<?> checkIfSessionNullorNoLoggedInUser(HttpSession session){
    // HttpSession session = request.getSession(false); // Prevent new session creation
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }
    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return ResponseEntity.status(401).body(new ErrorResponse("Ingen bruker logget inn"));
    }
    return null;
    
  }

}
