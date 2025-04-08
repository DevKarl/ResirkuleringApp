package com.example.demo.Utils;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;

import com.example.demo.DTO.ErrorResponse;

public class SessionValidator {

  public static ResponseEntity<?> validateSession(HttpSession session) {
    if (session == null) {
      return ResponseEntity.badRequest().body(new ErrorResponse("Sesjonen er utløpt, vennligst logg inn på nytt."));
    }
    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return ResponseEntity.status(401).body(new ErrorResponse("Sesjonen din er ugyldig. Vennligst logg inn på nytt."));
    }
    return null;
  }  
}
