package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ScanAvfallResponse;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.Avfallspunkt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@ApiController
public class AvfallScannerController {

  @Autowired
  AvfallController avfallcontroller;

  @Autowired
  AvfPunktController avfPunktController;

  @GetMapping("/scanAvfall")
  public ResponseEntity<ScanAvfallResponse> scanAvfall(@RequestParam String strekkode) {
    Avfall avfall = avfallcontroller.getAvfallByStrekkode(strekkode);
    List<Avfallspunkt> avfallspunkter = avfPunktController.getAvfallspunkterByAvfallstype_id(avfall.getId());
    return ResponseEntity.ok(new ScanAvfallResponse(avfall, avfallspunkter));
  }

}
