package com.example.demo.Service;

import java.util.List;

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

  public List<Avfall> getAllAvfall() {
    return avfallRepo.findAll();
  }

  public void createNewAvfall(Avfall newAvfall) {
    avfallRepo.save(newAvfall);
  }

  public boolean strekkodeIsTaken(String strekkode) {
    return avfallRepo.existsByStrekkode(strekkode);
  }

  public boolean updatedStrekkodeIsTaken(String newStrekkode, String originalStrekkode) {
    return strekkodeIsTaken(newStrekkode) && !newStrekkode.equals(originalStrekkode);
  }

  public void updateAvfall(Avfall avfall) {
    avfallRepo.save(avfall);
  }

  public void deleteAvfallById(int id) {
    avfallRepo.deleteById(id);
  }

}
