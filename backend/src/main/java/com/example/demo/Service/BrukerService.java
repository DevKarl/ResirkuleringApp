package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Bruker;
import com.example.demo.Repositories.BrukerRepo;

@Service
public class BrukerService {

  @Autowired
  private final BrukerRepo brukerRepo;

  public BrukerService(BrukerRepo brukerRepo) {
    this.brukerRepo = brukerRepo;
  }

  public Bruker createNewUser(Bruker bruker) {
    return brukerRepo.save(bruker);
  }

  public Bruker findByBrukernavn(String brukernavn) {
    return brukerRepo.findByBrukernavn(brukernavn);
  }

  public Bruker findById(Integer id) {
    return brukerRepo.findById(id).orElse(null);
  }

  public boolean brukernavnIsTaken(String brukernavn) {
    return findByBrukernavn(brukernavn) != null;
  }
}
