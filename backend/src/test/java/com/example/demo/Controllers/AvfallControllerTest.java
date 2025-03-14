package com.example.demo.Controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

  @BeforeEach
  void setup(){
    MockitoAnnotations.openMocks(this);
    strekkode = "12345678";
  }

  @Test
  void testScanAvfall(){
    AvfallsType at = new AvfallsType();
    Avfall mockAvfall = new Avfall(strekkode, at);
    when(avfallService.scannAvfall(strekkode)).thenReturn(mockAvfall);

    Avfall avfall = avfallController.scanAvfall(strekkode);
    assertEquals(mockAvfall, avfall);
  }
}
