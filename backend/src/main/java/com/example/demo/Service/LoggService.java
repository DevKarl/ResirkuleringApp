package com.example.demo.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Resirkuleringslogg;
import com.example.demo.Repositories.LoggRepo;

@Service
public class LoggService {

  @Autowired
  private LoggRepo loggRepo;

  public List<Resirkuleringslogg> getAlleLoggerForBrukerMedId(int id) {
    
    return loggRepo.findByBruker_id(id);
    
  }

  public void hivAvfall(int brukerid, int avfallsid, int avfallspunktid, LocalDate localdate) {
    // TODO Auto-generated method stub
    loggRepo.save(brukerid, avfallsid, avfallspunktid, localdate);
    // throw new UnsupportedOperationException("Unimplemented method 'hivAvfall'");
    return;
  }
    
}
