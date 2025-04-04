package com.example.demo.Service;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;

import com.example.demo.DTO.ErrorResponse;

public class CookieService {
  
  public boolean checkIfSessionNull(HttpSession session){
    // HttpSession session = request.getSession(false); // Prevent new session creation
    if (session == null) {
      return true;
    }
    return false;
  }

  public boolean checkLoggedIn(HttpSession session){
    Object userId = session.getAttribute("userId");
    if (userId == null) {
      return false;
    }
    return true;
  }
}
