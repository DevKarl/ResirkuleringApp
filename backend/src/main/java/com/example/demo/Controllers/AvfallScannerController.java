package com.example.demo.Controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.demo.Controllers.Interfaces.ApiController;
import com.example.demo.DTO.ScanAvfallResponse;
import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Service.AvfPunktService;
import com.example.demo.Service.AvfallService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@ApiController
public class AvfallScannerController {

  @Autowired
  AvfallService avfallService;

  @Autowired 
  AvfPunktService avfPunktService;

  @GetMapping("/scanAvfall")
  public ResponseEntity<ScanAvfallResponse> scanAvfall(@RequestParam String strekkode) {
    Avfall avfall = avfallService.getAvfallByStrekkode(strekkode);
    List<Avfallspunkt> avfallspunkter = avfPunktService.getAvfallspunkterByAvfallstype_id(avfall.getId());
    return ResponseEntity.ok(new ScanAvfallResponse(avfall, avfallspunkter));
  }
  
}
