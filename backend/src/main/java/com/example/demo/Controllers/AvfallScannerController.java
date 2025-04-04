package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ErrorResponse;
import com.example.demo.DTO.ScanAvfallResponse;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Service.AvfPunktService;
import com.example.demo.Service.AvfallService;

@ApiController
public class AvfallScannerController {

  @Autowired
  AvfallService avfallService;

  @Autowired 
  AvfPunktService avfPunktService;

  @GetMapping("/scanAvfall")
  public ResponseEntity<?> scanAvfall(@RequestParam String strekkode) {
    Avfall avfall = avfallService.getAvfallByStrekkode(strekkode);
    if(avfall == null) {
      return ResponseEntity.badRequest().body((new ErrorResponse("Fant ikke avfall med kode: " + strekkode)));
    }
    List<Avfallspunkt> avfallspunkter = avfPunktService.getAvfallspunkterByAvfallstype_id(avfall.getId());
    return ResponseEntity.ok(new ScanAvfallResponse(avfall, avfallspunkter));
  }
  
}
