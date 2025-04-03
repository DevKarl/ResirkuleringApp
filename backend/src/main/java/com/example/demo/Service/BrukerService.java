package com.example.demo.Service;

import java.util.Optional;

import javax.transaction.Transactional;

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

  @Transactional
  public Boolean activateStatShare(int brukerId) {
    Optional<Bruker> brukerOptional = Optional.of(brukerRepo.findById(brukerId));

    if (brukerOptional.isPresent()){
      Bruker bruker = brukerOptional.get();
      bruker.setDelerStat(true);
      brukerRepo.save(bruker);
      return true;
    }
    return false;
  }

  @Transactional
  public Boolean deactivateStatShare(int brukerId) {
    Optional<Bruker> brukerOptional = Optional.of(brukerRepo.findById(brukerId));

    if (brukerOptional.isPresent()){
      Bruker bruker = brukerOptional.get();
      bruker.setDelerStat(false);
      brukerRepo.save(bruker);
      return true;
    }
    return false;
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
