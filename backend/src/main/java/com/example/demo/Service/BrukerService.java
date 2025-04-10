package com.example.demo.Service;
import java.util.List;
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
  public void activateStatShare(int brukerId) {
    updateStatShare(brukerId, true);
  }

  @Transactional
  public void deactivateStatShare(int brukerId) {
    updateStatShare(brukerId, false);
  }

  @Transactional
  public void giveAdminPermission(Bruker bruker) {
    bruker.setAdminrettigheter(true);
  }

  @Transactional
  public void removeAdminPermission(Bruker bruker) {
    bruker.setAdminrettigheter(false);
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

  public void deleteUser(int brukerId) {
    brukerRepo.deleteById(brukerId);
  }

  private void updateStatShare(int brukerId, boolean statShareValue) {
    Bruker bruker = brukerRepo.findById(brukerId).orElseThrow(() -> new RuntimeException("Bruker finnes ikke"));
    bruker.setDelerStat(statShareValue);
    brukerRepo.save(bruker);
  }
}
