package com.example.demo.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.SharedStatsResponse;
import com.example.demo.Entities.Bruker;
import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Repositories.BrukerRepo;
import com.example.demo.Repositories.LoggRepo;

@Service
public class LoggService {

  @Autowired
  private LoggRepo loggRepo;

  @Autowired
  private BrukerRepo brukerRepo;

  public List<Resirkuleringslogg> getAlleLoggerForBrukerMedId(int id) {
    return loggRepo.findByBruker_id(id);
  }

  public List<SharedStatsResponse> getSharedUsersStats() {
    List<Bruker> usersWithShareStat = brukerRepo.findByDelerstatTrue();
    return usersWithShareStat.stream()
      .map(bruker -> {
          List<Resirkuleringslogg> logger = loggRepo.findByBruker_id(bruker.getId());
          return new SharedStatsResponse(bruker, logger);
      })
      .collect(Collectors.toList());
  }

  public void saveHivdAvfall(Resirkuleringslogg logg) {
    loggRepo.save(logg);
  }
    
}
