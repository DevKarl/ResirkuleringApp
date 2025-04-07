package com.example.demo.Utils;

import org.springframework.http.ResponseEntity;

import com.example.demo.DTO.ErrorResponse;

public class BadRequestUtils {
  


  public static ResponseEntity<?> notAdminErrorResponse(){
    return ResponseEntity.badRequest().body(new ErrorResponse("Du har ikke adminrettigheter."));
  }

  public static ResponseEntity<?> noAvfallsTypeFound() {
    return ResponseEntity.badRequest().body(new ErrorResponse("Avfallstype finnes ikke"));
  }

  public static ResponseEntity<?> somethingWrongHappened() {
    return ResponseEntity.badRequest().body(new ErrorResponse("Beklager, noe feil skjedde"));
  }
}
