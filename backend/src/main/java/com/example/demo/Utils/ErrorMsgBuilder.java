package com.example.demo.Utils;

import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;

public  class ErrorMsgBuilder {

  public static String buildError(BindingResult bindResult) {
    return bindResult.getAllErrors()
      .stream()
      .map(error -> error.getDefaultMessage())
      .collect(Collectors.joining(", "));
  }
  
}
