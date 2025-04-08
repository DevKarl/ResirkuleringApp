package com.example.demo.Service;

import java.util.List;
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
    return updateStatShare(brukerId, true);
  }

  @Transactional
  public Boolean deactivateStatShare(int brukerId) {
    return updateStatShare(brukerId, false);
  }

  private Boolean updateStatShare(int brukerId, boolean statShareValue) {
    Optional<Bruker> brukerOptional = brukerRepo.findById(brukerId);
    return brukerOptional.map(bruker -> {
        bruker.setDelerStat(statShareValue);
        brukerRepo.save(bruker);
        return true;
    }).orElse(false);
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

  public List<Bruker> getAllUsers() {
    return brukerRepo.findAll();
  }

  public boolean isAdmin(int brukerId) {
    Optional<Bruker> brukerOptional = brukerRepo.findById(brukerId);
    return brukerOptional.map(Bruker::isAdminrettigheter).orElse(false);
  }
}
