package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Avfallspunkt;
import com.example.demo.Repositories.AvfallspunktRepo;

@Service
public class AvfPunktService {

  @Autowired
  private AvfallspunktRepo avfallspunktRepo;

  public List<Avfallspunkt> getAvfallspunkterByAvfallstype_id(int id) {
    return avfallspunktRepo.findAvfallspunkterByAvfallstype_id(id);
  
  } 
    
}
