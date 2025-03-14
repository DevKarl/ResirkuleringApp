package com.example.demo.Controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.annotation.Testable;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.demo.Entities.Avfall;
import com.example.demo.Entities.AvfallsType;
import com.example.demo.Service.AvfallService;

@Testable

public class AvfallControllerTest {

  @Mock
  AvfallService avfallService;

  @InjectMocks
  AvfallController avfallController;

  String strekkode;
  AvfallsType at;
  AvfallsType at2;
  Avfall mockAvfall;

  @BeforeEach
  void setup(){
    MockitoAnnotations.openMocks(this);
    strekkode = "12345678";
    at = new AvfallsType(1,"Glass");
    at2 =  new AvfallsType(2,"Plast");
  }

  @Test
  void testScanAvfall(){
    mockAvfall = new Avfall(strekkode, at);
    when(avfallService.scannAvfall(strekkode)).thenReturn(mockAvfall);

    Avfall avfall = avfallController.scanAvfall(strekkode);

    assertNotNull(avfall);
    assertEquals(mockAvfall, avfall);
    assertEquals("Glass", avfall.getAvfallsType().getType());
    
  }

  @Test
  void testLeggTilVare(){
    mockAvfall = new Avfall(strekkode, at2);
    when(avfallService.leggTilVare(strekkode,2)).thenReturn(mockAvfall);

    Avfall avfall = avfallController.leggTilVare(strekkode, 2);

    assertNotNull(avfall);
    assertEquals(mockAvfall, avfall);
    assertEquals("Glass", avfall.getAvfallsType().getType());
    
  }



}
