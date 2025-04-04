package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Avfall;
import com.example.demo.Repositories.AvfallRepo;

@Service
public class AvfallService {

  @Autowired
  AvfallRepo avfallRepo;

  public Avfall getAvfallByStrekkode(String strekkode) {
    return avfallRepo.findByStrekkode(strekkode);
  }  

  public Avfall getAvfallById(int Id){
    return avfallRepo.findById(Id);
  }
}
