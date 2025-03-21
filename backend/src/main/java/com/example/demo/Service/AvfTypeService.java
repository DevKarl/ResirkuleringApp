package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.AvfallsType;
import com.example.demo.Repositories.AvfallsTypeRepo;

@Service
public class AvfTypeService {
  
  @Autowired
  private AvfallsTypeRepo avfallsTypeRepo;

  public List<AvfallsType> getAvfTypeByAvfPunktID(int id){
    return avfallsTypeRepo.findAvfallsTyperByAvfallsPunktId(id);
  }
}
